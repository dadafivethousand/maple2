/* eslint-disable no-console */
/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
(function (root) {
  console.log("Initializing Contacts Component resources!!!");
  const baseURLRegex =  /my|admin|pre-alpha|go/;
  const baseURLRegexStaging =  /my.staging|admin.staging|pre-alpha.staging|go.staging/;
  const contacts_prefix_staging =  "staging.directory";
  const contacts_prefix =  "directory";
  const ADMIN = "ADMIN";
  const MEMBER = "MEMBER";
  const fallbackDomains = {
    fallbackStagingDomain: "staging.directory.anywhere.co",
    fallbackLiveDomain: "directory.anywhere.co"
  }
  function getBaseURL(domainEnv) {
    let currentDomain = window.location.hostname;
    let regex = domainEnv === mode.LIVE ? baseURLRegex : baseURLRegexStaging;
    if (!currentDomain.match(regex)) {
      return domainEnv === mode.LIVE ? fallbackDomains.fallbackLiveDomain : fallbackDomains.fallbackStagingDomain;
    }
    let prefix = domainEnv === mode.LIVE ? contacts_prefix : contacts_prefix_staging;
    return currentDomain.replace(regex, prefix) || "";
  }
  //eslint-disable-line
  const domains = {
    live: "https://directory.anywhere.co/",
    staging: "https://staging.directory.anywhere.co/",
    local: "https://contacts.localhost/",
  };
  const mode = {
    LIVE : "live",
    STAGING : "staging",
    LOCAL : "local",
  }
  const APP_STABLE_ENVIRONMENT = "STABLE";
  const APP_ENVIRONMENTS = {
    SETMORE: "setmore",
    ALPHA : "alpha",
  }
  const DOMAIN_IDs = {
    LIVE: "contacts-component",
    STAGING: "contacts-component-staging",
  } 

  const builds = {
    CONTACTS_BUILD : "contacts_view_build",
    EXPOSED_BUILD : "contacts_expose_build"
  }

  const localStorageKey = "cc-dev-build";
  const nonDefaultVersionsFromLocalStorage = localStorage.getItem(localStorageKey);
  const getEnvironment = () => {
    let appEnvironment = FrontOfficeService.Utility.getAppEnvironment();
    return appEnvironment === APP_STABLE_ENVIRONMENT ? APP_ENVIRONMENTS.SETMORE : APP_ENVIRONMENTS.ALPHA
  }
  function getManifestJSONResourcePath(appUrl, build) {
    if(nonDefaultVersionsFromLocalStorage) {
      return `${appUrl}manifest/${build}/version/manifest.json?${Math.random()}`;
    } else {
      return `${appUrl}manifest/${build}/manifest.json?${Math.random()}`;
    }
  }

  async function loadScriptsFromManifest(
    listOfPromise,
    result,
    rootElementToAttach,
    FrontOfficeInstance
  ) {
    try {
      await FrontOfficeService.ModuleRegistry.waitTillModuleLoads(
        "contactsSDK"
      );
      await Promise.all(listOfPromise);
      if(isExposedBuild(FrontOfficeInstance)) {
        result =  window.exposedComponent.eventInitialize(FrontOfficeInstance);
      }
      else {
        result = await window.contactsInterface.initialize(
          FrontOfficeInstance,
          rootElementToAttach
        );
      }
      
      if (!result) {
        console.error("ContactsTab Injection Failed, returning null");
        return Promise.reject("Contacts Component: Internal script error");
      }
      return result;
    } catch (error) {
      console.error("Script Injection Error ContactsView:", error);
      return Promise.reject("Contacts Component: Script Injection Error");
    }
  }


  function getDomainURLSByEnvironment(appEnvironment, domainEnv) {
    console.log("getDomainURLSByEnvironment", appEnvironment, domainEnv);
    if(domainEnv === mode.LOCAL) return domains[mode.LOCAL];
    let domainPrefix = appEnvironment === APP_ENVIRONMENTS.ALPHA && domainEnv !== 'local' ? APP_ENVIRONMENTS.ALPHA : '';
    let domainId = domainEnv === mode.LIVE ? DOMAIN_IDs.LIVE : DOMAIN_IDs.STAGING;
    let host = getBaseURL(domainEnv);
    if(nonDefaultVersionsFromLocalStorage) {
      let {appVersion} = JSON.parse(nonDefaultVersionsFromLocalStorage);
      domainUrl = `https://${appVersion}-dot-${appEnvironment}-dot-${domainId}.uc.r.appspot.com/`;
    } else {
      domainUrl = `https://${host}/${domainPrefix}/`;
    }
    return domainUrl;
  }

  function extractFileExtension(resourceURL) {
    const pattern = /\.(css|js)$/i;
    if (pattern.test(resourceURL)) {
      return resourceURL?.match(pattern)[1]?.toUpperCase();
    }
    return null;
  }

  function getHandlerByExtension(fileName) {
    const extension = extractFileExtension(fileName);
    if(!extension) throw new Error("Invalid file extension");
    const handlerMap = {
      "JS": downloadModule,
      "CSS": downloadCSS,
    }
    return handlerMap[extension];
  }

  function isComponentPresent(frontOfficeService, componentName) {
    const components =  frontOfficeService.Utility.getComponents();
    return components.filter((component)=>component.name === componentName).length > 0;
  }

  function isExposedBuild(frontOfficeService) { 
    const appBrandId = frontOfficeService.App.getUrlBrandId();
    const userRole = frontOfficeService.Contact.getAccountRole()||ADMIN;
    const isSchedulingService = 
      appBrandId === "110003eb-76c1-4b81-a96a-4cdf91bf70fb"|| //setmore
      appBrandId === "c5fd52b0-71e6-489f-b044-52390210a437"|| //inch
      appBrandId === "0dab9518-34d4-4725-a847-ca7ff65168a2"

    if((userRole === MEMBER && isSchedulingService)) {
      return true;  
    }
    else if(userRole !== MEMBER && isSchedulingService) {  
      return false;
    }
    else if(isComponentPresent(frontOfficeService, 'inbound') && isComponentPresent(frontOfficeService, 'contacts')) {
      return false;
    }
    else {
      return true;
    }
  }

  async function downloadModuleFailSafe(scriptPath, fileName) {
    try {
      let downloadHandler = getHandlerByExtension(fileName)
      return FrontOfficeService.Utility.retryAsync(
        () => downloadHandler(scriptPath),
        {
          failureLog: `Contacts component: downloading ${fileName}`,
          delayRetry: true,
          delayTime: 1000,
          maxRetries: 3,
        }
      );   
    } catch (error) {
      console.error("Contacts Component: downloadModuleFailSafe", error); 
    }
  }
  
  const downloadModule = (scriptPath) => new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = scriptPath.replace(/<%=root%>/, "");
    script.charset = "UTF-8";
    document.body.appendChild(script);
    script.onload = resolve;
    script.onerror = reject;
  });

  const downloadCSS = (cssPath) => new Promise((resolve, reject) => {
    const link = document.createElement('link');
    link.href = cssPath.replace(/<%=root%>/, "");
    link.rel = "stylesheet";
    document.head.appendChild(link);
    link.onload = resolve;
    link.onerror = reject;
  });

  const contactsWrapper = {
    _fronOfficeInst: {},
    async _initialize({
      FrontOfficeService = {},
      rootElementToAttach = "anywhere-contacts"
    }) {
      console.log("Initializing Contacts View...");
      this._fronOfficeInst = FrontOfficeService;
      let domainEnv = FrontOfficeService.Utility.getDomain().toLowerCase();
      const appEnvironment = getEnvironment();
      let url;
      let domainUrl = getDomainURLSByEnvironment(appEnvironment, domainEnv);
      
      let build = isExposedBuild(FrontOfficeService) ? builds.EXPOSED_BUILD: builds.CONTACTS_BUILD;
      url =  getManifestJSONResourcePath(domainUrl, build);
      console.log("ccAppurl", url);

      const _app_manifesto = await FrontOfficeService.Utility.retryAsync(
        () => this._corsRequest(url, "GET"),
        {
          failureLog: `"Contacts component: fetching manifest`,
          delayRetry: true,
          delayTime: 1000,
          maxRetries: 3,
        }
      );
      const manifestResp = await _app_manifesto.json().then((data) => data);
      const listOfPromise = await manifestResp.entryPoints.map((fileName) => {
        let fileURLToDownload = manifestResp.paths[fileName];
        let nonDefaultFlag = nonDefaultVersionsFromLocalStorage ? `/version` : "";
        let nonDefaultPrefix = nonDefaultVersionsFromLocalStorage ? `static/` : "";
        let localPrefix = domainEnv === mode.LOCAL ? `/static/` : "";
        let updatedURL = `${domainUrl}${localPrefix}${nonDefaultPrefix}js/dist/${build}${nonDefaultFlag}${fileURLToDownload}`;
        return downloadModuleFailSafe(updatedURL, fileName);
      }
      );
      let result = null;
      if(this._fronOfficeInst.Config?.idb === undefined)  {
        this._fronOfficeInst.Config = {
          idb: true
        };
      }
      return loadScriptsFromManifest(
        listOfPromise,
        result,
        rootElementToAttach,
        this._fronOfficeInst
      );
    },
    _injectScript(fileName, scriptPath) {
      if (!scriptPath || !fileName)
        throw new Error("Invalid script / file name  to download");
      let _element = {};
      const extension =
        fileName.split(".").length === 2 ? fileName.split(".")[1] : "";

      return new Promise((resolve) => {
        switch (extension) {
          case "js":
            _element = document.createElement("script");
            _element.src = scriptPath.replace(/<%=root%>/, "");
            _element.type = "text/javascript";
            _element.async = false;
            _element.charset = "UTF-8";
            _element.onload = () => resolve(_element);
            document.body.appendChild(_element);
            break;
          case "css":
            _element = document.createElement("link");
            _element.href = scriptPath.replace(/<%=root%>/, "");
            _element.rel = "stylesheet";
            _element.async = false;
            _element.onload = (_elem) => resolve(_elem);
            document.head.appendChild(_element);
            break;
          case "svg": {
            const svgPath = scriptPath.replace(/<%=root%>/, "");
            fetch(svgPath)
              .then((resp) => resp.text())
              .then((text) => {
                const div = document.createElement("div");
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
        return;
      }
      return response;
    }
  };
  root.contacts = {
    init: contactsWrapper._initialize.bind(contactsWrapper),
  };
})(window);