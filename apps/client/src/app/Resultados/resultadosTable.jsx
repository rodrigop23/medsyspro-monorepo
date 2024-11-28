const ResultadosTable = ({ data }) => {
    return (
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Nombre</th>
            <th className="border border-gray-300 px-4 py-2">Tipo</th>
            <th className="border border-gray-300 px-4 py-2">Fecha</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-4 py-2">{item.nombre}</td>
              <td className="border border-gray-300 px-4 py-2">{item.tipo}</td>
              <td className="border border-gray-300 px-4 py-2">{item.fecha}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default ResultadosTable;
  