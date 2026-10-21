// Background Service Worker (Manifest V3)
/// <reference types="chrome" />

// Enable side panel to open on action click
chrome.sidePanel
  ?.setPanelBehavior?.({ openPanelOnActionClick: true })
  .catch((err) => console.error('Error setting side panel behavior:', err));

// Notify side panel HUD when active tab changes
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  try {
    const tab = await chrome.tabs.get(activeInfo.tabId);
    if (tab && tab.url) {
      chrome.runtime.sendMessage({
        type: 'TAB_CHANGED',
        url: tab.url,
        tabId: tab.id,
      }).catch(() => {
        // Side panel may not be open, silently ignore
      });
    }
  } catch (err) {
    console.debug('Tab query error onActivated:', err);
  }
});

// Notify side panel HUD when tab URL updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url && tab.active) {
    chrome.runtime.sendMessage({
      type: 'TAB_UPDATED',
      url: tab.url,
      tabId,
    }).catch(() => {
      // Side panel may not be open
    });
  }
});
