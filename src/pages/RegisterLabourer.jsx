import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import { useAppContext } from '../context/AppContext'
import InputField from '../components/InputField';
import ChipSelector from '../components/ChipSelector';
import { SKILLS } from '../constants/skills';
import useLocation from '../hooks/useLocation';
import { createLabourer, getLabourerById, updateLabourer } from "../services/labourerService";
import { useParams } from "react-router-dom";

function RegisterLabourer() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    village: "",
    district: "",
    state: "",
    expected_wage: "",
    available: true,
    latitude: null,
    longitude: null,
  });
  const [selectedSkills, setSelectedSkills] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      loadLabourer();
    }
  }, [id]);

  async function loadLabourer() {
    try {
      const labourer = await getLabourerById(id);
      setFormData({
        name: labourer.name || "",
        phone: labourer.phone || "",
        village: labourer.village || "",
        district: labourer.district || "",
        state: labourer.state || "",
        expected_wage: labourer.expected_wage || "",
        available: labourer.available || true,
        latitude: labourer.latitude,
        longitude: labourer.longitude,
      });
      setSelectedSkills(
        labourer.skills || []
      );
    } catch (err) {
      console.error(err);
    }
  }

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
        ? prev.filter((c) => c !== skill)
        : [...prev, skill]
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
    
      if (selectedSkills.length === 0) {
        throw new Error(
          "Please select at least one crop."
        );
      }
    
      const payload = {
        ...formData,
        skills: selectedSkills,
      };
      if (id) {
        await updateLabourer(id, payload);
        setMessage("Labourer updated successfully!");
      } else {
        await createLabourer(payload);
        setMessage("Labourer registered successfully!");
      }
      setFormData({
        name: "",
        phone: "",
        village: "",
        district: "",
        state: "",
        expected_wage: "",
        available: true,
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
        <h1 className="text-3xl font-bold text-orange-500 mb-6 text-center">
          {id
            ? "Edit Labourer 👷"
            : "Register Labourer 👷"}
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
            label="₹ Expected Wages/Day"
            name="expected_wage"
            value={formData.expected_wage}
            onChange={handleChange}
            placeholder="Example: 500"
          />

          <div className="flex items-center gap-3 mt-4">
            <input
              type="checkbox"
              id="available"
              checked={formData.available}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  available: e.target.checked,
                }))
              }
              className="w-5 h-5 accent-amber-600"/>
            <label
              htmlFor="available"
              className="font-medium text-gray-700">
              Available for work
            </label>
          </div>

          <div className="mt-6">
            <h2 className="font-semibold mb-3 text-orange-500">
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
            <div className="
              p-3
              rounded-xl
              bg-orange-100
              text-orange-800
            ">
              {message}
            </div>
          )}
          <button
            className="mt-8 w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold" 
            type="submit"
            disabled={loading}
          >
          {loading
              ? "Saving..."
              : id
                ? "Update labourer"
                : "Register labourer"}
          </button>
        </form>
      </div>
    </Layout>
  )
}
export default RegisterLabourer
