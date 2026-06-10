import React from "react";
import { Tractor } from "lucide-react";
import { Link } from "react-router-dom";

function FarmerCard() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300">
      <div className="flex justify-center mb-4">
        <Tractor className="text-green-600" size={50} />
      </div>
      <h2 className="text-2xl font-bold text-center">Register as Farmer</h2>
      <p className="text-gray-600 text-center mt-3">
        Post labour requirements, manage farms and connect with workers.
      </p>
      <Link to="/register-farmer" className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl text-center block">
        Register Farmer
      </Link>
    </div>
  );
}

export default FarmerCard;