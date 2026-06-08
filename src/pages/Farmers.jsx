import React from 'react'
import Layout from "../components/Layout";
import FarmerCard from '../components/FarmerCard';
function Farmers() {
  const farmers = [
    {
      id: 1,
      name: "Ramesh",
      village: "Tumkur"
    },
    {
      id: 2,
      name: "Suresh",
      village: "Bangalore"
    }
  ];
  return (
    <Layout>

      <h1 className="text-3xl font-bold mb-6">
        Farmers
      </h1>

      {farmers.map((farmer) => (
        <FarmerCard
          name={farmer.name}
          village={farmer.village}
        />
      ))}

    </Layout>
  )
}

export default Farmers
