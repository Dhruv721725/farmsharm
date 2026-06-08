import React from "react";

function FarmerCard({ name, village }) {
  return (
    <div className="border p-4 rounded">
      <h2 className="font-bold">
        {name}
      </h2>
      <p>{village}</p>
    </div>
  );
}

export default FarmerCard;