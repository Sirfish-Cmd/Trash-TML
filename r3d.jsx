import React, { useState, useEffect } from "react";

const RandomImage3D = () => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    fetchNewImage();
  }, []);

  const fetchNewImage = () => {
    // Using Lorem Picsum API for random images
    const randomImage = `https://picsum.photos/400/300?random=${Math.random()}`;
    setImageUrl(randomImage);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <h1 className="text-white text-3xl font-bold mb-6">3D Random Image</h1>
      <div className="relative group cursor-pointer">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-blue-500 blur-xl opacity-50 group-hover:opacity-80 transition-opacity duration-300"></div>
        <img
          src={imageUrl}
          alt="Random"
          className="w-96 h-72 object-cover rounded-2xl shadow-lg transform transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110"
        />
      </div>
      <button
        onClick={fetchNewImage}
        className="mt-6 px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg shadow-md hover:bg-gray-200 transition"
      >
        Get New Image
      </button>
    </div>
  );
};

export default RandomImage3D;
