import { useState, useEffect, useCallback } from 'react'

export function useTabs() {
  const [tabs, setTabs] = useState<chrome.tabs.Tab[]>([])

  const fetchTabs = useCallback(async () => {
    if (typeof chrome !== 'undefined' && chrome.tabs) {
      const allTabs = await chrome.tabs.query({})
      setTabs(allTabs)
    }
  }, [])

  useEffect(() => {
    fetchTabs()

    if (typeof chrome === 'undefined' || !chrome.tabs) return

    const handleUpdate = () => {
      fetchTabs()
    }

    // Add listeners for all relevant tab events
    chrome.tabs.onCreated.addListener(handleUpdate)
    chrome.tabs.onUpdated.addListener(handleUpdate)
    chrome.tabs.onRemoved.addListener(handleUpdate)
    chrome.tabs.onMoved.addListener(handleUpdate)
    chrome.tabs.onAttached.addListener(handleUpdate)
    chrome.tabs.onDetached.addListener(handleUpdate)

    return () => {
      chrome.tabs.onCreated.removeListener(handleUpdate)
      chrome.tabs.onUpdated.removeListener(handleUpdate)
      chrome.tabs.onRemoved.removeListener(handleUpdate)
      chrome.tabs.onMoved.removeListener(handleUpdate)
      chrome.tabs.onAttached.removeListener(handleUpdate)
      chrome.tabs.onDetached.removeListener(handleUpdate)
    }
  }, [fetchTabs])

  return { tabs, refresh: fetchTabs }
}
