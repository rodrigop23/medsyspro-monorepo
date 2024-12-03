const ResultadosTable = ({ data }) => (
  <table className="w-full border">
    <thead>
      <tr>
        <th className="border px-4 py-2">Nombre</th>
        <th className="border px-4 py-2">Tipo</th>
        <th className="border px-4 py-2">Fecha</th>
      </tr>
    </thead>
    <tbody>
      {data.map((item, index) => (
        <tr key={index}>
          <td className="border px-4 py-2">{item.nombre}</td>
          <td className="border px-4 py-2">{item.type}</td>
          <td className="border px-4 py-2">{item.createdAt}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default ResultadosTable;