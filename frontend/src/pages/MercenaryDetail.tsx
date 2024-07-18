import { Link, json, useLoaderData } from "react-router-dom";

const MercenaryDetail = () => {
  const selectedTeam: any = useLoaderData();
  return (
    <>
      <ul className="mt-[200px]">
        <li>
          <img
            src={selectedTeam.logo}
            alt="team_logo"
            className="w-[150px] h-[150px] border-4"
          />
        </li>
        <li>
          <p>팀 이름 : {selectedTeam.name}</p>
        </li>
        <p>실력 : {selectedTeam.skill}</p>
        <p>매너 : {selectedTeam.manner}</p>
        <p>연령대 : {selectedTeam.age}</p>
        <p>지역 : {selectedTeam.area}</p>
        <p>팀 소개 : {selectedTeam.introductions}</p>
        <p>포메이션: 4231</p>
        <Link to=".." relative="path">
          뒤로가기
        </Link>
      </ul>
    </>
  );
};

export default MercenaryDetail;

export const loader = async ({ params }: any) => {
  const id = params.teamId;
  const res = await fetch("http://localhost:8080/getMercenaryDetail/" + id);
  if (!res.ok) {
    return json({ message: "데이터를 가져올 수 없습니다." });
  } else {
    return res;
  }
};
