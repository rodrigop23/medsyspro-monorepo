import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";

import NavHeader from "./nav-header";
import NavFooter from "./nav-footer";
import NavOptions from "./nav-options";
import { getCurrentUserAction } from "@/actions/user.action";
import { redirect } from "next/navigation";

export default async function AppSidebar() {
  const user = await getCurrentUserAction();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <NavHeader />
      </SidebarHeader>

      <SidebarContent>
        <NavOptions role={user.role} />
      </SidebarContent>

      <SidebarFooter>
        <NavFooter />
      </SidebarFooter>
    </Sidebar>
  );
}
