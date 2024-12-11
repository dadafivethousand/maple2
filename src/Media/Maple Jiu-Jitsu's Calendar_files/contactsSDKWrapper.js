/* eslint-disable no-console */
/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
(function (root) {
  console.log("Initializing Contacts Component SDK resources!!!");
  const baseURLRegex =  /my|admin|pre-alpha|go|assets/;
  const baseURLRegexStaging =  /my.staging|admin.staging|pre-alpha.staging|go.staging|assets/;
  const contacts_prefix_staging =  "staging.directory";
  const contacts_prefix =  "directory";
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

  function getDomainByCurrentDomain(domainEnv) {
    return getBaseURL(domainEnv);
  }

  const domains = {
    live: "https://directory.anywhere.co",
    staging: "https://staging.directory.anywhere.co",
    local: "https://staging.directory.anywhere.co",
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
  const localStorageKey = "cc-dev-build";
  
  function getEnvironment() {
    let appEnvironment = FrontOfficeService.Utility.getAppEnvironment();
    return appEnvironment === APP_STABLE_ENVIRONMENT ? APP_ENVIRONMENTS.SETMORE : APP_ENVIRONMENTS.ALPHA
  }
  
  async function downloadModuleFailSafe(scriptPath, compName) {
    try {
      return FrontOfficeService.Utility.retryAsync(
        () => downloadModule(scriptPath),
        {
          failureLog: `ContactsSDK: downloading ${compName}`,
          delayRetry: true,
          delayTime: 1000,
          maxRetries: 3,
        }
      );   
    } catch (error) {
      console.error("ContactsSDK: downloadModuleFailSafe", error); 
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

  function getDomainURLSByEnvironment(appEnvironment, domainEnv) {
    console.log("getDomainURLSByEnvironment", appEnvironment, domainEnv);
    if(domainEnv === mode.LOCAL) {
      const domainURLSuffix = appEnvironment === APP_ENVIRONMENTS.ALPHA ? "/alpha-sdk" : "/sdk";
      return `${domains[mode.LOCAL]}${domainURLSuffix}`;
    }
    let domainId = domainEnv === mode.LIVE ? DOMAIN_IDs.LIVE : DOMAIN_IDs.STAGING;
    let domainUrl;
    const versionDetailsFromLocalStorage = localStorage.getItem(localStorageKey);
    let host = getDomainByCurrentDomain(domainEnv);
    if(versionDetailsFromLocalStorage) {
      let { sdkVersion } = JSON.parse(versionDetailsFromLocalStorage);
      domainUrl = `https://${sdkVersion}-dot-alpha-sdk-dot-${domainId}.uc.r.appspot.com/alpha-sdk`;
    } else if(appEnvironment === APP_ENVIRONMENTS.ALPHA) {
      domainUrl = `https://${host}/alpha-sdk`;
    } else {
      domainUrl = `https://${host}/sdk`;
    }
    return domainUrl;
  }

  function getManifestJSONResourcePath(appUrl) {
    return `${appUrl}/js/dist/contacts_sdk_build/contactsSDKBuild.js?${Math.random()}`;
  }
  
  const contactsSDKWrapper = {
    _fronOfficeInst: {},
    async _initialize({ FrontOfficeService }) {
      console.log("Initializing Contacts SDK...");
      this._fronOfficeInst = FrontOfficeService;
      let domainEnv = this._fronOfficeInst.Utility.getDomain().toLowerCase();
      const appEnvironment = getEnvironment();
      let domainUrl = getDomainURLSByEnvironment(appEnvironment, domainEnv);
      let url =  getManifestJSONResourcePath(domainUrl);
      console.log("ccSDKurl", url);
      let injectableScripts = {
        "contactsSDKBuild.js": url,
      };

      let scriptElements = Object.keys(injectableScripts).map((filename) => {
        let fileURLToDownload = injectableScripts[filename];
        return downloadModuleFailSafe(fileURLToDownload, filename)
      }
    );

      let result = null;

      await Promise.all(scriptElements)
        .then(async () => {
          if (!window.contactSDKWrapper) {
            result = await window.contactsSDKInterface.initialize(
              this._fronOfficeInst
            );
            if (!result) {
              console.error("ContactsSDK Injection Failed, returning null");
              return Promise.reject("ContactsSDK Injection Failed");
            }
          }
        })
        .catch((error) => {
          console.log("Script Injection Error ContactsSDK:", error);
          return Promise.reject("ContactsSDK Injection Failed");
        });
        return result;
    },
  };

  root.contactsSDK = {
    init: contactsSDKWrapper._initialize.bind(contactsSDKWrapper),
  };
})(window);
