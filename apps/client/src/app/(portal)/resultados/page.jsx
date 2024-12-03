"use client";

import React, { useState, useEffect } from "react";
import ResultadosTable from "./resultadosTable";
import ImageViewer from "./imageViewer";
import Filters from "./filters";
import fetchResultados from "./resultadosApi";
import { getCurrentUserAction } from "@/actions/user.action";

const Resultados = () => {
  const [activeTab, setActiveTab] = useState("laboratorios");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({});
  const [userRole, setUserRole] = useState(null);

  // Cargar datos del usuario al montar el componente
  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const user = await getCurrentUserAction(); // Llamada al backend
        setUserRole(user.role); // Extraer rol del usuario
      } catch (error) {
        console.error("Error obteniendo el usuario:", error);
      }
    };
    fetchUserRole();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setFilters({});
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const result = await fetchResultados(activeTab, filters); // Obtener datos desde el backend
        setData(result);
      } catch (error) {
        console.error("Error cargando resultados:", error);
      }
      setLoading(false);
    };
    if (userRole) loadData(); // Solo cargar datos si ya conocemos el rol
  }, [activeTab, filters, userRole]);

  return (
    <div className="bg-secondary min-h-screen flex flex-col items-center p-6">
      <div className="w-full max-w-6xl bg-accent rounded-lg shadow-md overflow-hidden">
        <div className="bg-primary text-white text-center py-4">
          <h1 className="text-2xl font-semibold">Resultados</h1>
        </div>

        <div className="flex">
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

          <div className="w-3/4 p-6">
            {userRole ? (
              <>
                <Filters activeTab={activeTab} setFilters={setFilters} />
                {loading ? (
                  <p className="text-center text-gray-700 mt-6">Cargando datos...</p>
                ) : activeTab === "laboratorios" ? (
                  <>
                    {userRole === "DOCTOR" && (
                      <button className="mb-4 bg-gray-700 text-white px-4 py-2 rounded">
                        Crear nuevo resultado
                      </button>
                    )}
                    <ResultadosTable data={data} role={userRole} />
                  </>
                ) : (
                  <ImageViewer images={data} />
                )}
              </>
            ) : (
              <p className="text-center mt-6">Cargando usuario...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resultados;