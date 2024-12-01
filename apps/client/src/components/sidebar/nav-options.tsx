import {
  CalendarDaysIcon,
  ClockIcon,
  FileTextIcon,
  ImageIcon,
  UserIcon,
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

interface Props {
  role: "ADMIN" | "DOCTOR" | "PATIENT";
}

export default function NavOptions({ role }: Props) {
  const optionsData = {
    PATIENT: [
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
    ],
    DOCTOR: [
      {
        id: 1,
        title: "Citas",
        icon: CalendarDaysIcon,
        href: "/citas",
      },
      {
        id: 2,
        title: "Pacientes",
        icon: UserIcon,
        href: "/pacientes",
      },
      {
        id: 3,
        title: "Resultados",
        icon: ClockIcon,
        href: "/resultados",
      },
    ],
    ADMIN: [
      {
        id: 1,
        title: "Usuarios",
        icon: CalendarDaysIcon,
        href: "/usuarios",
      },
      {
        id: 2,
        title: "Reportes",
        icon: FileTextIcon,
        href: "/reportes",
      },
    ],
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-[0.8125rem]">
        Opciones
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu className="space-y-1">
          {optionsData[role].map((option) => (
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
