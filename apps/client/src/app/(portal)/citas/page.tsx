"use client";

import SearchInput from "@/components/search-input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDaysIcon, ClockIcon, HeartIcon, PlusIcon } from "lucide-react";

import { format, isPast, parseISO } from "date-fns";
import { es } from "date-fns/locale";

function CitaCard({ cita }) {
  const esPasada = isPast(parseISO(cita.fecha));

  return (
    <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900">
              {cita.doctor}
            </h3>
            <p className="text-lg text-teal-600">{cita.especialidad}</p>
          </div>
          <HeartIcon className="size-6 text-teal-500 cursor-pointer hover:fill-[#14b8a6] hover:scale-105 active:scale-95" />
        </div>

        <p className="text-gray-600 mb-4">{cita.tipo}</p>

        <div className="flex items-center gap-6 mb-6">
          <div className="flex items-center gap-2">
            <CalendarDaysIcon className="h-5 w-5 text-gray-500" />
            <span className="text-gray-700">
              {format(parseISO(cita.fecha), "dd MMMM yyyy", { locale: es })}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <ClockIcon className="h-5 w-5 text-gray-500" />
            <span className="text-gray-700">{cita.hora}</span>
          </div>
        </div>

        {!esPasada && (
          <div className="flex gap-3">
            <Button className="flex-1 bg-teal-600 hover:bg-teal-700">
              Reprogramar
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-red-500 text-red-500 hover:bg-red-50 hover:text-red-500"
            >
              Anular
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function CitasPage() {
  const citasProgramadas = [
    {
      id: 1,
      fecha: "2025-03-25",
      hora: "16:00",
      tipo: "Control Mensual",
      especialidad: "Cardiología",
      doctor: "Dra. Ana Cordova",
    },
    {
      id: 2,
      fecha: "2025-03-25",
      hora: "10:30",
      tipo: "Primera Consulta",
      especialidad: "Traumatología",
      doctor: "Dr. Carlos Ruiz",
    },
    {
      id: 3,
      fecha: "2024-04-05",
      hora: "15:00",
      tipo: "Consulta de Seguimiento",
      especialidad: "Neurología",
      doctor: "Dra. María López",
    },
  ];

  return (
    <div className="px-6 py-4 space-y-4 w-full">
      <h1 className="text-2xl font-bold">Mis Citas</h1>

      <Tabs defaultValue="programadas" className="w-full space-y-4">
        <div className="flex flex-col items-start gap-4 justify-center w-full md:flex-row md:items-center md:justify-between md:gap-1">
          <TabsList className="w-full md:w-fit">
            <TabsTrigger
              value="programadas"
              className="data-[state=active]:bg-teal-600 data-[state=active]:text-white w-full md:w-fit"
            >
              Citas Programadas
            </TabsTrigger>
            <TabsTrigger
              value="historial"
              className="data-[state=active]:bg-teal-600 data-[state=active]:text-white w-full md:w-fit"
            >
              Historial de Citas
            </TabsTrigger>
          </TabsList>

          <Button className="bg-teal-600 hover:bg-teal-700 px-3 py-1.5 items-center w-full md:w-fit">
            <PlusIcon className="size-4" /> Agregar Cita
          </Button>
        </div>

        <SearchInput placeholder="Buscar cita..." className="w-full sm:w-96" />

        <TabsContent value="programadas">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {citasProgramadas.map((cita) => (
              <CitaCard key={cita.id} cita={cita} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="historial"></TabsContent>
      </Tabs>
    </div>
  );
}
