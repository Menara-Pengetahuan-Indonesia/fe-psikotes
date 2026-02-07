'use client'

import * as React from 'react'
import { usePathname } from 'next/navigation'
import { ChevronLeft, ChevronRight, Menu } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useUIStore } from '@/store/ui.store'
import { cn } from '@/lib/utils'

import {
  BermoelaBrand,
  NavLinks,
  CollapsedNav,
  UserFooter,
} from './sidebar-nav'

export function DashboardSidebar() {
  const pathname = usePathname()
  const sidebarOpen = useUIStore((s) => s.sidebarOpen)
  const toggleSidebar = useUIStore((s) => s.toggleSidebar)
  const [sheetOpen, setSheetOpen] = React.useState(false)

  React.useEffect(() => {
    setSheetOpen(false)
  }, [pathname])

  return (
    <TooltipProvider delayDuration={0}>
      {/* Mobile header + sheet */}
      <div
        className={cn(
          'fixed top-0 left-0 right-0 z-40',
          'flex items-center gap-3',
          'border-b border-slate-200 bg-white',
          'px-4 py-3 md:hidden'
        )}
      >
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon-sm"
              className="cursor-pointer"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-72 p-0"
            showCloseButton={false}
          >
            <SheetHeader className="px-4 pt-5 pb-0">
              <SheetTitle className="sr-only">
                Menu Navigasi
              </SheetTitle>
              <BermoelaBrand />
            </SheetHeader>
            <Separator className="mt-4" />
            <div
              className={cn(
                'flex flex-col flex-1 p-3',
                'overflow-y-auto'
              )}
            >
              <NavLinks
                onNavigate={() => setSheetOpen(false)}
              />
            </div>
            <Separator />
            <div className="p-3">
              <UserFooter showInfo />
            </div>
          </SheetContent>
        </Sheet>
        <BermoelaBrand />
      </div>

      {/* Desktop sidebar */}
      <aside
        className={cn(
          'relative hidden md:flex flex-col',
          'border-r border-slate-200 bg-white',
          'transition-all duration-300 shrink-0',
          sidebarOpen ? 'w-64' : 'w-[68px]'
        )}
      >
        {/* Collapse toggle */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon-sm"
              onClick={toggleSidebar}
              className={cn(
                'absolute -right-3 top-20 z-10',
                'h-6 w-6 rounded-full cursor-pointer',
                'shadow-sm'
              )}
            >
              {sidebarOpen
                ? <ChevronLeft className="h-3 w-3" />
                : <ChevronRight className="h-3 w-3" />
              }
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            {sidebarOpen ? 'Tutup sidebar' : 'Buka sidebar'}
          </TooltipContent>
        </Tooltip>

        {/* Brand */}
        <div className="px-4 pt-20 pb-4">
          {sidebarOpen
            ? <BermoelaBrand />
            : (
              <div
                className={cn(
                  'flex h-9 w-9 mx-auto',
                  'items-center justify-center',
                  'rounded-lg bg-emerald-500',
                  'text-sm font-black text-white'
                )}
              >
                B
              </div>
            )
          }
        </div>
        <Separator />

        {/* Desktop nav */}
        <div className="flex-1 p-3 overflow-y-auto">
          {sidebarOpen
            ? <NavLinks />
            : <CollapsedNav />
          }
        </div>

        <Separator />
        <div className="p-3">
          <UserFooter showInfo={sidebarOpen} />
        </div>
      </aside>
    </TooltipProvider>
  )
}
