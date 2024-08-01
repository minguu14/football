import { useLoaderData } from "react-router-dom";
import { MercenaryLists } from "../models";

const MercenaryList = () => {
  const lists = useLoaderData() as MercenaryLists[];
  console.log(lists);
  const handleAccept = async (id: string) => {
    // 수락 로직 구현
    const [member] = lists.filter((list) => list._id === id);
    await fetch("http://localhost:8080/acceptmember", {
      method: "PATCH",
      body: JSON.stringify(member),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const handleReject = async (id: string) => {
    // 거절 로직 구현
    await fetch("http://localhost:8080/rejectmember", {
      method: "DELETE",
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <div className="container mx-auto p-4 mt-[100px]">
      <h1 className="text-4xl font-bold text-center mb-10">용병 리스트</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {lists &&
          lists.map((list) => (
            <div
              key={list._id}
              className="bg-white shadow-lg rounded-lg p-6 border transition-transform transform hover:scale-105 hover:shadow-xl"
            >
              <ul className="space-y-3">
                <li>
                  <span className="font-semibold text-gray-700">이름:</span>{" "}
                  {list.real_name}
                </li>
                <li>
                  <span className="font-semibold text-gray-700">연락처:</span>{" "}
                  {list.contact}
                </li>
                <li>
                  <span className="font-semibold text-gray-700">
                    선호 포지션:
                  </span>{" "}
                  {list.positions.join(", ")}
                </li>
                <li>
                  <span className="font-semibold text-gray-700">
                    선출 여부:
                  </span>{" "}
                  {list.player === "on" ? "선출" : "비선출"}
                </li>
              </ul>
              <div className="mt-4 flex justify-end gap-x-5">
                <button
                  onClick={() => handleAccept(list._id)}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                >
                  수락
                </button>
                <button
                  onClick={() => handleReject(list._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  거절
                </button>
              </div>
            </div>
          ))}
        {lists.length === 0 && <p>신청한 용병이 없습니다.</p>}
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
