import { json, Link, useRouteLoaderData } from "react-router-dom";
import myTeam from "../../images/team.jpg";

export const MyTeam = () => {
  const teamData: any = useRouteLoaderData('myteam');
  
  return (
    <>
      <ul className="mt-[200px]">
        <li>
          <img
            src={teamData.logo ? teamData.logo : myTeam}
            alt="team_logo"
            className="w-[150px] h-[150px] border-4"
          />
        </li>
        <li>
          <p>팀 이름 : {teamData.name}</p>
        </li>
        <p>실력 : {teamData.skill}</p>
        <p>매너 : {teamData.manner}</p>
        <p>연령대 : {teamData.age}</p>
        <p>지역 : {teamData.area}</p>
        <p>팀 소개 : {teamData.introductions}</p>
        <p>포메이션: 4231</p>
        <Link to={"/recruitment"}>
          <p>용병 모집하기</p>
        </Link>
        <Link to={"edit"}>수정</Link>
      </ul>
    </>
  );
};

export const loader = async () => {
  const res = await fetch("http://localhost:8080/getUserTeam", {
    credentials: "include",
  });
  if (!res.ok) {
    return json({ message: "데이터를 가져올 수 없습니다." });
  }
  return res;
};
