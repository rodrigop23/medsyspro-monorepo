"use client";

import { HomeIcon, StethoscopeIcon } from "lucide-react";

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "../../lib/utils";

export default function NavHeader() {
  const { state, isMobile } = useSidebar();

  const isExpanded = state === "expanded";

  return (
    <SidebarMenu className="space-y-2">
      <SidebarMenuItem className="flex items-center justify-between">
        <div className="flex items-center flex-shrink-0">
          <StethoscopeIcon className="size-8 text-teal-600 " />
          {(isExpanded || isMobile) && (
            <span className="ml-2 text-base font-semibold text-gray-800 whitespace-nowrap">
              Portal MedSysPro
            </span>
          )}
        </div>

        {(isExpanded || isMobile) && <SidebarTrigger closeIcon />}
      </SidebarMenuItem>

      <SidebarMenuItem>
        <Link
          href="/"
          className={cn(
            buttonVariants({ size: "sm" }),
            "bg-teal-600 hover:bg-teal-700 w-full"
          )}
        >
          {isExpanded || isMobile ? "Ir al Inicio" : <HomeIcon />}
        </Link>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
