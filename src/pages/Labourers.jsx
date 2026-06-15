import React, { useState } from 'react'
import Layout from '../components/Layout'
import { useAppContext } from '../context/AppContext'
import { fetchLabourers } from '../services/labourerService';
function Labourers() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    village: "",
    district: "",
    state: "",
    skills: "",
    expected_wage: "",
  });

  const {labourers} = useAppContext();
  return (
    <Layout>
      { fetchLabourers }
    </Layout>
  )
}

export default Labourers
