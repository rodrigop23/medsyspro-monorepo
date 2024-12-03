const fetchResultados = async (filters) => {
  try {
    const patientId = filters.patientId;
    const url = `http://localhost:4001/results/patient/1`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Error al obtener resultados");
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};


/*
const fetchResultados = async (tab) => {
    // Simulación de datos según la pestaña activa
    if (tab === "laboratorios") {
      return [
        { id: 1, fecha: "2024-11-20", tipo: "Hemograma", estatus: "Disponible", pdfUrl: "/resultados/hemograma.pdf" },
        { id: 2, fecha: "2024-11-18", tipo: "Glucosa", estatus: "Disponible", pdfUrl: "/resultados/glucosa.pdf" },
      ];
    } else if (tab === "imagenes") {
      return [
        { id: 1, tipo: "Rayos X", url: 'https://medlineplus.gov/images/Xray.jpg' },
        { id: 2, tipo: "Resonancia", url: "https://www.efisioterapia.net/sites/default/files/g/articulos/graficos/certamen2011/16-6.jpg" },
      ];
    }
  
    return [];
  };
  
  export default fetchResultados;
*/