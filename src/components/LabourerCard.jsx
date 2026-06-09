import React from 'react'

function LabourerCard({ name, village }) {
  return (
    <div className="border p-4 rounded mb-4">
      <h2 className="font-bold">
        {name}
      </h2>
      <p>{village}</p>
    </div>
  );
}

export default LabourerCard
