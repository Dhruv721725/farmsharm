import React, { useState } from "react";
import Layout from "../components/Layout";
import InputField from "../components/InputField";
import ChipSelector from "../components/ChipSelector";

import useLocation from "../hooks/useLocation";
import { SKILLS } from "../constants/skills";
import { createLabourer } from "../services/labourerService";

function RegisterLabourer() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    village: "",
    district: "",
    state: "",
    expected_wage: "",
    latitude: null,
    longitude: null,
  });

  const [selectedSkills, setSelectedSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const {loading: locationLoading, getCurrentLocation} = useLocation();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleSkill = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    );
  };

  const fillCurrentLocation = async () => {
    try {
      const location = await getCurrentLocation();
      const address = location.address;
      setFormData((prev) => ({
        ...prev,
        village: address.village || address.suburb || address.town || "",
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
        throw new Error("Phone number is required.");
      }
      if (selectedSkills.length === 0) {
        throw new Error("Please select at least one skill.");
      }

      const payload = {
        ...formData,
        expected_wage: Number(formData.expected_wage),
        skills: selectedSkills,
        available: true,
      };
      await createLabourer(payload);
      setMessage("Labourer registered successfully!");
      setFormData({
        name: "",
        phone: "",
        village: "",
        district: "",
        state: "",
        expected_wage: "",
        latitude: null,
        longitude: null,
      });
      setSelectedSkills([]);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-3xl p-8 my-10">
        <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
          Register Labourer 👷
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
            label="Expected Wage (₹/day)"
            name="expected_wage"
            type="number"
            value={formData.expected_wage}
            onChange={handleChange}
            placeholder="Example: 700"
          />
          <div className="mt-6">
            <h2 className="font-semibold mb-3 text-green-700">
              Select Skills
            </h2>
            <ChipSelector
              items={SKILLS}
              selected={selectedSkills}
              toggle={toggleSkill}
              theme="labourer"
            />
          </div>
          {message && (
            <div className=" p-3 rounded-xl bg-amber-100 text-amber-800">
              {message}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className=" mt-8 w-full bg-amber-600 hover:bg-amber-700 disabled:bg-gray-400 text-white py-3 rounded-xl font-semibold">
            {loading
              ? "Registering..."
              : "Register Labourer"}
          </button>
          </form>
      </div>
    </Layout>
  );
}

export default RegisterLabourer;
