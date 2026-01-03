import { HistoryStack } from './lib/history'
import { loadHistory, saveHistory } from './lib/storage'

let historyStack: HistoryStack

async function init() {
  console.log("Tab Hero: Initializing background service...")
  const saved = await loadHistory()
  console.log("Tab Hero: Loaded history:", saved)
  historyStack = new HistoryStack(50)
  // Re-push saved to stack
  saved.forEach((id) => historyStack.push(id))
  console.log("Tab Hero: History initialized.")
}

// Ensure init is called
const initPromise = init()

chrome.tabs.onActivated.addListener(async (activeInfo: any) => {
  await initPromise
  console.log("Tab Hero: Tab activated:", activeInfo.tabId)
  historyStack.push(activeInfo.tabId)
  await saveHistory(historyStack.getStack())
})

chrome.tabs.onRemoved.addListener(async (tabId: number) => {
  await initPromise
  historyStack.remove(tabId)
  await saveHistory(historyStack.getStack())
})

// Listen for messages from popup or shortcuts
chrome.runtime.onMessage.addListener((message: any, _sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void) => {
  if (message.type === 'GET_HISTORY') {
    initPromise.then(() => {
      sendResponse({ stack: historyStack.getStack() })
    })
    return true // Keep channel open for async response
  }

  if (message.type === 'NAVIGATE_BACK') {
    initPromise.then(async () => {
      const prevTabId = historyStack.peekPrevious()
      if (prevTabId) {
        try {
          await chrome.tabs.update(prevTabId, { active: true })
          // The onActivated listener will handle pushing it to the top
          sendResponse({ success: true })
        } catch (e) {
          // Tab might have been closed or invalid
          historyStack.remove(prevTabId)
          await saveHistory(historyStack.getStack())
          sendResponse({ success: false, error: 'Tab not found' })
        }
      } else {
        sendResponse({ success: false, error: 'No previous tab' })
      }
    })
    return true
  }
})

// Open dashboard on icon click
chrome.action.onClicked.addListener(async () => {
  await initPromise
  const dashboardUrl = chrome.runtime.getURL('index.html')
  // Match strictly
  const tabs = await chrome.tabs.query({ url: dashboardUrl })

  if (tabs.length > 0 && tabs[0].id) {
    // Already open, switch to it
    await chrome.tabs.update(tabs[0].id, { active: true })
    if (tabs[0].windowId) {
      await chrome.windows.update(tabs[0].windowId, { focused: true })
    }
  } else {
    // Create it
    await chrome.tabs.create({ url: dashboardUrl, index: 0, pinned: true, active: true })
  }
})

chrome.commands.onCommand.addListener(async (command) => {
  console.log("Tab Hero: Command received:", command)
  if (command === 'jump_back') {
    // TODO: Reuse navigate back logic
  } else if (command === 'jump_forward') {
    // TODO: Reuse navigate forward logic
  }
})
