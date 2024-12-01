"use client";

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
// import { Button } from "@/components/ui/button";
// import UserDropdownMenu from "../user-dropdown-menu";
// import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function NavFooter() {
  const { state, isMobile } = useSidebar();

  const isCollapsed = state === "collapsed";

  return (
    <SidebarMenu className="space-y-2">
      {isCollapsed && !isMobile && (
        <SidebarMenuItem>
          <SidebarTrigger />
        </SidebarMenuItem>
      )}
      {/* TODO: User Account */}
      {/* {isMobile && (
        <SidebarMenuItem>
          <UserDropdownMenu isMobile>
            <Button
              variant="ghost"
              className="flex h-auto w-full flex-row items-center justify-start gap-2 p-1"
            >
              <>
                <Avatar className="size-8">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex w-full flex-col items-start justify-center truncate">
                  <div className="text-sm">Rodrigo Pérez</div>
                  <div className="text-xs text-muted-foreground">
                    20191544@aloe.ulima.edu.pe
                  </div>
                </div>
              </>
            </Button>
          </UserDropdownMenu>
        </SidebarMenuItem>
      )} */}
    </SidebarMenu>
  );
}
