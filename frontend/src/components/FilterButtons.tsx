import { FaMapMarkerAlt, FaUserFriends, FaSearch } from "react-icons/fa";
import { useState } from "react";
import { AreaModal } from "./modal/AreaModal";

export const FilterButtons = ({ handleFilterChange }: any) => {
  const [area, setArea] = useState<string | null>("지역");
  const FILTER_BUTTONS = [
    { label: "전체", filter: "all" },
    { label: area, filter: area, icon: FaMapMarkerAlt },
    { label: "포지션", icon: FaUserFriends },
    { label: "모집중", icon: FaSearch },
  ];

  const [activeFilter, setActiveFilter] = useState<string | null>(
    FILTER_BUTTONS[0].label
  );
  const [isAreaModal, setIsAreaModal] = useState<boolean>(false);

  async function handleFilterClick(button: any) {
    if (button.label === area) {
      setIsAreaModal(true);
    } else {
      setArea("지역");
      setIsAreaModal(false);
    }
    setActiveFilter(button.label);
    if (button.label !== area) {
      handleFilterChange({ label: "전체", filter: "all" });
    }
  }

  return (
    <div className="relative">
      {isAreaModal && (
        <AreaModal
          setArea={setArea}
          setIsAreaModal={setIsAreaModal}
          handleFilterChange={handleFilterChange}
          setActiveFilter={setActiveFilter}
        />
      )}
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
    </div>
  );
};
