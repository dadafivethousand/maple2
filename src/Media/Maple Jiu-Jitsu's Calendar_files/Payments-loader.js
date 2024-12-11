(function (window) {
    const moduleName = 'payments';
    const baseUrl = "https://assets.setmore.com/integration"
    const backupUrl = "https://assets.setmore.com/integration/backup/manifest.json"

    const isPreAlpha = () => {
        return window?.location?.hostname?.includes('pre-alpha');
    }
    const getEnvironment = () => {
        let env = window?.FrontOfficeService?.App?.getAppEnvironment() === 'live' ? 'live' : 'staging';
        if (isPreAlpha()) {
            env = env == "live" ? "alpha" : "dev";
        }
        return env
    }

    const injectIntegrationScript = (src) => {
        if(document.getElementById('aiLoader') == null){
            return new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.setAttribute("type", "text/javascript");
                script.setAttribute("charset", "utf-8");
                script.setAttribute('src', src);
                script.setAttribute('id', 'aiLoader')

                document.head.appendChild(script);

                script.addEventListener('load', () => { resolve(script) });
                script.addEventListener('error', reject);
            });
        }
    }
    const getManifestData = async () => {
        try {
            let environment = getEnvironment()
            let manifestDomainURL = `${baseUrl}/${environment}/manifest.json`
            let userId = await window?.FrontOfficeService?.Account?.getCompanyReferenceKey();
            if(userId && userId.includes('SEN42') && environment && environment.includes('live')){
                environment='beta'
                manifestDomainURL = `${baseUrl}/${environment}/manifest.json`
            }
            if(userId && (userId.includes('SEN42') || userId.includes('9760e007-3553-4726-b5f7-5aca35968f64') || userId.includes('850472da-1956-48ab-938e-fa80cfcfd9dd')) && environment && environment.includes('staging')){
                environment='betastaging'
                manifestDomainURL = `${baseUrl}/${environment}/manifest.json`
            }
            const response = await fetch(manifestDomainURL)
            const data = await response.json()
            return data
        } catch (error) {
            console.error("AI: error occured in fetching the integration manifest file ", error?.message)
        }
        return {}
    }
    const injectAssetsInDocument = async (paths) => {
        if (paths) {
            try {
                await injectIntegrationScript(paths["main.js"])
                return
            } catch (error) {
                console.error("AI: error in injecting resource into html ", error?.message)
            }
        }
        getAndInjectBackupData()
    }
    const getAndInjectBackupData = async () => {
        try {
            const response = await fetch(backupUrl)
            const data = await response.json()
            const paths = data?.assetsPath

            await injectIntegrationScript(paths["main.js"])

        } catch (error) {
            console.error("AI: error in injecting backup resource in Html", error?.message)
        }
        return {}
    }
    const init = async (...param) => {
        const manifest = await getManifestData()
        const paths = manifest?.assetsPath
        await injectAssetsInDocument(paths)
        return window[moduleName].init(...param)
    }

    window[moduleName] = {
        init,
    };
})(window)