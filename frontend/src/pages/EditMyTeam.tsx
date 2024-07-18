import { useRouteLoaderData } from "react-router-dom";
import { TeamForm } from "../components/UI/TeamForm";

export const EditMyTeam = () => {
  const teamData = useRouteLoaderData("myteam");

  return <TeamForm mode="수정" teamData={teamData} method="patch"/>;
};
