import { Link } from "react-router-dom";

const MercenaryCard = ({ team, index }: any) => {
  return (
    <>
      <ul className="mt-[200px]">
        <li key={index}>
          <Link to={team._id}>{team.name}</Link>
        </li>
      </ul>
      {/* <img
        src={team.logo}
        alt="team_logo"
        className="w-[150px] h-[150px] border"
      /> */}
    </>
  );
};

export default MercenaryCard;
