import { Link } from "react-router-dom";

const MercenaryCard = ({ team }: any) => {
  return (
    <>
      <div className="border rounded-2xl p-5 shadow-lg hover:shadow-2xl transition-shadow duration-300">
        <Link to={team._id}>
          <p className="text-xs text-gray-500 mb-1">{team.kick_off}</p>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {team.place}
          </h3>
          <p className="text-md text-gray-700 mb-2">
            포메이션 : {team.formation}
          </p>
          <p className="text-md text-gray-700">
            모집 포지션 :
            <span className="block text-gray-900 font-medium w-52">
              {team.positions.join(", ")}
            </span>
          </p>
        </Link>
      </div>
    </>
  );
};

export default MercenaryCard;
