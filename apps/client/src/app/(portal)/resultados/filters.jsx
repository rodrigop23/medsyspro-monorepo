const Filters = ({ activeTab, setFilters }) => {
  const handleFilterChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="mb-4">
      <label className="block mb-2">Filtrar por fecha:</label>
      <input
        type="date"
        name="fecha"
        onChange={handleFilterChange}
        className="border rounded px-4 py-2 w-full"
      />
    </div>
  );
};

export default Filters;
