import React from 'react'
import Layout from '../components/Layout';
import HomeCard from '../components/HomeCard';
import { Wheat, Users} from "lucide-react";
import logo from '../assets/images/farmsharm-logo.jpeg';

function Home() {
  return (
    <Layout>

  {/* Hero Section */}

  <div className="bg-green-800 text-white text-center py-12 px-4 shadow-inner">

    <div className="mx-auto w-24 h-24 rounded-full border-4 border-amber-400 bg-white flex items-center justify-center mb-4">

      <img
        src={logo}
        alt="FarmSharm Logo"
        className="w-full h-full object-cover rounded-full"
      />

    </div>

    <h1 className="text-4xl font-extrabold">
      Welcome to FarmSharm
    </h1>

    <p className="text-green-200 mt-2 text-lg">
      Connecting Farmers and Labourers across India
    </p>

  </div>

  {/* Cards */}

  <section className="py-10 px-4">

    <div className="max-w-3xl mx-auto">

      <div className="grid md:grid-cols-2 gap-6">

        <HomeCard 
          Icon={Wheat}
          title="Kisan"
          description="Farmers"
          buttonText="Register your farm"
          link="/register-farmer"
          theme="farmer"
        />

        <HomeCard 
          Icon={Users}
          title="Mazdoor"
          description="Labourers"
          buttonText="Register for work"
          link="/register-labourer"
          theme="labourer"
        />

      </div>

    </div>

  </section>

</Layout>
  )
}

export default Home
