import { json, LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { TeamForm } from "../components/UI/TeamForm";
import { Team } from "../models";

export const EditMyTeam = () => {
  const teamData = useLoaderData() as Team;
  return <TeamForm mode="수정" teamData={teamData} method="patch" />;
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const id = params.teamId;
  const res = await fetch("http://localhost:8080/getMercenaryDetail/" + id);
  if (!res.ok) {
    return json({ message: "데이터를 가져올 수 없습니다." });
  }
  return res;
};
