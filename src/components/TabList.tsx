import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import type { TabGroup } from '@/lib/tabs'

interface TabListProps {
  groups: TabGroup[]
  onSelect: (id: number) => void
  onClose: (id: number) => void
}

export function TabList({ groups, onSelect, onClose }: TabListProps) {
  return (
    <ScrollArea className="h-[600px] w-full pr-4">
      <div className="space-y-6">
        {groups.map((group) => (
          <div key={group.windowId}>
            <div className="sticky top-0 bg-card z-10 py-2 mb-2 px-2 border-b">
              <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                Window {group.windowId}
              </h2>
            </div>
            <div className="space-y-1">
              {group.tabs.map((tab) => (
                <div
                  key={tab.id}
                  className="group flex items-center justify-between rounded-md p-2 hover:bg-accent hover:text-accent-foreground cursor-pointer"
                  onClick={() => tab.id && onSelect(tab.id)}
                >
                  <div className="flex items-center space-x-3 overflow-hidden">
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
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 opacity-0 group-hover:opacity-100"
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