import {UIShellPd} from '@/components/ui/ui-shell-pd'
import {createFileRoute} from '@tanstack/react-router'
import {Announcements} from "@/components/pd/dashboard/announcements";
import {Warrants} from "@/components/pd/dashboard/warrents_bolos";
import {Duty} from '@/components/shared/duty';
import {Inmates} from "@/components/pd/dashboard/inmates";
import {Holds} from "@/components/pd/dashboard/vehicle-holds";

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
      <UIShellPd>
          <div className="grid grid-cols-3 gap-4 p-4 h-[92vh] max-w-full">
              <div className="grid grid-rows-3">
                  <div className="row-span-3 h-[92vh]">
                      <div className="rounded-xl bg-muted/50 h-full overflow-hidden">
                          <Warrants/>
                      </div>
                  </div>

              </div>

              <div className="grid grid-rows-3 h-[92vh]">
                  <div className="h-[30vh]">
                      <div className="rounded-xl bg-muted/50 h-full overflow-hidden">
                          <Announcements />
                      </div>
                  </div>
                  <div className="h-[30vh]">
                      <div className="rounded-xl bg-muted/50 h-full">
                          <Inmates />
                      </div>
                  </div>
                  <div className="h-[30vh]">
                      <div className="rounded-xl bg-muted/50 h-full">
                          <Holds />
                      </div>
                  </div>
              </div>

              <Duty/>
          </div>

      </UIShellPd>
  )
}
