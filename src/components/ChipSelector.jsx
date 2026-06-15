import React from 'react'

function ChipSelector({
  items,
  selected,
  toggle,
  theme,
}) {
  return (
    <div className="flex flex-wrap gap-2">

      {items.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => toggle(item)}
          className={`
            px-4
            py-2
            rounded-full
            border
            transition
            ${
              selected.includes(item)
                ? theme === "farmer"
                  ? "bg-green-700 text-white"
                  : "bg-amber-600 text-white"
                : "bg-white"
            }
          `}
        >
          {item}
        </button>
      ))}

    </div>
  );
}

export default ChipSelector;
