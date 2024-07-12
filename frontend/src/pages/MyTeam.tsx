import { useState } from "react";

export const MyTeam = () => {
const [teamData, setTeamData] = useState<any>([]);
async function handleClick() {
    const res = await fetch('http://localhost:8080/logo');
    const resData = await res.json();
    setTeamData(resData);
    console.log(resData);
}
console.log(teamData);
  return (
    <div>
        <button className="mt-[500px]" onClick={handleClick}>로고 가져오기</button>
        {
         teamData.map((team: any, index:any) => (
            <ul key={index}>
                <li>
                    {team.name}
                    <img src={team.logo} alt="team_logo" className="w-[150px] h-[150px] border-4"/>
                </li>
            </ul>
         ))
        }
        
    </div>
  )
}
