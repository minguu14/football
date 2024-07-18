import { json, useLoaderData } from "react-router-dom";
import MercenaryCard from "../components/MercenaryCard";

export const Mercenary = () => {
  const teamData: any = useLoaderData();

  return (
    <>
      {teamData.map((team: any, index: any) => (
        <MercenaryCard team={team} index={index} />
      ))}
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
