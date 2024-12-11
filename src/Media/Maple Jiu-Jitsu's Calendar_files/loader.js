/******/ (function() { // webpackBootstrap
var __webpack_exports__ = {};
(function (root) {
  if (!root.INBOUND_SETTINGS_MFE) {
    root.INBOUND_SETTINGS_MFE = {
      INBOUND_VERSION: "",
      SETTINGS_VERSION: "",
      VIEWMESSAGE_VERSION: "",
      VERIFICATIONPOPUP_VERSION: "",
    };
  }

  const TABS = Object.freeze({
    INBOUND: "INBOUND",
    SETTINGS: "SETTINGS",
    VERIFICATIONPOPUP: "VERIFICATIONPOPUP",
    VIEWMESSAGE: "VIEWMESSAGE",
    CWA: "CWA",
  });

  const isLocalHost = window.location.hostname === "localhost";

  const ASSET_DOMAIN = {
    [TABS.INBOUND]: "https://storage.googleapis.com/inbound-mfe/inbound-mfe/live",
    [TABS.VERIFICATIONPOPUP]: "https://storage.googleapis.com/inbound-mfe/inbound-mfe/live",
    [TABS.VIEWMESSAGE]: "https://storage.googleapis.com/inbound-mfe/inbound-mfe/live",
    [TABS.SETTINGS]: "https://storage.googleapis.com/settings-mfe/settings-mfe/live",
    [TABS.CWA]: "https://live-cwa.appspot.com",
  };

  const ASSETS = {
    [TABS.INBOUND]: {
      get BASE_URL() { return ASSET_DOMAIN[TABS.INBOUND] },
      getScriptPath() { return isLocalHost ? "" : `/${root.INBOUND_SETTINGS_MFE.INBOUND_VERSION}/static` },
      getManifestPath() { return "/inbound-manifest.json" },
    },
    [TABS.SETTINGS]: {
      get BASE_URL() { return ASSET_DOMAIN[TABS.SETTINGS] },
      getScriptPath() { return isLocalHost ? "" : `/${root.INBOUND_SETTINGS_MFE.SETTINGS_VERSION}/static` },
      getManifestPath() { return "/settings-manifest.json" },
    },
    [TABS.VERIFICATIONPOPUP]: {
      get BASE_URL() { return ASSET_DOMAIN[TABS.VERIFICATIONPOPUP] },
      getScriptPath() { return isLocalHost ? "" : `/${root.INBOUND_SETTINGS_MFE.VERIFICATIONPOPUP_VERSION}/verificationpopup` },
      getManifestPath() { return "/verificationpopup-manifest.json" },
    },
    [TABS.VIEWMESSAGE]: {
      get BASE_URL() { return ASSET_DOMAIN[TABS.VIEWMESSAGE] },
      getScriptPath() { return isLocalHost ? "" : `/${root.INBOUND_SETTINGS_MFE.VIEWMESSAGE_VERSION}/viewmessage` },
      getManifestPath() { return `/viewmessage-manifest.json` },
    },
    get [TABS.CWA]() { return ASSET_DOMAIN[TABS.CWA] },
  };

  const appSetup = {
    _frontOfficeInst: {},
    _configuration: null,
    _uniquePin: null,
    _accountType: null,
    _fetchedUserRole: "",

    /**
     * Retrieves the base URL for a given tab.
     * @param {string} tab - The tab name.
     * @returns {string} - The base URL for the tab.
     * @throws {Error} - Throws an error if the tab name is invalid.
     */
    _getAppURL(_, tab) {
      // get brand specific url from meta
      const moduleData =
        this._frontOfficeInst.ModuleRegistry.getModuleData(tab.toLowerCase()) ||
        {};
      const brandId = this._frontOfficeInst.App.getUrlBrandId();
      const assetsDomain = moduleData.meta?.assetsDomain?.[brandId];
      const apiDomain = moduleData.meta?.apiDomain?.[brandId];
      if (apiDomain) ASSET_DOMAIN[TABS.CWA] = apiDomain;
      if (assetsDomain) ASSET_DOMAIN[tab] = assetsDomain.replace("/static", ""); // Adjust for brand-specific URL
      return tab === TABS.CWA ? ASSETS[TABS.CWA] : ASSETS[tab];
    },
    /**
     * Initializes the application for a specific tab.
     * @param {Object} options - Initialization options.
     * @param {Object} options.FrontOfficeService - FrontOfficeService instance.
     * @param {string} options.tabName - The name of the tab.
     * @param {string} [options.id] - Optional identifier.
     * @param {Object} [options.history] - Optional history object.
     * @returns {Promise<string|undefined>} - A promise that resolves to a string or undefined.
     * @throws {Error} - Throws an error if script injection fails.
     */
    async _initialize({ FrontOfficeService = {}, tabName, id, history }) {
      this._frontOfficeInst = FrontOfficeService;
      const tabNameLowercase = tabName.toLowerCase();

      if (!this._uniquePin) {
        this._uniquePin = await FrontOfficeService.Contact.getUniquePin();
      }

      if (!this._accountType) {
        try {
          this._accountType =
            await FrontOfficeService.Account.getSchedulingProductType();
        } catch (error) {
          this._accountType = "COMPLETE";
        }
      }

      const currentUser = FrontOfficeService.Contact.getCurrentUser();
      const fetchedUser = FrontOfficeService.Contact.getFetchedUser();

      if (currentUser.isFullContact && fetchedUser) {
        const userDefinedRoleInfo = await this._getRole_ById(fetchedUser.id);
        this._fetchedUserRole = userDefinedRoleInfo || "MEMBER";
      }

      if (id) {
        root[tabNameLowercase] = { ...root[tabNameLowercase], id };
      }

      if (window[`${tabNameLowercase}Comp`] && id) {
        return window[`${tabNameLowercase}Comp`]({ id, history });
      }
      const assetsConfig = this._getAppURL(null, tabName)
      const baseUrl = assetsConfig.BASE_URL;

      try {
        await this._fetchConfiguration();
        console.log("Configurations Fetched");
      } catch (err) {
        console.error("Failed to fetch configuration", err);
      }

      const manifestUrl = `${baseUrl}${assetsConfig.getManifestPath()}`;
      const _app_manifesto = await this._corsRequest(manifestUrl, "GET");
      const manifestResp = await _app_manifesto.json();
      const { entrypoints, version } = manifestResp;
      root.INBOUND_SETTINGS_MFE[`${tabName}_VERSION`] = version;
      const scriptUrl = `${baseUrl}${assetsConfig.getScriptPath()}`;
      const listOfPromise = entrypoints.map((eachKey) =>
        this._injectScript(eachKey, manifestResp.files[eachKey], scriptUrl)
      );

      try {
        await Promise.all(listOfPromise);
        if (tabName === TABS.VIEWMESSAGE) {
          return "";
        } else if (tabName === TABS.VERIFICATIONPOPUP) {
          return window.accountVerification.Component();
        } else {
          return window[`${tabNameLowercase}Comp`]({ id, history });
        }
      } catch (err) {
        console.error(`Error while injecting ${tabNameLowercase} script`, err);
        throw err;
      }
    },
    /**
     * Injects a script or stylesheet into the document.
     * @param {string} fileName - The name of the file.
     * @param {string} scriptPath - The path to the script or stylesheet.
     * @param {string} domain - The domain URL.
     * @returns {Promise} - A promise that resolves when the script or stylesheet is loaded.
     * @throws {Error} - Throws an error if the file name or path is invalid.
     */
    _injectScript(fileName, scriptPath, domain) {
      if (!scriptPath || !fileName) {
        throw new Error("Invalid script or file name to download");
      }
      let _element = {};
      const extension = fileName.split(".").pop();
      const existingElement = document.getElementById(fileName);
      if (existingElement) {
        existingElement.remove();
      }
      const source = `${domain}${scriptPath}`;
      return new Promise((resolve, reject) => {
        switch (extension) {
          case "js":
            _element = document.createElement("script");
            _element.src = source;
            _element.type = "text/javascript";
            _element.id = fileName;
            _element.async = false;
            _element.charset = "UTF-8";
            _element.onload = (_elem) => resolve(_elem);
            _element.onerror = (error) => reject(error);
            document.body.appendChild(_element);
            break;
          case "css":
            _element = document.createElement("link");
            _element.href = source;
            _element.rel = "stylesheet";
            _element.id = fileName;
            _element.async = false;
            _element.charset = "UTF-8";
            _element.onload = (_elem) => resolve(_elem);
            document.head.appendChild(_element);
            break;
          case "svg": {
            const svgPath = source;
            fetch(svgPath)
              .then((resp) => resp.text())
              .then((text) => {
                const div = document.createElement("div");
                div.id = fileName;
                div.innerHTML = text;
                const innerSvg = div.firstChild;
                document.head.appendChild(innerSvg);
              });
            resolve();
            break;
          }
          default:
            break;
        }
      });
    },
    async _corsRequest(url, method) {
      const response = await fetch(url, { method });
      if (response.status !== 200) {
        console.error(
          `Looks like there was a problem. Status Code: ${response.status}`
        );
        return "";
      }
      return response;
    },
    async _getAccessToken() {
      const { Auth } = this._frontOfficeInst || {};

      if (!Auth) {
        throw new Error("Front office instance is empty or Auth is undefined!");
      }

      return Auth.getUserAccessToken();
    },
    _getUniquePin() {
      if (!this._uniquePin) {
        throw new Error("UniquePin required");
      }
      return this._uniquePin;
    },
    _getSchedulingProductType() {
      if (!this._accountType) {
        throw new Error("AccountType required");
      }
      return this._accountType;
    },
    _getAppEnvironment() {
      return this._frontOfficeInst?.Utility?.getDomain?.().toLowerCase() || "";
    },
    _getEnvironment() {
      return (
        this._frontOfficeInst?.Utility?.getAppEnvironment?.().toLowerCase() ||
        ""
      );
    },
    async _fetchConfiguration() {
      try {
        const { login: emailId } = root.desktopApp.getCurrentUser() || {};
        const accessToken = await root.desktopApp.getAccessToken();
        const uniquePin = this._uniquePin;
        const ownerObj = await this._getAccountOwner(uniquePin);
        const ownerContactLogin = ownerObj?.ownerId
          ? (await this._getContactById(ownerObj.ownerId))?.login
          : null;
        const url = new URL(
          `${this._getAppURL(null, "CWA")}/services/getDesktopConfiguration`
        );
        url.searchParams.append("emailId", emailId);
        url.searchParams.append("uniquePin", uniquePin);
        if (ownerContactLogin) {
          url.searchParams.append(
            "fetchedUserMailId",
            encodeURIComponent(ownerContactLogin)
          );
        }
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await response.json();
        this._setConfiguration(data);
        return data;
      } catch (error) {
        console.error("Failure while fetching configuration", error);
        return {};
      }
    },
    _getCurrentUser() {
      return this._frontOfficeInst?.Contact?.getCurrentUser?.() || {};
    },
    _getConfiguration() {
      return Object.keys(this._configuration || {}).length
        ? this._configuration
        : undefined;
    },
    _getRole_Skill() {
      let isFullAdmin;

      try {
        isFullAdmin =
          this._frontOfficeInst?.Contact?.getFullAdmininfo()?.fullAdmin ??
          false;
      } catch {
        isFullAdmin = false;
      }

      return {
        ...(this._configuration?.skill || {}),
        isFullAdmin,
        role: this._frontOfficeInst?.Contact?.getAccountRole() || "MEMBER",
      };
    },
    async _getRole_ById(userId) {
      if (!userId) return undefined;

      const query = [userId];
      const contact = this._frontOfficeInst?.Contact;

      if (contact?.getWithAccRoleOrdered) {
        const data = await contact.getWithAccRoleOrdered({ userIds: query });
        const role = data?.[0]?.role;
        return role?.role;
      }

      return undefined;
    },
    _getFetchedUserRole() {
      return this._fetchedUserRole;
    },
    _setConfiguration(config) {
      if (!this._configuration) {
        this._configuration = config;
      }
    },
    async _searchCustomers(payload) {
      const customer = this._frontOfficeInst?.Customer;

      if (customer?.searchContactByName) {
        return await customer.searchContactByName(payload);
      }

      return undefined;
    },
    async _searchTeamMembers(payload = {}) {
      const contact = this._frontOfficeInst?.Contact;

      if (contact?.search) {
        const { value, limit, offset } = payload;
        const requestObject = {
          ...(value && { name: value }),
          ...(limit && { limit }),
          ...(offset && { offset }),
        };

        return await contact.search(requestObject);
      }

      return undefined;
    },
    _searchContactsForMention(value) {
      const contact = this._frontOfficeInst?.Contact;
      return contact?.searchByCursor({ key: value });
    },
    async _searchContactsNew(payload = {}) {
      const contact = this._frontOfficeInst?.Contact;

      if (contact?.searchByCursor) {
        return await contact.searchByCursor(payload);
      }

      return undefined;
    },
    _sendDesktopNotification(payload) {
      const notification = this._frontOfficeInst?.Notification;
      notification?.showDesktopNotification(payload);
    },
    _redirectToChatView(payload) {
      const chat = this._frontOfficeInst?.Chat;

      if (chat?.renderChatView) {
        chat.renderChatView(payload, payload.phoneNumber || "");
      }
    },
    _getFrontOfficeInst() {
      return this._frontOfficeInst || {};
    },
    _getFeedFormatter(feed) {
      const formatMessage = this._frontOfficeInst?.Chat?.formatMessage;
      return formatMessage ? formatMessage(feed) : feed;
    },
    _showUnreadBubble(app = "inbound", showBubble = true, unreadCount = 1) {
      const showUnreadNotification =
        this._frontOfficeInst?.Utility?.showUnreadNotification;

      if (showUnreadNotification) {
        showUnreadNotification({
          appId: app,
          showNotificationBubble: showBubble,
          notificationsCount: unreadCount,
        });
      }
    },
    _isAccountVerified() {
      return this._frontOfficeInst?.Account?.isVerified ?? true;
    },
    _clearUnreadBubble(app = "inbound") {
      const clearUnreadNotification =
        this._frontOfficeInst?.Utility?.clearUnreadNotification;

      if (clearUnreadNotification) {
        clearUnreadNotification({ appId: app });
      }
    },
    _getUserLocation(userId) {
      const getGeoLocation = this._frontOfficeInst?.Contact?.getGeoLocation;

      return getGeoLocation ? getGeoLocation(userId) || {} : {};
    },
    _requestLogUrl() {
      const requestLogUrls = this._frontOfficeInst?.App?.requestLogUrls;
      if (requestLogUrls) {
        return requestLogUrls();
      }
      return Promise.reject();
    },
    _unMount({ id, compName }) {
      return window[compName] && id
        ? window[compName]({ id, unMount: true })
        : undefined;
    },
    _inboundEject({ id }) {
      this._unMount({ id, compName: "inboundComp" });
    },
    _inboundInit({ FrontOfficeService, id }) {
      return this._initialize({
        FrontOfficeService,
        tabName: TABS.INBOUND,
        id,
      });
    },
    _settingsEject({ id }) {
      this._unMount({ id, compName: "settingsComp" });
    },
    _settingsInit({ FrontOfficeService, id, history }) {
      return this._initialize({
        FrontOfficeService,
        tabName: TABS.SETTINGS,
        id,
        history,
      });
    },
    _viewmessageInit({ FrontOfficeService }) {
      return this._initialize({
        FrontOfficeService,
        tabName: TABS.VIEWMESSAGE,
      });
    },
    _verificationpopupInit({ FrontOfficeService }) {
      return this._initialize({
        FrontOfficeService,
        tabName: TABS.VERIFICATIONPOPUP,
      });
    },
    async _getContactById(id) {
      if (!this._frontOfficeInst?.Contact?.getById) {
        throw new Error("Front office instance or Contact method is missing!");
      }
      try {
        const contact = await this._frontOfficeInst.Contact.getById(id);
        return contact;
      } catch (err) {
        console.error("Error fetching contact:", err);
        return "";
      }
    },

    _getFullAdminInfo() {
      if (
        !this._configuration ||
        !this._frontOfficeInst ||
        !this._frontOfficeInst.Contact ||
        !this._frontOfficeInst.Contact.getFullAdmininfo
      ) {
        return {};
      }
      return this._frontOfficeInst.Contact.getFullAdmininfo() || {};
    },
    async _getAccountOwner(accountId) {
      try {
        const getAccountOwner = this._frontOfficeInst?.Account?.getAccountOwner;
        if (getAccountOwner) {
          const ownerId = await getAccountOwner(accountId);
          return ownerId;
        }
        return undefined;
      } catch (error) {
        console.error("Failure while fetching ownerId:", error);
        return {};
      }
    },
    _getFhirRequestStatus() {
      return this._configuration?.fhirRequestSent ?? false;
    },
    _getSetmoreLaunchSecurityToken() {
      return this._configuration?.setmoreLaunchSecurityToken;
    },
  };

  root.desktopApp = {
    getAccessToken: appSetup._getAccessToken.bind(appSetup),
    getUniquePin: appSetup._getUniquePin.bind(appSetup),
    getSchedulingProductType: appSetup._getSchedulingProductType.bind(appSetup),
    getFhirRequestStatus: appSetup._getFhirRequestStatus.bind(appSetup),
    getAppEnv: appSetup._getAppEnvironment.bind(appSetup),
    getAppVersion: appSetup._getEnvironment.bind(appSetup),
    getCurrentUser: appSetup._getCurrentUser.bind(appSetup),
    getConfiguration: appSetup._getConfiguration.bind(appSetup),
    setConfiguration: appSetup._setConfiguration.bind(appSetup),
    getRole_Skill: appSetup._getRole_Skill.bind(appSetup),
    getRole_SkillById: appSetup._getRole_ById.bind(appSetup),
    searchCustomers: appSetup._searchCustomers.bind(appSetup),
    searchContactsNew: appSetup._searchContactsNew.bind(appSetup),
    searchContactsForMention: appSetup._searchContactsForMention.bind(appSetup),
    sendDesktopNotification: appSetup._sendDesktopNotification.bind(appSetup),
    redirectToChatView: appSetup._redirectToChatView.bind(appSetup),
    getFrontOfficeInst: appSetup._getFrontOfficeInst.bind(appSetup),
    searchTeamMembers: appSetup._searchTeamMembers.bind(appSetup),
    getAppURL: appSetup._getAppURL.bind(appSetup),
    formatFeed: appSetup._getFeedFormatter.bind(appSetup),
    getUserLocation: appSetup._getUserLocation.bind(appSetup),
    showUnreadBubble: appSetup._showUnreadBubble.bind(appSetup),
    clearUnreadBubble: appSetup._clearUnreadBubble.bind(appSetup),
    isAccountVerified: appSetup._isAccountVerified.bind(appSetup),
    getContactById: appSetup._getContactById.bind(appSetup),
    requestLogUrl: appSetup._requestLogUrl.bind(appSetup),
    fetchConfiguration: appSetup._fetchConfiguration.bind(appSetup),
    getFullAdminInfo: appSetup._getFullAdminInfo.bind(appSetup),
    getAccountOwner: appSetup._getAccountOwner.bind(appSetup),
    getFetchedUserRole: appSetup._getFetchedUserRole.bind(appSetup),
    getSetmoreLaunchSecurityToken:
      appSetup._getSetmoreLaunchSecurityToken.bind(appSetup),
  };
  root.inbound = {
    init: appSetup._inboundInit.bind(appSetup),
    eject: appSetup._inboundEject.bind(appSetup),
  };
  root.settings = {
    init: appSetup._settingsInit.bind(appSetup),
    eject: appSetup._settingsEject.bind(appSetup),
  };
  root.viewmessage = {
    initialize: appSetup._viewmessageInit.bind(appSetup),
    init: () => {},
  };
  root.verificationpopup = {
    initialize: appSetup._verificationpopupInit.bind(appSetup),
    init: () => {},
  };
})(window);

/******/ })()
;