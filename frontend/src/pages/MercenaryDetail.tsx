import { Link, json, useLoaderData } from "react-router-dom";

const MercenaryDetail = () => {
  const selectedTeam: any = useLoaderData();
  return (
    <>
      <ul className="mt-[200px]">
        <li>
          <p>팀 이름 : {selectedTeam.name}</p>
        </li>
        <li>
          <p>팀 실력 : {selectedTeam.skill}</p>
        </li>
        <li>
          <p>팀 매너 : {selectedTeam.manner}</p>
        </li>
        <li>
          <p>팀 연령대 : {selectedTeam.age}</p>
        </li>
        <li>
          <p>경기 장소: {selectedTeam.place}</p>
        </li>
        <li>
          <p>킥오프: {selectedTeam.kick_off}</p>
        </li>
        <li>
          <p>경기 시간: {selectedTeam.play_time}</p>
        </li>
        <li>
          <p>비용 : {selectedTeam.cost}</p>
        </li>
        <li>
          <p>모집 인원 : {selectedTeam.people}</p>
        </li>
        <li>
          <p>최소 쿼터 : {selectedTeam.quarter}</p>
        </li>
        <li>
          <p>공지사항 : {selectedTeam.announcement}</p>
        </li>

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
