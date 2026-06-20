import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import { useAppContext } from '../context/AppContext'
import InputField from '../components/InputField';
import ChipSelector from '../components/ChipSelector';
import { CROPS } from '../constants/crops';
import useLocation from '../hooks/useLocation';
import { createFarmer, getFarmerById, updateFarmer } from "../services/farmerService";
import { useParams } from "react-router-dom";

function RegisterFarmer() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    village: "",
    district: "",
    state: "",
    land_size: "",
    latitude: null,
    longitude: null,
  });
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      loadFarmer();
    }
  }, [id]);

  async function loadFarmer() {
    try {
      const farmer =
        await getFarmerById(id);
      setFormData({
        name: farmer.name || "",
        phone: farmer.phone || "",
        village: farmer.village || "",
        district: farmer.district || "",
        state: farmer.state || "",
        land_size: farmer.land_size || "",
        latitude: farmer.latitude,
        longitude: farmer.longitude,
      });
      setSelectedCrops(
        farmer.crop_types || []
      );
    } catch (err) {
      console.error(err);
    }
  }

  const [selectedCrops, setSelectedCrops] = useState([]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleCrop = (crop) => {
    setSelectedCrops((prev) =>
      prev.includes(crop)
        ? prev.filter((c) => c !== crop)
        : [...prev, crop]
    );
  };

  const {loading:locationLoading, getCurrentLocation} = useLocation();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const fillCurrentLocation = async () => {
    try {
      const location = await getCurrentLocation();
      const address = location.address;
      setFormData((prev) => ({
        ...prev,
        village: address.village || address.suburb || address.town ||"",
        district: address.county || address.city || "",
        state: address.state || "",
        latitude: location.latitude,
        longitude: location.longitude,
      }));
    } catch (err) {
      alert(
        "Unable to fetch location."
      );

      console.error(err);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      if (!formData.name.trim()) {
        throw new Error("Name is required.");
      }

      if (!formData.phone.trim()) {
        throw new Error(
          "Phone number is required."
        );
      }
    
      if (selectedCrops.length === 0) {
        throw new Error(
          "Please select at least one crop."
        );
      }
    
      const payload = {
        ...formData,
        crop_types: selectedCrops,
      };
      if (id) {
        await updateFarmer(id, payload);
        setMessage("Farmer updated successfully!");
      } else {
        await createFarmer(payload);
        setMessage("Farmer registered successfully!");
      }
      setFormData({
        name: "",
        phone: "",
        village: "",
        district: "",
        state: "",
        land_size: "",
        latitude: null,
        longitude: null,
      });
      setSelectedCrops([]);

    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Layout>
      <div className="max-w-2xl mx-auto bg-green-100 shadow-lg rounded-3xl p-8 my-10">
        <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
          {id
            ? "Edit Farmer 🌾"
            : "Register Farmer 🌾"}
        </h1>
        <form
          className="space-y-4"
          onSubmit={handleSubmit}
        >
          <InputField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter name"
          />

          <InputField
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone number"
          />
          <button
            type="button"
            onClick={fillCurrentLocation}
            disabled={locationLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl mb-4">
            {locationLoading
              ? "Fetching Location..."
              : "📍 Use Current Location"}
          </button>

          <InputField
            label="Village"
            name="village"
            value={formData.village}
            onChange={handleChange}
          />

          <InputField
            label="District"
            name="district"
            value={formData.district}
            onChange={handleChange}
          />

          <InputField
            label="State"
            name="state"
            value={formData.state}
            onChange={handleChange}
          />

          <InputField
            label="Land Size"
            name="land_size"
            value={formData.land_size}
            onChange={handleChange}
            placeholder="Example: 5 Acres"
          />
        <div className="mt-6">
          <h2 className="font-semibold mb-3 text-green-700">
            Select Crops
          </h2>
          <ChipSelector
            items={CROPS}
            selected={selectedCrops}
            toggle={toggleCrop}
            theme="farmer"
          />
        </div>
        {message && (
          <div className="
            p-3
            rounded-xl
            bg-green-100
            text-green-800
          ">
            {message}
          </div>
        )}
        <button
          className="mt-8 w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-xl font-semibold" 
          type="submit"
          disabled={loading}
        >
        {loading
            ? "Saving..."
            : id
              ? "Update Farmer"
              : "Register Farmer"}
        </button>
        </form>
      </div>
    </Layout>
  )
}
export default RegisterFarmer
