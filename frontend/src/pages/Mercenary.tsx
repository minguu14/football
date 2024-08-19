import MercenaryCard from "../components/MercenaryCard";
import { Team } from "../models";
import { useQuery } from "@tanstack/react-query";
import { getMercenaryRecruitments, queryClient } from "../utils/http";
import { FilterButtons } from "../components/FilterButtons";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";

export const Mercenary = () => {
  const [filter, setFilter] = useState({ label: "전체", filter: "all" });
  const { data, isError, error } = useQuery<Team[]>({
    queryKey: ["recruitments", filter],
    queryFn: () => getMercenaryRecruitments(filter),
  });

  async function handleFilterChange(newFilter: any) {
    setFilter(newFilter);
    queryClient.invalidateQueries({
      queryKey: ["recruitments", newFilter],
    });
  }

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

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 mt-[100px]">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-10 text-center">
          팀 리스트
        </h1>
        <div className="flex justify-between">
          <FilterButtons handleFilterChange={handleFilterChange} />
          <div className="relative">
            <FaSearch className="absolute top-3 left-3" />
            <input
              type="text"
              className="border rounded-xl h-10 w-80 px-9"
              placeholder="원하는 내용으로 검색해주세요."
            />
          </div>
        </div>
        {content}
      </div>
    </div>
  );
};

export const loader = async () => {
  const filter = {
    label: "전체",
    filter: "all",
  };
  return queryClient.fetchQuery({
    queryKey: ["recruitments", filter],
    queryFn: () => getMercenaryRecruitments(filter),
  });
};
