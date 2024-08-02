import { useState } from "react";
import { Team } from "../../../models";

const POSITION = ["LW", "ST", "RW", "CAM", "CM", "CDM", "LB", "CB", "RB", "GK"];

type Props = {
  teamData: Team | undefined;
};

const PositionField = ({ teamData }: Props) => {
  const [selectedPositions, setSelectedPositions] = useState<string[]>(
    teamData ? teamData.positions : []
  );

  const handlePositionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const position = e.target.value;
    setSelectedPositions((prevPositions: string[]) =>
      prevPositions.includes(position)
        ? prevPositions.filter((pos: string) => pos !== position)
        : [...prevPositions, position]
    );
  };
  return (
    <>
      {POSITION.map((position: string) => (
        <label key={position} className="inline-flex items-center">
          <input
            type="checkbox"
            id={`position-${position}`}
            name="positions"
            value={position}
            checked={selectedPositions.includes(position)}
            onChange={handlePositionChange}
            className="rounded border-gray-300 text-orange-600 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
          />
          <span className="ml-2 text-sm text-gray-700">{position}</span>
        </label>
      ))}
    </>
  );
};

export default PositionField;
