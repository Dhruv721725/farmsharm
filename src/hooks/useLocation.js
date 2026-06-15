import { useState } from "react";

export default function useLocation() {
  const [loading, setLoading] = useState(false);
  const getCurrentLocation = async () => {
    setLoading(true);
    try {
      const position = await new Promise(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            resolve,
            reject
          );
        }
      );
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      );
      const data = await response.json();
      return {
        latitude: lat,
        longitude: lon,
        address: data.address,
      };
    } finally {
      setLoading(false);
    }
  };
  return {
    loading,
    getCurrentLocation,
  };
}