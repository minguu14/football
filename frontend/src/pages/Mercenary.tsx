import { json, useLoaderData } from "react-router-dom";
import MercenaryCard from "../components/MercenaryCard";
import { Team } from "../models";

export const Mercenary = () => {
  const teamData = useLoaderData() as Team[];
  
  return (
    <div className="max-w-[1000px] mx-auto px-3 mt-[200px]">
      <h1 className="mx-auto text-4xl my-2">
        팀 목록
      </h1>
      <ul className="flex items-center gap-3 mx-auto my-5">
        <li>
          <button className="border rounded-2xl py-2 px-5">지역</button>
        </li>
        <li>
          <button className="border rounded-2xl py-2 px-5">포지션</button>
        </li>
        <li>
          <button className="border rounded-2xl py-2 px-5">모집중</button>
        </li>
      </ul>
      <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-auto max-w-[1000px] gap-5">
        {teamData.map((team) => (
          <MercenaryCard team={team} key={team._id}/>
        ))}
      </main>
    </div>
  );
};

export const Loader = async () => {
  const res = await fetch("http://localhost:8080/getMercenary");
  if (!res.ok) {
    return json({ message: "데이터를 가져올 수 없습니다." });
  } else {
    return res;
  }
};
