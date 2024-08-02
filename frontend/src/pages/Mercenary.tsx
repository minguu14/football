import MercenaryCard from "../components/MercenaryCard";
import { Team } from "../models";
import { useQuery } from "@tanstack/react-query";
import { getMercenaries, queryClient } from "../utils/http";

export const Mercenary = () => {
  const { data, isError, error } = useQuery<Team[]>({
    queryKey: ["mercenaries"],
    queryFn: getMercenaries,
  });

  let content;

  if (isError) {
  }

  if (data) {
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
          팀 목록
        </h1>
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button className="bg-orange-400 text-white font-semibold py-2 px-6 rounded-lg shadow-lg hover:bg-orange-500 transition duration-300 ease-in-out transform hover:-translate-y-1">
            지역
          </button>
          <button className="bg-orange-400 text-white font-semibold py-2 px-6 rounded-lg shadow-lg hover:bg-orange-500 transition duration-300 ease-in-out transform hover:-translate-y-1">
            포지션
          </button>
          <button className="bg-orange-400 text-white font-semibold py-2 px-6 rounded-lg shadow-lg hover:bg-orange-500 transition duration-300 ease-in-out transform hover:-translate-y-1">
            모집중
          </button>
        </div>
        {content}
      </div>
    </div>
  );
};

export const Loader = async () => {
  return queryClient.fetchQuery({
    queryKey: ["mercenaries"],
    queryFn: getMercenaries,
  });
};
