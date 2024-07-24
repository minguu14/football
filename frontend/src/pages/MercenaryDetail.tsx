import { Link, json, useLoaderData } from "react-router-dom";
import NaverMap from "../components/NaverMap";
import { useAppSelector } from "../hooks/redux";

const MercenaryDetail = () => {
  const selectedTeam: any = useLoaderData();
  const { user } = useAppSelector((state) => state.user);
  console.log(user);

  return (
    <div className="max-w-[1000px] mx-auto mt-[150px] px-4">
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">경기장</h2>
        <div className="relative w-full h-[400px] border rounded-xl overflow-hidden shadow-lg">
          <NaverMap place={selectedTeam.place} />
        </div>
        <p className="mt-2 text-lg font-medium text-gray-700">
          {selectedTeam.place}
        </p>
      </section>

      <hr className="my-8 border-gray-300" />

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">팀 정보</h2>
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <p>
            <span className="font-semibold">팀 이름:</span> {selectedTeam.name}
          </p>
          <p>
            <span className="font-semibold">팀 실력:</span> {selectedTeam.skill}
          </p>
          <p>
            <span className="font-semibold">팀 매너:</span>{" "}
            {selectedTeam.manner}
          </p>
          <p>
            <span className="font-semibold">팀 연령대:</span> {selectedTeam.age}
          </p>
          <p>
            <span className="font-semibold">포메이션:</span>{" "}
            {selectedTeam.formation}
          </p>
        </div>
      </section>

      <hr className="my-8 border-gray-300" />

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">경기 정보</h2>
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <p>
            <span className="font-semibold">킥오프:</span>{" "}
            {selectedTeam.kick_off}
          </p>
          <p>
            <span className="font-semibold">경기 시간:</span>{" "}
            {selectedTeam.play_time}
          </p>
          <p>
            <span className="font-semibold">비용:</span> {selectedTeam.cost}
          </p>
          <p>
            <span className="font-semibold">모집 인원:</span>{" "}
            {selectedTeam.people}
          </p>
          <p>
            <span className="font-semibold">모집 희망 포지션:</span>{" "}
            {selectedTeam.positions.join(", ")}
          </p>
          <p>
            <span className="font-semibold">최소 쿼터:</span>{" "}
            {selectedTeam.quarter}
          </p>
        </div>
      </section>

      <hr className="my-8 border-gray-300" />

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">공지사항</h2>
        <p className="bg-gray-100 p-4 rounded-lg shadow-md">
          {selectedTeam.announcement}
        </p>
      </section>

      <div className="flex justify-between items-center">
        <Link to=".." relative="path" className="text-blue-500 hover:underline">
          뒤로가기
        </Link>
        {user._id !== selectedTeam.owner ? (
          <button className="bg-orange-500 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-orange-600 transition-colors duration-300">
            용병 신청
          </button>
        ) : (
          <div className="flex gap-7">
            <button className="bg-blue-500 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300">
              모집 수정
            </button>
            <button className="bg-red-500 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-red-600 transition-colors duration-300">
              모집 삭제
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MercenaryDetail;

export const loader = async ({ params }: any) => {
  const id = params.teamId;
  const res = await fetch("http://localhost:8080/getMercenaryDetail/" + id);
  if (!res.ok) {
    return json({ message: "데이터를 가져올 수 없습니다." });
  } else {
    return res;
  }
};
