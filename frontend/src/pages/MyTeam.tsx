import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import myTeam from "../../images/team.jpg";

export const MyTeam = () => {
  const [teamData, setTeamData] = useState<any>([]);
  const [errorMessage, setErrorMessage] = useState("");
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
          <p>{teamData.name}</p>
        </li>
        <p>{teamData.skill}</p>
        <p>{teamData.manner}</p>
        <p>{teamData.age}</p>
        <p>{teamData.area}</p>
        <p>{teamData.introductions}</p>
      </ul>
    </>
  );
};
