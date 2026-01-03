import { HistoryStack } from './lib/history'
import { loadHistory, saveHistory } from './lib/storage'

let historyStack: HistoryStack

async function init() {
  const saved = await loadHistory()
  historyStack = new HistoryStack(50)
  // Re-push saved to stack
  saved.forEach((id) => historyStack.push(id))
}

// Ensure init is called
const initPromise = init()

chrome.tabs.onActivated.addListener(async (activeInfo: any) => {
  await initPromise
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
