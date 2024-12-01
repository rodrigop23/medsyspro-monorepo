import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  ActivityIcon,
  ChevronRightIcon,
  FlaskConicalIcon,
  ImageIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  StarIcon,
  StethoscopeIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const services = [
    {
      icon: StethoscopeIcon,
      title: "Consulta General",
      description:
        "Atención médica integral para todas sus necesidades de salud.",
    },
    {
      icon: ActivityIcon,
      title: "Especialidades Médicas",
      description:
        "Acceso a una amplia gama de especialistas en diversas áreas médicas.",
    },
    {
      icon: FlaskConicalIcon,
      title: "Laboratorio Clínico",
      description:
        "Análisis y pruebas de laboratorio con resultados rápidos y precisos.",
    },
    {
      icon: ImageIcon,
      title: "Imagenología",
      description:
        "Servicios de diagnóstico por imagen utilizando tecnología avanzada.",
    },
  ];

  const testimonials = [
    {
      name: "María García",
      text: "El cuidado y la atención que recibí en MedsysPro fueron excepcionales. Me sentí en buenas manos desde el primer momento.",
    },
    {
      name: "Juan Pérez",
      text: "Los médicos son muy profesionales y el personal es amable. Recomiendo ampliamente sus servicios.",
    },
    {
      name: "Ana Martínez",
      text: "Gracias a MedsysPro, obtuve un diagnóstico preciso y un tratamiento efectivo. Estoy muy agradecida por su excelente servicio.",
    },
  ];

  return (
    <div>
      <section className="pt-20 pb-12 md:pt-32 md:pb-24 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center md:space-x-8 lg:space-x-16">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
                Cuidado de Salud de Calidad para Usted y Su Familia
              </h1>
              <p className="text-xl mb-6 text-gray-600 dark:text-gray-300">
                Ofrecemos servicios médicos integrales con un equipo de
                profesionales dedicados a su bienestar.
              </p>

              <Link
                href="citas"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "bg-teal-600 hover:bg-teal-700 text-white"
                )}
              >
                Agendar una Cita <ChevronRightIcon className="ml-2 h-4 w-4" />
              </Link>
            </div>
            <div className="md:w-1/2">
              <Image
                src=""
                height={400}
                width={600}
                alt="Médicos atendiendo a un paciente"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white flex items-center justify-center">
            <StethoscopeIcon className="mr-2 h-8 w-8 text-teal-600 dark:text-teal-400" />
            Nuestros Servicios
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="dark:bg-gray-700">
                <CardContent className="p-6">
                  <service.icon className="h-12 w-12 text-teal-600 dark:text-teal-400 mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white">
            Lo que dicen nuestros pacientes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="dark:bg-gray-800 flex flex-col h-full"
              >
                <CardContent className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className="h-5 w-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 flex-grow">
                    {testimonial.text}
                  </p>
                  <p className="font-semibold text-gray-900 dark:text-white mt-4">
                    {testimonial.name}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 lg:px-20">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white">
            Contáctenos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div>
              <Image
                src=""
                height={400}
                width={600}
                alt="Médicos atendiendo a un paciente"
                className="rounded-lg shadow-xl"
              />
            </div>
            <div className="space-y-6 md:pl-4">
              <div className="flex items-center space-x-4">
                <MapPinIcon className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                <p className="text-gray-600 dark:text-gray-300">
                  Av. Principal 123, Ciudad Médica, País
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <PhoneIcon className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                <p className="text-gray-600 dark:text-gray-300">
                  +1 (234) 567-8900
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <MailIcon className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                <p className="text-gray-600 dark:text-gray-300">
                  info@medsyspro.com
                </p>
              </div>
              <Button
                size="lg"
                className="bg-teal-600 hover:bg-teal-700 text-white mt-4"
              >
                Enviar Mensaje
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 md:py-24 bg-teal-600 dark:bg-teal-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">
            ¿Listo para cuidar de su salud?
          </h2>
          <p className="text-xl mb-8 text-white">
            Agende una cita hoy y dé el primer paso hacia una vida más
            saludable.
          </p>

          <Link
            href="citas"
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-white text-teal-600 hover:bg-gray-100"
            )}
          >
            Agendar una Cita Ahora
          </Link>
        </div>
      </section>
    </div>
  );
}
