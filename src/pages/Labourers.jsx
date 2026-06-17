import React, {useEffect, useState} from "react";
import Layout from "../components/Layout";
import { fetchLabourers, deleteLabourer } from "../services/labourerService";
import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";

function Labourers() {
  const [labourers, setLabourers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLabourers();
  }, []);

  async function loadLabourers() {
    try {
      const data = await fetchLabourers();
      setLabourers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }
  
  useEffect(() => {loadLabourers();}, []);
  
  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this labourer?");
    if (!confirmed) return;
    try {
      await deleteLabourer(id);
      setLabourers((prev) =>
        prev.filter(
          (labourer) => labourer.id !== id
        )
      );
    } catch (error) {
      console.error(error);
      alert("Failed to delete labourer.");
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-orange-500 mb-6">
          Labourers Directory 👷
        </h1>

        {loading && (<p>Loading...</p>)}

        {!loading && labourers.length === 0 && (
          <p>
            No labourers found.
          </p>
        )}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {labourers.map((labourer) => (
            <div
              key={labourer.id}
              className="bg-orange-50 rounded-2xl shadow p-5">
              <h2 className="text-xl font-bold text-orange-500">
                {labourer.name}
              </h2>
              <p>
                📞 {labourer.phone}
              </p>
              <p>
                📍 {labourer.village}, {labourer.district}
              </p>
              <p>
                👷 {labourer.skills?.join(", ")}
              </p>
              <p>
                🌍 {labourer.state}
              </p>
              <p>
                🚜 {labourer.expected_wage}
              </p>
              <p>
                🏢 {labourer.available ? <span className="font-bold text-green-600">Available</span>:<span className="font-bold text-red-600">Unvailable</span>}
              </p>
              <div className="flex gap-2 mt-4">
                <Link
                  to={`/register-labourer/${labourer.id}`}
                  className="mt-4 inline-flex items-center gap-2
                    bg-green-100 text-green-700 px-3 py-2 rounded-lg
                    hover:bg-green-200">
                  <Pencil size={16} />
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(labourer.id)}
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

export default Labourers;