import { json, useLoaderData } from "react-router-dom";
import MercenaryCard from "../components/MercenaryCard";

export const Mercenary = () => {
  const teamData: any = useLoaderData();
  return (
    <>
      <h1 className="mt-[200px] max-w-[1000px] mx-auto text-4xl px-3">
        모집중
      </h1>
      <ul className="flex items-center gap-3 mx-auto w-[1000px] my-5 px-3">
        <li>
          <button className="border rounded-2xl py-2 px-5">지역</button>
        </li>
        <li>
          <button className="border rounded-2xl py-2 px-5">포지션</button>
        </li>
        <li>
          <button className="border rounded-2xl py-2 px-5">모집중</button>
        </li>
        <li className="self-center">
          <input
            type="text"
            className="border rounded-2xl py-2 px-5 w-full"
            placeholder="경기장으로 검색해보세요."
          />
        </li>
      </ul>
      <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-auto max-w-[1000px] gap-5 px-3">
        {teamData.map((team: any, index: any) => (
          <MercenaryCard team={team} index={index} />
        ))}
      </main>
    </>
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
