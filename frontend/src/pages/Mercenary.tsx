import MercenaryCard from "../components/MercenaryCard";
import { Team } from "../models";
import { useQuery } from "@tanstack/react-query";
import { getAllMercenaryRecruitments, queryClient } from "../utils/http";
import { FilterButtons } from "../components/FilterButtons";

export const Mercenary = () => {
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

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 mt-[100px]">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-10 text-center">
          팀 리스트
        </h1>
        <FilterButtons />
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
