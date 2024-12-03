"use client";

import React, { useState, useEffect } from "react";
import ResultadosTable from "./resultadosTable"; // Tabla para resultados de laboratorios
import ImageViewer from "./imageViewer"; // Visor para imágenes médicas
import Filters from "./filters"; // Filtros para buscar resultados
import fetchResultados from "./resultadosApi"; // Función para obtener datos

const Resultados = () => {
  const [activeTab, setActiveTab] = useState("laboratorios"); // "laboratorios" | "imagenes"
  const [data, setData] = useState([]); // Datos de laboratorio o imágenes
  const [loading, setLoading] = useState(false); // Estado de carga
  const [filters, setFilters] = useState({}); // Filtros seleccionados

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setFilters({}); // Reiniciar filtros al cambiar de pestaña
  };

  // Cargar datos al cambiar de pestaña o aplicar filtros
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const result = await fetchResultados(activeTab, filters); // Obtener datos con filtros
      setData(result);
      setLoading(false);
    };

    loadData();
  }, [activeTab, filters]);

  return (
    <div className="bg-secondary min-h-screen flex flex-col items-center p-6">
      <div className="w-full max-w-6xl bg-accent rounded-lg shadow-md overflow-hidden">
        {/* Encabezado */}
        <div className="bg-primary text-white text-center py-4">
          <h1 className="text-2xl font-semibold"> Resultados</h1>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <div className="w-1/4 bg-secondary border-r">
            <button
              onClick={() => handleTabChange("laboratorios")}
              className={`w-full text-left px-6 py-4 text-lg font-medium hover:bg-primary hover:text-white ${
                activeTab === "laboratorios" ? "bg-primary text-white" : ""
              }`}
            >
              Laboratorios
            </button>
            <button
              onClick={() => handleTabChange("imagenes")}
              className={`w-full text-left px-6 py-4 text-lg font-medium hover:bg-primary hover:text-white ${
                activeTab === "imagenes" ? "bg-primary text-white" : ""
              }`}
            >
              Imágenes Médicas
            </button>
          </div>

          {/* Contenido Principal */}
          <div className="w-3/4 p-6">
            {/* Filtros */}
            <Filters activeTab={activeTab} setFilters={setFilters} />

            {/* Contenido según la pestaña activa */}
            {loading ? (
              <p className="text-center text-gray-700 mt-6">Cargando datos...</p>
            ) : activeTab === "laboratorios" ? (
              <ResultadosTable data={data} />
            ) : (
              <ImageViewer images={data} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resultados;

