languageSelector = (() => {

    // Supported documentation languages as configured in hugo.toml
    const languageCodes = [ "en", "de" ];

    // Find user preferred languages, use first preference or fall back to english
    const getUserLanguage = (() => {
        const preferedLang = navigator.language || navigator.userLanguage;
        const browserLangs = navigator.languages;

        const contryCode = preferedLang.substr(0,2)
        if ( languageCodes.includes(contryCode) ) {
            // use browser prefered language if supported
            return contryCode;
        } else if ( browserLangs.some( e => languageCodes.includes(e)) ) {
            // use first matching user preferedlanguage if supported
            return browserLangs.find( e => languageCodes.includes(e) );
        }
        // fall back to english
        return "en"
    })

    // Redirect the user to the specified language
    const redirectTo = ((language) => {
        // Only do something, if the language is supported.
        if ( ! languageCodes.includes(language) ) {
            console.log("Language code", language, "is not supported. Use one of", languageCodes)
            return;
        }

        // Check paths
        const currentURL = new URL (window.location.href || document.URL);
        const pathFound = (' ' + currentURL.pathname).slice(1);
        const pathShould = ('/' + language + '/' + currentURL.pathname.replace(/^.+?[/]/, ''));
        if ( pathFound != pathShould ) {
            // We want to redirect as this is the first page load within the session

            // Check if target exists
            const xhr = new XMLHttpRequest();
            xhr.open('GET', pathShould, true);
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4){
                    if (xhr.status >= 200 && xhr.status <= 399) {  
                        // Redirect to correct language version
                        console.log("Redirecting to", pathShould, "from", pathFound)
                        window.location.replace(pathShould);
                    }  else {
                        // The page does not exist in the desired language. Stay here.
                        console.log(pathShould, "not found. Staying at", pathFound);
                    }
                }
            };
            xhr.send();
        }
    })
    
    // Check the language selection
    const browserStorageKey = "psdocs_language"
    let storedLanguage = window.sessionStorage.getItem(browserStorageKey)
    if (storedLanguage == null) {
        // Determine and store language on first call of a session.
        storedLanguage = getUserLanguage();
        window.sessionStorage.setItem(browserStorageKey, storedLanguage);
        redirectTo(storedLanguage);
    }

})

// This finally calls the script.
languageSelector();
