import React from 'react'
import Layout from "../components/Layout";
import { useAppContext } from '../context/AppContext';
import supabase from '../services/supabase';

function Farmers(){  
  const { farmers } = useAppContext();
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">
        Farmers
      </h1>
    </Layout>
  )
}

export default Farmers
