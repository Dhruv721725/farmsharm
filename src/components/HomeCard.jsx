import React from 'react';
import {Link} from 'react-router-dom';

function HomeCard({
    Icon, title, description, buttonText, link, theme
}) {
  return (
    <div
      className={`rounded-2xl p-8 text-center shadow-lg transition-all cursor-pointer hover:shadow-xl hover:-translate-y-1
        ${
          theme === "farmer"
            ? "bg-green-600 hover:bg-green-700"
            : "bg-amber-600 hover:bg-amber-700"
        }`}>
        <Icon
          size={64}
          className="text-white mx-auto mb-4 rounded-full bg-white/20 p-4 h-24 w-24"
        />
        <h2 className="text-3xl font-extrabold text-white">{title}</h2>
        <p className="text-white mt-2">{description}</p>
        <Link
          to={link}
          className="block"
        >
          <button className="mt-4 bg-white text-green-800 font-bold py-2 px-4 rounded-full hover:bg-gray-200">
            {buttonText}
          </button>
        </Link>
    </div>
  )
}

export default HomeCard
