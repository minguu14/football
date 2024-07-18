import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import myTeam from "../../images/team.jpg";
import { EditTeam } from "../components/EditTeam";

export const MyTeam = () => {
  const [teamData, setTeamData] = useState<any>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [editMode, setEditMode] = useState(false);

  function handleEdit() {
    setEditMode(!editMode);
  }

  useEffect(() => {
    async function fetchUserTeam() {
      try {
        const res = await fetch("http://localhost:8080/getUserTeam", {
          credentials: "include",
        });
        const resData = await res.json();

        if (!resData.success) {
          setErrorMessage(resData.message);
        }

        setTeamData(resData);
      } catch (err) {
        console.log(err);
      }
    }
    fetchUserTeam();
  }, []);

  if (errorMessage) {
    return (
      <>
        <p className="mt-[300px] mb-10 text-[50px] text-center">
          {errorMessage}
        </p>
        <Link to={"/team"}>
          <p className="text-[20px] text-center text-green-500">팀 등록하기</p>
        </Link>
      </>
    );
  }

  if (editMode) {
    return <EditTeam teamData={teamData} setEditMode={setEditMode}/>;
  }

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
        <button onClick={handleEdit}>수정</button>
      </ul>
    </>
  );
};
