import { FaMapMarkerAlt, FaUserFriends, FaSearch } from "react-icons/fa";
import { useState } from "react";

const FILTER_BUTTONS = [
  { label: "전체", filter: "" },
  { label: "지역", filter: "부천시", icon: FaMapMarkerAlt },
  { label: "포지션", icon: FaUserFriends },
  { label: "모집중", icon: FaSearch },
];

export const FilterButtons = ({ handleFilterChange }: any) => {
  const [activeFilter, setActiveFilter] = useState<string | null>(
    FILTER_BUTTONS[0].label
  );

  async function handleFilterClick(button: any) {
    console.log(button);
    setActiveFilter(button.label);
    handleFilterChange({ label: button.label, filter: button.filter });
  }

  return (
    <ul className="flex flex-wrap justify-center gap-4 mb-12">
      {FILTER_BUTTONS.map((button) => (
        <li key={button.label}>
          <button
            key={button.label}
            className={`flex items-center space-x-2 text-orange-500 font-semibold py-2 px-6 rounded-full border border-gray-100 hover:bg-orange-500 hover:text-white transition duration-300 ease-in-out transform hover:-translate-y-1 ${
              activeFilter === button.label ? "bg-orange-500 text-white" : ""
            }`}
            onClick={() => handleFilterClick(button)}
          >
            {button.icon ? <button.icon /> : undefined}
            <span>{button.label}</span>
          </button>
        </li>
      ))}
    </ul>
  );
};
