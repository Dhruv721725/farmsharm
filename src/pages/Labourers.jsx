import React from 'react'
import Layout from '../components/Layout'
import { useAppContext } from '../context/AppContext'
function Labourers() {
  const {labourers} = useAppContext();
  return (
    <Layout>

      <h1 className="text-3xl font-bold mb-6">
        Labourers
      </h1>

    </Layout>
  )
}

export default Labourers
