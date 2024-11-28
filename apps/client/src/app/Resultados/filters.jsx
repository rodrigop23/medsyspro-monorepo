const Filters = ({ activeTab, setFilters }) => {
    const handleFilterChange = (e) => {
      setFilters((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    };
  
    return (
      <div className="mb-4">
        <label className="block mb-2 text-gray-700">Filtrar por fecha:</label>
        <input
          type="date"
          name="fecha"
          onChange={handleFilterChange}
          className="border border-gray-300 rounded-lg px-4 py-2"
        />
        {activeTab === "laboratorios" && (
          <input
            type="text"
            name="tipo"
            placeholder="Filtrar por tipo..."
            onChange={handleFilterChange}
            className="ml-4 border border-gray-300 rounded-lg px-4 py-2"
          />
        )}
      </div>
    );
  };
  
  export default Filters;