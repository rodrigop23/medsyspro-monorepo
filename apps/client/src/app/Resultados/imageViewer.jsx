const ImageViewer = ({ images }) => {
    return (
      <div className="grid grid-cols-2 gap-4">
        {images.map((image, index) => (
          <div key={index} className="border rounded-lg overflow-hidden shadow-sm">
            <p className="p-2 text-center text-gray-700 font-semibold">{image.nombre}</p>
            <img src={image.url} alt={image.nombre} className="w-full" />
          </div>
        ))}
      </div>
    );
  };
  
  export default ImageViewer;