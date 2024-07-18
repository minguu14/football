import { useEffect, useState } from "react";
import MercenaryCard from "../components/MercenaryCard";

export const Mercenary = () => {
  const [teamData, setTeamData] = useState<any>([]);

  useEffect(() => {
    async function fetchTeamData() {
      try {
        const res = await fetch("http://localhost:8080/getMercenary");
        if (!res.ok) {
          console.log("데이터가 없습니다.");
        }
        const resData = await res.json();
        setTeamData(resData);
      } catch (err) {
        console.log(err);
      }
    }
    fetchTeamData();
  }, []);
  return (
    <>
      {teamData.map((team: any, index: any) => (
        <MercenaryCard team={team} index={index} />
      ))}
    </>
  );
};
