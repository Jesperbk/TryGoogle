var currentTabId = -1
var currentSearchQuery = undefined

function onGot(tabInfo) {
    browser.browserAction.setPopup({popup: null})
    
    currentTabId = tabInfo[0].id
    parsedUrl = new URL(tabInfo[0].url)
    currentSearchQuery = parsedUrl.searchParams.get('q')

    console.log(currentSearchQuery)
}

function onError(error) {
    console.log(`Error: ${error}`);
}

function openPage() {
    if (currentSearchQuery != undefined) {
        browser.tabs.update(
            currentTabId,
            { url: "https://www.google.com/search?q="+currentSearchQuery }
        );
    }
    else {
        browser.browserAction.setPopup({popup: "html/not-found.html"})
        browser.browserAction.openPopup()
    }
}

browser.browserAction.onClicked.addListener(openPage);

function tabUpdated() {
    gettingCurrent = browser.tabs.query({active: true, currentWindow: true});
    gettingCurrent.then(onGot, onError);
}

browser.tabs.onUpdated.addListener(tabUpdated)
browser.windows.onFocusChanged.addListener(tabUpdated)