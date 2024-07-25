import { json, useLoaderData } from "react-router-dom";
import { TeamForm } from "../components/UI/TeamForm";

export const EditMyTeam = () => {
  const teamData = useLoaderData();
  return <TeamForm mode="수정" teamData={teamData} method="patch" />;
};

export const loader = async ({ params }: any) => {
  const id = params.teamId;
  const res = await fetch("http://localhost:8080/getMercenaryDetail/" + id);
  if (!res.ok) {
    return json({ message: "데이터를 가져올 수 없습니다." });
  }
  return res;
};
