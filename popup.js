document.addEventListener('DOMContentLoaded', function () {
    chrome.tabs.executeScript(null, {file: "prettyfier4webarticles.js"});

    document.querySelector('#prettify-button').addEventListener('click', async () => {
        chrome.tabs.executeScript(null, {code: `
            let prettifier = prettifiers[window.location.hostname];
            if(prettifier) prettifier();
        `});
    });

    document.querySelector('#run-button').addEventListener('click', async () => {
        chrome.tabs.executeScript(null, {code: "run()"});
    });

});
