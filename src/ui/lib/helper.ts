	const verifyURL = (url: string): boolean => {
		return /^redis(?:s)?:\/\/.+/i.test(url.trim());
	};

    export {
        verifyURL
    }