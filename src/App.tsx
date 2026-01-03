import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { TabList } from '@/components/TabList'
import { filterTabs, findDuplicates } from '@/lib/tabs'
import { RotateCcw, Trash2, Search } from 'lucide-react'

function App() {
  const [tabs, setTabs] = useState<chrome.tabs.Tab[]>([])
  const [searchQuery, setSearchQuery] = useState('')

  const fetchTabs = async () => {
    if (typeof chrome !== 'undefined' && chrome.tabs) {
      const allTabs = await chrome.tabs.query({})
      setTabs(allTabs)
    }
  }

  useEffect(() => {
    fetchTabs()
  }, [])

  const handleSelect = (tabId: number) => {
    chrome.tabs.update(tabId, { active: true }, (tab) => {
      if (tab?.windowId) {
        chrome.windows.update(tab.windowId, { focused: true })
      }
    })
  }

  const handleClose = async (tabId: number) => {
    await chrome.tabs.remove(tabId)
    fetchTabs()
  }

  const handleClearDuplicates = async () => {
    const duplicateIds = findDuplicates(tabs)
    if (duplicateIds.length > 0) {
      await chrome.tabs.remove(duplicateIds)
      fetchTabs()
    }
  }

  const handleGoBack = () => {
    chrome.runtime.sendMessage({ type: 'NAVIGATE_BACK' }, (response) => {
      if (response?.success) {
        window.close() // Close popup on success
      }
    })
  }

  const filtered = filterTabs(tabs, searchQuery)
  const duplicateCount = findDuplicates(tabs).length

  return (
    <div className="w-[400px] p-4 flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">Tab Hero</h1>
        <Button variant="outline" size="sm" onClick={handleGoBack}>
          <RotateCcw className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search tabs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-8"
        />
      </div>

      <div className="flex items-center justify-between px-1">
        <span className="text-xs text-muted-foreground">
          {filtered.length} {filtered.length === 1 ? 'tab' : 'tabs'} open
        </span>
        {duplicateCount > 0 && (
          <Button
            variant="destructive"
            size="sm"
            className="h-7 px-2 text-xs"
            onClick={handleClearDuplicates}
          >
            <Trash2 className="mr-1 h-3 w-3" />
            Remove {duplicateCount} {duplicateCount === 1 ? 'duplicate' : 'duplicates'}
          </Button>
        )}
      </div>

      <TabList tabs={filtered} onSelect={handleSelect} onClose={handleClose} />
    </div>
  )
}

export default App