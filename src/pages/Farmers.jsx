import React, {useEffect, useState} from "react";
import Layout from "../components/Layout";
import { fetchFarmers } from "../services/farmerService";
import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import { deleteFarmer } from "../services/farmerService";

function Farmers() {
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFarmers();
  }, []);

  async function loadFarmers() {
    try {
      const data = await fetchFarmers();
      setFarmers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }
  
  useEffect(() => {loadFarmers();}, []);
  
  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this farmer?");
    if (!confirmed) return;
    try {
      await deleteFarmer(id);
      setFarmers((prev) =>
        prev.filter(
          (farmer) => farmer.id !== id
        )
      );
    } catch (error) {
      console.error(error);
      alert("Failed to delete farmer.");
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-green-700 mb-6">
          Farmers Directory 🌾
        </h1>

        {loading && (<p>Loading...</p>)}

        {!loading && farmers.length === 0 && (
          <p>
            No farmers found.
          </p>
        )}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {farmers.map((farmer) => (
            <div
              key={farmer.id}
              className="bg-green-50 rounded-2xl shadow p-5">
              <h2 className="text-xl font-bold text-green-700">
                {farmer.name}
              </h2>
              <p>
                📞 {farmer.phone}
              </p>
              <p>
                📍 {farmer.village}, {farmer.district}
              </p>
              <p>
                🌾 {farmer.crop_types?.join(", ")}
              </p>
              <p>
                🌍 {farmer.state}
              </p>
              <p>
                🚜 {farmer.land_size}
              </p>
              <div className="flex gap-2 mt-4">
                <Link
                  to={`/register-farmer/${farmer.id}`}
                  className="mt-4 inline-flex items-center gap-2
                    bg-green-100 text-green-700 px-3 py-2 rounded-lg
                    hover:bg-green-200">
                  <Pencil size={16} />
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(farmer.id)}
                  className="mt-4 inline-flex items-center gap-2
                    bg-red-100 text-red-700 px-3 py-2 rounded-lg
                    hover:bg-red-200">
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Farmers;