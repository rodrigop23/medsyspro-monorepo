const ImageViewer = ({ images }) => (
  <div className="grid grid-cols-2 gap-4">
    {images.map((image, index) => (
      <div key={index} className="border rounded shadow">
        <p className="p-2 text-center">{image.nombre}</p>
        <img src={image.filePath} alt={image.nombre} className="w-full" />
      </div>
    ))}
  </div>
);

export default ImageViewer;