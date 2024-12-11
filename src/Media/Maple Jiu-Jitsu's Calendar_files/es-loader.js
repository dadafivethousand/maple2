(function (window) {
	const moduleName = 'easy-share';
	const baseUrl = 'https://assets.setmore.com/services-components';
	const backupUrl = baseUrl + '/backup/manifest.json';

	const reTryConfig = {
		failureLog: true,
		maxRetries: 2,
		delayRetry: true,
		delayTime: 1000,
	};

	const isPreAlpha = () => {
		return window?.location?.hostname?.includes('pre-alpha');
	};

	const getEnvironment = () => {
		const curruntEnv = FrontOfficeService?.App?.getAppEnvironment()
		let env = curruntEnv === 'live' ? 'live' : 'staging';
		if (isPreAlpha()) {
			env = (env === 'live') ? 'alpha' : 'dev';
		}
		return env;
	};

	const injectLinkTagToHead = (src) => {
		return new Promise((resolve, reject) => {
			const link = document.createElement('link');
			link.setAttribute('rel', 'stylesheet');
			link.setAttribute('href', src);

			document.head.appendChild(link);

			link.addEventListener('load', () => {
				resolve(link);
			});
			link.addEventListener('error', reject);
		});
	};

	const injectEasyshareScript = (src) => {
		return new Promise((resolve, reject) => {
			const script = document.createElement('script');
			script.setAttribute('type', 'text/javascript');
			script.setAttribute('charset', 'utf-8');
			script.setAttribute('src', src);

			document.head.appendChild(script);

			script.addEventListener('load', () => {
				resolve(script);
			});
			script.addEventListener('error', reject);
		});
	};

	const getManifestData = async () => {
		let environment = getEnvironment();
		const manifestDomainURL = `${baseUrl}/${environment}/manifest.json`;
		const response = await fetch(manifestDomainURL);
		const data = await response.json();
		return data;
	};

	const injectAssetsInDocument = async (paths) => {
		if (paths) {
			await injectLinkTagToHead(paths['main.css.br']);
			await injectEasyshareScript(paths['easyshare.mfe.js.br']);
			return true;
		}
		await getAndInjectBackupData();
		return true
	};

	const getAndInjectBackupData = async () => {
		const response = await fetch(backupUrl);
		const data = await response.json();
		const paths = data?.assetsPath;
		await injectLinkTagToHead(paths['main.css.br']);
		await injectEasyshareScript(paths['easyshare.mfe.js.br']);
	};

	const init = async (...param) => {
		try {
			const manifest = await retryAsync(getManifestData, reTryConfig);
			const paths = manifest?.assetsPath;
			const getChunks = () => {
				return injectAssetsInDocument(paths);
			};
			const status = await retryAsync(getChunks, reTryConfig);
			if (status && window[moduleName]?.loadEasyShare) {
				return window[moduleName]?.loadEasyShare(...param);
			} else {
				throw new Error('ES:loadEasyShare Method not found')
			}
		} catch (error) {
			console.error("ES:Something went wrong while initializing easyshare:", error)
			throw new Error(error)
		}
	};

	window[moduleName] = {
		init,
	};
})(window);

function delayPromise(time, callback, params = []) {
	return new Promise((resolve) => {
		setTimeout(() => {
			if (typeof callback !== 'function') resolve(callback);
			else resolve(callback(...params));
		}, time);
	});
}
async function retryAsync(
	asyncFunc,
	{
		failureLog = '',
		maxRetries = 1,
		delayRetry = false,
		delayTime = 1000,
	} = {},
	retries = 0
) {
	try {
		const resp = await asyncFunc();
		return resp;
	} catch (error) {
		if (retries >= maxRetries) throw error;
		if (failureLog)
			console.error(`${failureLog} failed: retrying: ${retries}`, error);
		const ops = () =>
			retryAsync(
				asyncFunc,
				{
					failureLog,
					maxRetries,
					delayRetry,
					delayTime,
				},
				retries + 1
			);
		return delayRetry ? delayPromise(delayTime).then(ops) : ops();
	}
}