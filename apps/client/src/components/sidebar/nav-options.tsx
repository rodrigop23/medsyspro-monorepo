import {
  CalendarDaysIcon,
  ClockIcon,
  FileTextIcon,
  ImageIcon,
} from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

export default function NavOptions() {
  const optionsData = [
    {
      id: 1,
      title: "Citas",
      icon: CalendarDaysIcon,
      href: "/citas",
    },
    {
      id: 2,
      title: "Historial Médico",
      icon: FileTextIcon,
      href: "/historial-medico",
    },
    {
      id: 3,
      title: "Resultados",
      icon: ClockIcon,
      href: "/resultados",
    },
    {
      id: 4,
      title: "Imágenes",
      icon: ImageIcon,
      href: "/imagenes",
    },
  ];

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-[0.8125rem]">
        Opciones
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu className="space-y-1">
          {optionsData.map((option) => (
            <SidebarMenuItem key={option.id}>
              <SidebarMenuButton asChild className="px-4 py-2 h-auto">
                <Link
                  href={option.href}
                  className="text-gray-600 hover:text-teal-600 hover:bg-teal-50 font-medium"
                >
                  <option.icon className="mr-1" />
                  <span>{option.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
