
chrome.contextMenus.onClicked.addListener(function (info, tab)
{
    if (tab.url.indexOf("http:") != 0 && tab.url.indexOf("https:") != 0) {
        alert("Support send contents from a 'http:' or 'https:' web page only.");
        return;
    }

    if (info.menuItemId == "contextSendPageToSIU") {
        chrome.tabs.executeScript(tab.id, { file: "js/content_page.js" });
    } else if (info.menuItemId == "contextSendSelectionToSIU") {
        chrome.tabs.executeScript(tab.id, { file: "js/content_selection.js" });
    } else {
        console.log("unknown menu item " + info.menuItemId + " was clicked");
    }
});

// Set up
(function ()
{
    var patterns = ["http://*/*", "https://*/*", "about:blank"];

    //Create context menu item for a page
    chrome.contextMenus.create({ title: "Send page to StepItUp",
                                 contexts:["page"],
                                 id: "contextSendPageToSIU",
                                 documentUrlPatterns: patterns });

    //Create context menu item for selection
    chrome.contextMenus.create({ title: "Send selection to StepItUp",
                                 contexts:["selection"],
                                 id: "contextSendSelectionToSIU",
                                 documentUrlPatterns: patterns });

    //Create context menu item for a image
    chrome.contextMenus.create({ title: "Send image to StepItUp",
                                 contexts:["image"],
                                 id: "contextSendImageToSIU",
                                 documentUrlPatterns: patterns });

    //Create context menu item for a image
    chrome.contextMenus.create({ title: "Send Video to StepItUp",
                                 contexts:["video"],
                                 id: "contextSendVideoToSIU",
                                 documentUrlPatterns: patterns });

    // Set up initial state
    chrome.browserAction.setIcon({ path: "icon.png" });
    chrome.browserAction.setBadgeText({ text: "" });
})();
