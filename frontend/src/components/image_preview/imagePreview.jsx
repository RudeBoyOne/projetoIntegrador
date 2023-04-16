import { useState, useEffect } from 'react';

const ImagePreview = ({ file }) => {
  const [imageURL, setImageURL] = useState(null);

  useEffect(() => {
    const url = URL.createObjectURL(file);
    setImageURL(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);
  return <img src={imageURL} alt="Preview" />;
};

export default ImagePreview;
