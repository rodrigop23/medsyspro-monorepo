import { MenuIcon, StethoscopeIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export default function Header() {
  return (
    <nav className="bg-white shadow-md fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center flex-shrink-0">
            <StethoscopeIcon className="h-8 w-8 text-teal-600 " />
            <span className="ml-2 text-xl font-semibold text-gray-800 whitespace-nowrap">
              MedsysPro
            </span>
          </div>
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              href="medicos"
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "whitespace-nowrap"
              )}
            >
              Médicos
            </Link>
            <Link
              href="especialidades"
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "whitespace-nowrap"
              )}
            >
              Especialidades
            </Link>
            <Link
              href="servicios"
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "whitespace-nowrap"
              )}
            >
              Servicios
            </Link>
            <Link
              href="sign-in"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "whitespace-nowrap"
              )}
            >
              Agendar Cita
            </Link>
          </div>
          <div className="flex lg:hidden items-center space-x-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MenuIcon className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4">
                  <Link
                    href="medicos"
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      "w-full justify-start"
                    )}
                  >
                    Médicos
                  </Link>
                  <Link
                    href="especialidades"
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      "w-full justify-start"
                    )}
                  >
                    Especialidades
                  </Link>
                  <Link
                    href="servicios"
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      "w-full justify-start"
                    )}
                  >
                    Servicios
                  </Link>
                  <Link
                    href="sign-in"
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "w-full justify-start"
                    )}
                  >
                    Agendar Cita
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
