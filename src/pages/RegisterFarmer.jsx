import React, { useState } from 'react'
import Layout from '../components/Layout'

function RegisterFarmer() {
  const [name, setName] = useState("")
  const [village, setVillage] = useState("")
  
  const handleSubmit = ()=>{
    console.log({
      name,
      village
    })
  }
  return (
    <Layout>
      <h1 className='text-3xl font-bold mb-6'>Register Farmer</h1>
      <div className='space-y-4'>
        <input 
          type="text"
          placeholder='Farmer Name'
          value={name}
          onChange={(e)=>setName(e.target.value)}
          className='border p-2 w-full'
        />

        <input
          type="text"
          placeholder="Village"
          value={village}
          onChange={(e) => setVillage(e.target.value)}
          className="border p-2 w-full"
        />

        <button
          onClick={handleSubmit}
          className="bg-green-700 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </div>
    </Layout>
  )
}

export default RegisterFarmer
