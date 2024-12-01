"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CalendarDays,
  ChevronDown,
  Clock,
  FileText,
  Image as ImageIcon,
  LogOut,
  Settings,
  User,
  Menu,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format, isPast, parseISO } from "date-fns";

const sidebarItems = [
  { icon: CalendarDays, label: "Citas" },
  { icon: FileText, label: "Historial Médico" },
  { icon: Clock, label: "Resultados" },
  { icon: ImageIcon, label: "Imágenes" },
];
import { es } from "date-fns/locale";

function Sidebar() {
  return (
    <div className="w-64 bg-white h-screen p-4 hidden lg:block border-r border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-teal-600">Portal Médico</h2>
      <nav className="space-y-2">
        {sidebarItems.map((item, index) => (
          <Button
            key={index}
            variant="ghost"
            className="w-full justify-start text-gray-600 hover:text-teal-600 hover:bg-teal-50"
          >
            <item.icon className="mr-2 h-4 w-4" />
            {item.label}
          </Button>
        ))}
      </nav>
    </div>
  );
}

function Header({ title }) {
  return (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center">
      <div className="flex items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden mr-2">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <Sidebar />
          </SheetContent>
        </Sheet>
        <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>Juan Pérez</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Configuración</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Cerrar Sesión</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}

function DatePickerWithRange({ className }) {
  const [date, setDate] = useState({ from: new Date(), to: new Date() });

  return (
    <div className={className}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={`w-full justify-start text-left font-normal ${!date && "text-muted-foreground"}`}
          >
            <CalendarDays className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "dd MMM, yyyy", { locale: es })} -{" "}
                  {format(date.to, "dd MMM, yyyy", { locale: es })}
                </>
              ) : (
                format(date.from, "dd MMM, yyyy", { locale: es })
              )
            ) : (
              <span>Seleccionar fecha</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            locale={es}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

function CitaDetalle({ cita, onClose, onReprogramar }) {
  const esCitaPasada = isPast(parseISO(cita.fecha));

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>
          {esCitaPasada ? "Detalle de Cita Pasada" : "Detalle de Cita"}
        </DialogTitle>
        <DialogDescription>
          {esCitaPasada
            ? "Información de su cita anterior"
            : "Información de su próxima cita"}
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <label htmlFor="fecha" className="text-right font-medium">
            Fecha
          </label>
          <div id="fecha" className="col-span-3">
            {format(parseISO(cita.fecha), "dd 'de' MMMM, yyyy", { locale: es })}
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <label htmlFor="hora" className="text-right font-medium">
            Hora
          </label>
          <div id="hora" className="col-span-3">
            {cita.hora}
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <label htmlFor="tipo" className="text-right font-medium">
            Tipo
          </label>
          <div id="tipo" className="col-span-3">
            {cita.tipo}
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <label htmlFor="doctor" className="text-right font-medium">
            Doctor
          </label>
          <div id="doctor" className="col-span-3">
            {cita.doctor}
          </div>
        </div>
      </div>
      <DialogFooter>
        {!esCitaPasada && (
          <Button onClick={onReprogramar} className="mr-2">
            Reprogramar Cita
          </Button>
        )}
        <Button onClick={onClose} variant="secondary">
          Cerrar
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}

function Citas() {
  const [citaSeleccionada, setCitaSeleccionada] = useState(null);
  const [mostrarReprogramar, setMostrarReprogramar] = useState(false);

  const citas = [
    {
      id: 1,
      fecha: "2025-06-15",
      hora: "10:00",
      tipo: "Consulta General",
      doctor: "Dra. Ana Gómez",
    },
    {
      id: 2,
      fecha: "2023-06-20",
      hora: "15:30",
      tipo: "Especialidad",
      doctor: "Dr. Carlos Ruiz",
    },
    {
      id: 3,
      fecha: "2023-06-25",
      hora: "11:00",
      tipo: "Seguimiento",
      doctor: "Dr. Luis Mendez",
    },
    {
      id: 4,
      fecha: "2023-07-05",
      hora: "09:00",
      tipo: "Consulta General",
      doctor: "Dra. María López",
    },
    {
      id: 5,
      fecha: "2023-07-10",
      hora: "14:00",
      tipo: "Especialidad",
      doctor: "Dr. Jorge Martínez",
    },
    {
      id: 6,
      fecha: "2023-07-15",
      hora: "16:30",
      tipo: "Seguimiento",
      doctor: "Dra. Laura Sánchez",
    },
    {
      id: 7,
      fecha: "2023-05-01",
      hora: "11:30",
      tipo: "Consulta General",
      doctor: "Dr. Roberto Gómez",
    },
  ];

  const handleReprogramar = () => {
    setMostrarReprogramar(true);
  };

  return (
    <Card className="bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="text-teal-600">Citas</CardTitle>
        <CardDescription>Gestione sus citas médicas</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-col sm:flex-row gap-4">
          <Input placeholder="Buscar cita..." className="flex-grow" />
          <DatePickerWithRange className="w-full sm:w-[300px]" />
          <Select>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Tipo de consulta" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">Consulta General</SelectItem>
              <SelectItem value="especialidad">Especialidad</SelectItem>
              <SelectItem value="seguimiento">Seguimiento</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {citas.map((cita) => (
            <Card
              key={cita.id}
              className={`bg-gray-50 ${isPast(parseISO(cita.fecha)) ? "opacity-70" : ""}`}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold text-teal-600">
                  {format(parseISO(cita.fecha), "dd 'de' MMMM, yyyy", {
                    locale: es,
                  })}
                </CardTitle>
                <CardDescription>
                  {cita.hora} - {cita.tipo}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{cita.doctor}</p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      className="mt-2 w-full"
                      variant="outline"
                      onClick={() => setCitaSeleccionada(cita)}
                    >
                      Ver detalles
                    </Button>
                  </DialogTrigger>
                  {citaSeleccionada && (
                    <CitaDetalle
                      cita={citaSeleccionada}
                      onClose={() => setCitaSeleccionada(null)}
                      onReprogramar={handleReprogramar}
                    />
                  )}
                </Dialog>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
      {mostrarReprogramar && (
        <Dialog open={mostrarReprogramar} onOpenChange={setMostrarReprogramar}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reprogramar Cita</DialogTitle>
              <DialogDescription>
                Seleccione una nueva fecha y hora para su cita.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="nueva-fecha" className="text-right font-medium">
                  Nueva Fecha
                </label>
                <Input id="nueva-fecha" type="date" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="nueva-hora" className="text-right font-medium">
                  Nueva Hora
                </label>
                <Input id="nueva-hora" type="time" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                onClick={() => setMostrarReprogramar(false)}
              >
                Confirmar Reprogramación
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </Card>
  );
}

function HistorialMedico() {
  const historial = [
    {
      id: 1,
      fecha: "2023-05-10",
      tipo: "Consulta General",
      doctor: "Dra. Ana Gómez",
      notas: "Chequeo anual. Todo en orden.",
      diagnostico: "Saludable",
      tratamiento: "Mantener dieta balanceada y ejercicio regular",
    },
    {
      id: 2,
      fecha: "2023-03-15",
      tipo: "Especialidad - Cardiología",
      doctor: "Dr. Carlos Ruiz",
      notas: "Evaluación de rutina. Se recomienda ejercicio moderado.",
      diagnostico: "Presión arterial ligeramente elevada",
      tratamiento: "Dieta baja en sodio, ejercicio aeróbico 3 veces por semana",
    },
    {
      id: 3,
      fecha: "2023-01-22",
      tipo: "Urgencias",
      doctor: "Dr. Luis Mendez",
      notas: "Tratamiento para influenza. Reposo y medicación recetada.",
      diagnostico: "Influenza tipo A",
      tratamiento: "Oseltamivir 75mg cada 12 horas por 5 días, reposo absoluto",
    },
    {
      id: 4,
      fecha: "2022-11-05",
      tipo: "Consulta General",
      doctor: "Dra. María López",
      notas:
        "Control de rutina. Paciente refiere dolor ocasional en rodilla izquierda.",
      diagnostico: "Posible inicio de osteoartritis",
      tratamiento: "Derivación a traumatología para evaluación detallada",
    },
  ];

  return (
    <Card className="bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="text-teal-600">Historial Médico</CardTitle>
        <CardDescription>
          Registro detallado de sus consultas y tratamientos
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-col sm:flex-row gap-4">
          <Input placeholder="Buscar en historial..." className="flex-grow" />
          <DatePickerWithRange className="w-full sm:w-[300px]" />
          <Select>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Tipo de consulta" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">Consulta General</SelectItem>
              <SelectItem value="especialidad">Especialidad</SelectItem>
              <SelectItem value="urgencias">Urgencias</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <ScrollArea className="h-[600px]">
          {historial.map((item) => (
            <Card key={item.id} className="mb-4 bg-gray-50">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-semibold text-teal-600">
                    {item.fecha}
                  </CardTitle>
                  <span className="text-sm text-gray-500">{item.tipo}</span>
                </div>
                <CardDescription>{item.doctor}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-semibold">Notas:</span> {item.notas}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Diagnóstico:</span>{" "}
                    {item.diagnostico}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Tratamiento:</span>{" "}
                    {item.tratamiento}
                  </p>
                </div>
                <Button className="mt-4 w-full" variant="outline">
                  Ver detalles completos
                </Button>
              </CardContent>
            </Card>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

function Resultados() {
  const resultados = [
    {
      id: 1,
      fecha: "2023-05-15",
      tipo: "Análisis de Sangre",
      estado: "Completado",
      resultado: "Normal",
    },
    {
      id: 2,
      fecha: "2023-04-20",
      tipo: "Radiografía de Tórax",
      estado: "Completado",
      resultado: "Sin hallazgos significativos",
    },
    {
      id: 3,
      fecha: "2023-03-10",
      tipo: "Electrocardiograma",
      estado: "Completado",
      resultado: "Ritmo sinusal normal",
    },
    {
      id: 4,
      fecha: "2023-06-01",
      tipo: "Análisis de Orina",
      estado: "Pendiente",
      resultado: "En proceso",
    },
    {
      id: 5,
      fecha: "2023-05-05",
      tipo: "Densitometría Ósea",
      estado: "Completado",
      resultado: "Densidad ósea normal",
    },
    {
      id: 6,
      fecha: "2023-04-01",
      tipo: "Prueba de Esfuerzo",
      estado: "Completado",
      resultado: "Capacidad cardiovascular adecuada",
    },
  ];

  return (
    <Card className="bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="text-teal-600">Resultados de Exámenes</CardTitle>
        <CardDescription>
          Historial de sus exámenes médicos y resultados
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-col sm:flex-row gap-4">
          <Input placeholder="Buscar resultado..." className="flex-grow" />
          <DatePickerWithRange className="w-full sm:w-[300px]" />
          <Select>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Tipo de examen" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sangre">Análisis de Sangre</SelectItem>
              <SelectItem value="radiografia">Radiografía</SelectItem>
              <SelectItem value="electrocardiograma">
                Electrocardiograma
              </SelectItem>
              <SelectItem value="orina">Análisis de Orina</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {resultados.map((item) => (
            <Card key={item.id} className="bg-gray-50">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold text-teal-600">
                  {item.fecha}
                </CardTitle>
                <CardDescription>{item.tipo}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">Estado: {item.estado}</p>
                <p className="text-sm text-gray-600">
                  Resultado: {item.resultado}
                </p>
                <Button className="mt-2 w-full" variant="outline">
                  Ver detalles
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function Imagenes() {
  const imagenes = [
    {
      id: 1,
      fecha: "2023-05-20",
      tipo: "Radiografía",
      parte: "Tórax",
      thumbnail: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 2,
      fecha: "2023-04-15",
      tipo: "Resonancia Magnética",
      parte: "Rodilla",
      thumbnail: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 3,
      fecha: "2023-03-01",
      tipo: "Ecografía",
      parte: "Abdomen",
      thumbnail: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 4,
      fecha: "2023-02-10",
      tipo: "Tomografía Computarizada",
      parte: "Cráneo",
      thumbnail: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 5,
      fecha: "2023-01-05",
      tipo: "Radiografía",
      parte: "Columna",
      thumbnail: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 6,
      fecha: "2022-12-20",
      tipo: "Mamografía",
      parte: "Mama",
      thumbnail: "/placeholder.svg?height=100&width=100",
    },
  ];

  return (
    <Card className="bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="text-teal-600">Imágenes Médicas</CardTitle>
        <CardDescription>
          Galería de sus imágenes médicas recientes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-col sm:flex-row gap-4">
          <Input placeholder="Buscar imagen..." className="flex-grow" />
          <DatePickerWithRange className="w-full sm:w-[300px]" />
          <Select>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Tipo de imagen" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="radiografia">Radiografía</SelectItem>
              <SelectItem value="resonancia">Resonancia Magnética</SelectItem>
              <SelectItem value="ecografia">Ecografía</SelectItem>
              <SelectItem value="tomografia">
                Tomografía Computarizada
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {imagenes.map((item) => (
            <Card key={item.id} className="bg-gray-50">
              <CardContent className="p-2">
                <img
                  src={item.thumbnail}
                  alt={`${item.tipo} de ${item.parte}`}
                  className="w-full h-32 object-cover rounded mb-2"
                />
                <div className="text-sm font-medium text-gray-800">
                  {item.tipo}
                </div>
                <div className="text-xs text-gray-500">{item.fecha}</div>
                <div className="text-xs text-gray-600">{item.parte}</div>
                <Button className="mt-2 w-full" variant="outline" size="sm">
                  Ver imagen
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function PortalMedico() {
  const [activeTab, setActiveTab] = useState("citas");

  const renderContent = () => {
    switch (activeTab) {
      case "citas":
        return <Citas />;
      case "historial":
        return <HistorialMedico />;
      case "resultados":
        return <Resultados />;
      case "imagenes":
        return <Imagenes />;
      default:
        return <Citas />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* <Sidebar /> */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          title={
            sidebarItems.find((item) => item.label.toLowerCase() === activeTab)
              ?.label || "Citas"
          }
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-4"
          >
            <TabsList className="bg-white border border-gray-200 p-1 rounded-lg">
              {sidebarItems.map((item, index) => (
                <TabsTrigger
                  key={index}
                  value={item.label.toLowerCase()}
                  className="data-[state=active]:bg-teal-600 data-[state=active]:text-white"
                >
                  {item.label}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value={activeTab}>{renderContent()}</TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
