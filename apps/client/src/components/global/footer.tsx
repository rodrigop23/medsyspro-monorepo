import { Icons } from "../icons";
import { MailIcon, StethoscopeIcon } from "lucide-react";
import { Separator } from "../ui/separator";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-primary-foreground pt-16 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo and Mission */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <StethoscopeIcon className="h-12 w-12 text-teal-600 " />

              <h2 className="text-2xl font-bold text-primary">MedSysPro</h2>
            </div>
            <p className="text-muted-foreground md:w-[70%]">
              Clínica de Medicina General y Familiar, con atención en Medicina
              Preventiva, Medicina del Trabajo, Medicina Estética y Medicina
              Regenerativa.
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-primary">Contáctanos</h3>
            <Separator className="w-16 bg-primary/20" />
            <div className="space-y-3">
              <Link
                href="tel:+51945123059"
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                <Icons.whatsapp className="h-5 w-5 flex-shrink-0" />
                <span>+51 999 999 999</span>
              </Link>
              <Link
                href="mailto:medsyspro@gmail.com"
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                <MailIcon className="h-5 w-5 flex-shrink-0" />
                <span className="break-all">medyspro@gmail.com</span>
              </Link>
            </div>
          </div>

          {/* About */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-primary">Acerca de</h3>
            <Separator className="w-16 bg-primary/20" />
            <div className="flex flex-col space-y-3">
              <Link
                href="equipo"
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                Médicos
              </Link>
              <Link
                href="actividades"
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                Especialidades
              </Link>
              <Link
                href="eventos"
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                Servicios
              </Link>
              <Link
                href="blog"
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                Nosotros
              </Link>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-primary">Síguenos</h3>
            <Separator className="w-16 bg-primary/20" />
            <div className="space-y-3">
              <Link
                href="#"
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                <Icons.facebook className="h-5 w-5 flex-shrink-0" />
                <span className="break-all">MedSysPro Perú</span>
              </Link>
              <Link
                href="#"
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                <Icons.instagram className="h-5 w-5 flex-shrink-0" />
                <span className="break-all">medsyspro.peru</span>
              </Link>
              <Link
                href="#"
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                <Icons.tiktok className="h-5 w-5 flex-shrink-0" />
                <span className="break-all">medsyspro.peru</span>
              </Link>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-primary/10" />

        <div className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} MedSysPro. Todos los derechos
          reservados.
        </div>
      </div>
    </footer>
  );
}
