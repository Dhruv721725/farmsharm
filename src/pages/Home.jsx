import React from 'react'
import logo from "../assets/images/farmsharm-logo.jpeg";
import Navbar from '../components/Navbar';
import Layout from '../components/Layout';

function Home() {
  return (
    <Layout>
      <div className='text-center mt-20'>
        <h1 className='text-5xl font-bold'>
          Welcome to FarmSharm
        </h1>
        <p className='mt-4 text-lg'>
          Connecting Farmers and Labourers
        </p>
      </div>
    </Layout>
  )
}

export default Home
