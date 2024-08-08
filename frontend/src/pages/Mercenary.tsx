import MercenaryCard from "../components/MercenaryCard";
import { Team } from "../models";
import { useQuery } from "@tanstack/react-query";
import { getAllMercenaryRecruitments, queryClient } from "../utils/http";
import { FaMapMarkerAlt, FaUserFriends, FaSearch } from "react-icons/fa";
import { useState } from "react";

export const Mercenary = () => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const { data, isError, error } = useQuery<Team[]>({
    queryKey: ["recruitments"],
    queryFn: getAllMercenaryRecruitments,
    staleTime: 10000,
  });

  let content;

  if (isError) {
    content = (
      <div className="text-center text-red-600 py-10">
        <p className="text-2xl font-bold">오류가 발생했습니다.</p>
        <p className="mt-2">잠시 후 다시 시도해 주세요.</p>
      </div>
    );
  }

  if (data && data.length <= 0) {
    content = (
      <main className="flex items-center justify-center">
        <p className="text-orange-500 text-xl font-semibold">
          등록된 팀이 없습니다.
        </p>
      </main>
    );
  }

  if (data && data.length > 0) {
    content = (
      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {data.map((team) => (
          <MercenaryCard team={team} key={team._id} />
        ))}
      </main>
    );
  }

  const filterButtons = [
    { label: "지역", icon: FaMapMarkerAlt },
    { label: "포지션", icon: FaUserFriends },
    { label: "모집중", icon: FaSearch },
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 mt-[100px]">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-10 text-center">
          팀 목록
        </h1>
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filterButtons.map((button) => (
            <button
              key={button.label}
              className={`flex items-center space-x-2 bg-white text-orange-500 font-semibold py-2 px-6 rounded-full shadow-lg hover:bg-orange-500 hover:text-white transition duration-300 ease-in-out transform hover:-translate-y-1 ${
                activeFilter === button.label ? "bg-orange-500 text-white" : ""
              }`}
              onClick={() => setActiveFilter(button.label)}
            >
              <button.icon />
              <span>{button.label}</span>
            </button>
          ))}
        </div>
        {content}
      </div>
    </div>
  );
};

export const loader = async () => {
  return queryClient.fetchQuery({
    queryKey: ["recruitments"],
    queryFn: getAllMercenaryRecruitments,
  });
};
