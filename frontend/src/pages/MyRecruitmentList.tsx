import { useQuery } from "@tanstack/react-query";
import { Team } from "../models";
import { getMyRecruitment, queryClient } from "../utils/http";
import MercenaryCard from "../components/MercenaryCard";

export const MyRecruitmentList = () => {
  const { data, isError, error } = useQuery<Team[]>({
    queryKey: ["myrecruitments"],
    queryFn: getMyRecruitment,
  });

  let content;

  if (data && data.length === 0) {
    content = (
      <main className="flex items-center justify-center">
        <p className="text-orange-500 text-xl font-semibold">
          모집 내역이 없습니다.
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
          내 모집 리스트
        </h1>
        {content}
      </div>
    </div>
  );
};

export const loader = async () => {
  return queryClient.fetchQuery({
    queryKey: ["myrecruitments"],
    queryFn: getMyRecruitment,
  });
};
