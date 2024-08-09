import { Link } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";
import { Team } from "../models";
import { FaUsers, FaFutbol, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

type Props = {
  team: Team;
};

const MercenaryCard = ({ team }: Props) => {
  const { user } = useAppSelector((state) => state.user);
  
  return (
    <Link
      to={user ? `/recruitments/${team._id}` : "/login"}
      className="block bg-white rounded-2xl overflow-hidden border border-gray-100 transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4">
        <p className="text-sm text-white flex items-center">
          <FaCalendarAlt className="mr-2" />
          {team.matchStartTime}
        </p>
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
          <FaMapMarkerAlt className="mr-2 text-orange-500" />
          {team.field}
        </h3>
        <div className="space-y-3">
          <p className="text-md text-gray-700 flex items-center">
            <FaFutbol className="mr-2 text-gray-500" />
            <span className="font-semibold">포메이션:</span>
            <span className="ml-2">{team.formation}</span>
          </p>
          <p className="text-md text-gray-700 flex items-center">
            <FaUsers className="mr-2 text-gray-500" />
            <span className="font-semibold">모집 인원:</span>
            <span className="ml-2">{team.recruitingNumber}</span>
          </p>
          <div className="text-md text-gray-700">
            <p className="font-semibold mb-2">모집 포지션:</p>
            <div className="flex flex-wrap gap-2">
              {team.recruitingPositions.map((position, index) => (
                <span key={index} className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-sm">
                  {position}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MercenaryCard;