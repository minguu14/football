import { useLoaderData } from "react-router-dom";
import { MercenaryLists } from "../models";

const MercenaryList = () => {
  const lists = useLoaderData() as MercenaryLists[];
  return (
    <div className="container mx-auto p-4 mt-[200px]">
      <h1 className="text-2xl font-bold mb-6">Mercenary List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {lists.map((list) => (
          <div
            key={list._id}
            className="bg-white shadow-md rounded-lg p-4 border"
          >
            <ul className="space-y-2">
              <li>
                <span className="font-semibold">Name:</span> {list.real_name}
              </li>
              <li>
                <span className="font-semibold">Contact:</span> {list.contact}
              </li>
              <li>
                <span className="font-semibold">Positions:</span>{" "}
                {list.positions.join(", ")}
              </li>
              <li>
                <span className="font-semibold">Player:</span>{" "}
                {list.player === "on" ? "선출" : "비선출"}
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MercenaryList;

export const loader = async () => {
  try {
    const res = await fetch("http://localhost:8080/mercenarylist", {
      credentials: "include",
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};
