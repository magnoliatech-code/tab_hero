import { HistoryStack } from './lib/history'
import { loadHistory, saveHistory } from './lib/storage'

let historyStack: HistoryStack
let isNavigating = false

async function init() {
  console.log("Tab Hero: Initializing background service...")
  const saved = await loadHistory()
  console.log("Tab Hero: Loaded history:", saved)
  historyStack = new HistoryStack(50)
  historyStack.restore(saved.stack, saved.pointer)
  console.log("Tab Hero: History initialized.")
}

// Ensure init is called
const initPromise = init()

chrome.tabs.onActivated.addListener(async (activeInfo: any) => {
  await initPromise
  if (isNavigating) {
    console.log("Tab Hero: Skipping history push (navigating)")
    isNavigating = false
    return
  }
  console.log("Tab Hero: Tab activated:", activeInfo.tabId)
  historyStack.push(activeInfo.tabId)
  await saveHistory(historyStack.getStack(), historyStack.getPointer())
})

chrome.tabs.onRemoved.addListener(async (tabId: number) => {
  await initPromise
  historyStack.remove(tabId)
  await saveHistory(historyStack.getStack(), historyStack.getPointer())
})

async function navigate(direction: 'back' | 'forward') {
  await initPromise
  const targetId = direction === 'back' ? historyStack.back() : historyStack.forward()
  
  if (targetId) {
    try {
      isNavigating = true
      await chrome.tabs.update(targetId, { active: true })
      await saveHistory(historyStack.getStack(), historyStack.getPointer())
      return { success: true }
    } catch (e) {
      historyStack.remove(targetId)
      await saveHistory(historyStack.getStack(), historyStack.getPointer())
      return { success: false, error: 'Tab not found' }
    }
  }
  return { success: false, error: `No ${direction} history` }
}

// Listen for messages from dashboard
chrome.runtime.onMessage.addListener((message: any, _sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void) => {
  if (message.type === 'GET_HISTORY') {
    initPromise.then(() => {
      sendResponse({ 
        stack: historyStack.getStack(),
        pointer: historyStack.getPointer()
      })
    })
    return true
  }

  if (message.type === 'NAVIGATE_BACK') {
    navigate('back').then(sendResponse)
    return true
  }

  if (message.type === 'NAVIGATE_FORWARD') {
    navigate('forward').then(sendResponse)
    return true
  }
})

// Open dashboard on icon click
chrome.action.onClicked.addListener(async () => {
  await initPromise
  const dashboardUrl = chrome.runtime.getURL('index.html')
  const tabs = await chrome.tabs.query({ url: dashboardUrl })

  if (tabs.length > 0 && tabs[0].id) {
    await chrome.tabs.update(tabs[0].id, { active: true })
    if (tabs[0].windowId) {
      await chrome.windows.update(tabs[0].windowId, { focused: true })
    }
  } else {
    await chrome.tabs.create({ url: dashboardUrl, index: 0, pinned: true, active: true })
  }
})

// Handle commands (shortcuts)
chrome.commands.onCommand.addListener(async (command) => {
  console.log("Tab Hero: Command received:", command)
  if (command === 'jump_back') {
    await navigate('back')
  } else if (command === 'jump_forward') {
    await navigate('forward')
  }
})