"use client";

import React, { useState, useEffect } from "react";
import { getCurrentUserAction } from "@/actions/user.action";
import Filters from "./filters"
import ResultadosTable from "./resultadosTable"
import ImageViewer from "./imageViewer"

const Resultados = () => {
  const [activeTab, setActiveTab] = useState("laboratorios");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({});
  const [userRole, setUserRole] = useState(null);

  // Simula la obtención del rol del usuario
  useEffect(() => {
    const fetchUserRole = async () => {
      // Simula la acción real para obtener el usuario
      const user = await getCurrentUserAction();// Debes reemplazar esto por la acción real
      setUserRole(user.role);
      if (user.role === "PATIENT") {
        setFilters({ patientId: user.id });
      }
    };

    fetchUserRole();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetchResultados(filters);
        setData(response);
      } catch (error) {
        console.error("Error al cargar resultados:", error);
      }
      setLoading(false);
    };

    if (filters.patientId) {
      fetchData();
    }
  }, [filters]);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg">
        <div className="p-4 bg-gray-600 text-white text-center">
          <h1 className="text-xl font-bold">Resultados Médicos</h1>
        </div>
        <div className="flex">
          {/* Tabs */}
          <div className="w-1/4 p-4 border-r">
            <button
              onClick={() => handleTabChange("laboratorios")}
              className={`block w-full p-3 mb-2 text-left rounded ${
                activeTab === "laboratorios"
                  ? "bg-gray-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              Laboratorios
            </button>
            <button
              onClick={() => handleTabChange("imagenes")}
              className={`block w-full p-3 text-left rounded ${
                activeTab === "imagenes"
                  ? "bg-gray-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              Imágenes Médicas
            </button>
          </div>

          {/* Content */}
          <div className="w-3/4 p-4">
            {userRole ? (
              <>
                <Filters activeTab={activeTab} setFilters={setFilters} />
                {userRole === "DOCTOR" && activeTab === "laboratorios" && (
                  <button
                    onClick={() => createNewResult()}
                    className="mb-4 px-4 py-2 bg-gray-600 text-white rounded"
                  >
                    Crear nuevo resultado
                  </button>
                )}
                {loading ? (
                  <p>Cargando...</p>
                ) : activeTab === "laboratorios" ? (
                  <ResultadosTable data={data} />
                ) : (
                  <ImageViewer images={data} />
                )}
              </>
            ) : (
              <p>Cargando usuario...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resultados;