import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { SortDropdown } from '@/components/SortDropdown'
import { Checkbox } from '@/components/ui/checkbox'
import type { TabGroup } from '@/lib/tabs'

interface TabListProps {
  groups: TabGroup[]
  onSelect: (id: number) => void
  onClose: (id: number) => void
  onSortByTitle: (windowId: number) => void
  onSortByUrl: (windowId: number) => void
  selectionMode?: boolean
  selectedWindowIds?: Set<number>
  onToggleWindowSelection?: (windowId: number) => void
}

export function TabList({
  groups,
  onSelect,
  onClose,
  onSortByTitle,
  onSortByUrl,
  selectionMode,
  selectedWindowIds,
  onToggleWindowSelection,
}: TabListProps) {
  return (
    <ScrollArea className="h-[600px] w-full pr-4">
      <div className="space-y-6 max-w-[700px]">
        {groups.map((group) => (
          <div key={group.windowId}>
            <div className="sticky top-0 bg-card z-10 py-2 mb-2 px-2 pr-4 border-b flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {selectionMode && (
                  <Checkbox
                    checked={selectedWindowIds?.has(group.windowId)}
                    onCheckedChange={() => onToggleWindowSelection?.(group.windowId)}
                    aria-label={`Select Window ${group.windowId}`}
                  />
                )}
                <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  Window {group.windowId}
                </h2>
              </div>
              <SortDropdown
                onSortByTitle={() => onSortByTitle(group.windowId)}
                onSortByUrl={() => onSortByUrl(group.windowId)}
              />
            </div>
            <div className="space-y-1">
              {group.tabs.map((tab) => (
                <div
                  key={tab.id}
                  className="group flex items-center justify-between rounded-md p-2 hover:bg-accent hover:text-accent-foreground cursor-pointer"
                  onClick={() => tab.id && onSelect(tab.id)}
                >
                  <div className="flex items-center space-x-3 overflow-hidden flex-1 min-w-0">
                    {tab.favIconUrl ? (
                      <img src={tab.favIconUrl} alt="" className="h-4 w-4 flex-shrink-0" />
                    ) : (
                      <div className="h-4 w-4 bg-muted rounded-full flex-shrink-0" />
                    )}
                    <div className="flex flex-col overflow-hidden">
                      <span className="truncate text-sm font-medium">{tab.title}</span>
                      <span className="truncate text-xs text-muted-foreground">{tab.url}</span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 flex-shrink-0 ml-2 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                    aria-label="Close Tab"
                    onClick={(e) => {
                      e.stopPropagation()
                      tab.id && onClose(tab.id)
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        ))}
        {groups.length === 0 && (
          <div className="py-8 text-center text-sm text-muted-foreground">
            No tabs found
          </div>
        )}
      </div>
    </ScrollArea>
  )
}