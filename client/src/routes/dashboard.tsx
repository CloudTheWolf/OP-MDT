import {UIShellPd} from '@/components/ui/ui-shell-pd'
import {createFileRoute} from '@tanstack/react-router'
import {Announcements} from '@/components/pd/dashboard/announcements'

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
      <UIShellPd>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50 pb-3 max-h-[420px]">
                  <Announcements />
              </div>
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div>
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <div className="aspect-video rounded-xl bg-muted/50" />
                <div className="aspect-video rounded-xl bg-muted/50" />
                <div className="aspect-video rounded-xl bg-muted/50" />
            </div>
        </div>
      </UIShellPd>
  )
}
