import React from 'react'
import { Hammer } from "lucide-react";
import { Link } from "react-router-dom";

function LabourerCard() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300">
      <div className="flex justify-center mb-4">
        <Hammer className="text-amber-600" size={50} />
      </div>
      <h2 className="text-2xl font-bold text-center">Register as Labourer</h2>
       <p className="text-gray-600 text-center mt-3">
        Find agricultural jobs, daily wage work and
        employment opportunities.
      </p>

      <Link to="/register-labourer" className="w-full mt-6 bg-orange-500 hover:bg-amber-600 text-white py-3 rounded-xl text-center block">
        Register Labour
      </Link>
    </div>
  );
}

export default LabourerCard
