import {
  Link,
  LoaderFunctionArgs,
  useNavigate,
  useParams,
} from "react-router-dom";
import NaverMap from "../components/NaverMap";
import { useAppSelector } from "../hooks/redux";
import { useState } from "react";
import { MercenaryModal } from "../components/modal/MercenaryModal";
import { Team } from "../models";
import {
  deleteMercenary,
  getMercenaryDetail,
  queryClient,
} from "../utils/http";
import { useMutation, useQuery } from "@tanstack/react-query";

const MercenaryDetail = () => {
  const [mercenaryModal, setMercenaryModal] = useState<boolean>(false);
  const { user } = useAppSelector((state) => state.user);
  const params = useParams();
  const navigate = useNavigate();

  const { data, isError, error } = useQuery<Team>({
    queryKey: ["mercenary", params.teamId],
    queryFn: () => getMercenaryDetail(params.teamId as string),
  });

  const {
    mutate,
    isPending: isPendingDeletion,
    isError: isErrorDeleting,
    error: deleteError,
  } = useMutation({
    mutationFn: deleteMercenary,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["mercenary"],
        refetchType: "none",
      });
      navigate("/mercenary");
    },
  });

  function deleteRecruitment() {
    mutate(params.teamId as string);
  }

  let content;

  if (isErrorDeleting) {
  }

  if (data) {
    content = (
      <>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">경기장</h2>
          <div className="relative w-full h-[400px] border rounded-xl overflow-hidden shadow-lg">
            <NaverMap address={data.address} />
          </div>
          <p className="mt-2 text-lg font-medium text-gray-700">
            {data.place}{" "}
            <a
              href={`https://map.naver.com/p/search/${data.place}`}
              target="_blank"
              className="text-blue-600"
            >
              길 찾기
            </a>
          </p>
          <p className="mt-2 text-lg font-medium text-gray-700">
            {data.address}
          </p>
        </section>

        <hr className="my-8 border-gray-300" />

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">팀 정보</h2>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <p>
              <span className="font-semibold">팀 이름:</span> {data.name}
            </p>
            <p>
              <span className="font-semibold">팀 실력:</span> {data.skill}
            </p>
            <p>
              <span className="font-semibold">팀 매너:</span> {data.manner}
            </p>
            <p>
              <span className="font-semibold">팀 연령대:</span> {data.age}
            </p>
            <p>
              <span className="font-semibold">포메이션:</span> {data.formation}
            </p>
          </div>
        </section>

        <hr className="my-8 border-gray-300" />

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">경기 정보</h2>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <p>
              <span className="font-semibold">킥오프:</span> {data.kick_off}
            </p>
            <p>
              <span className="font-semibold">경기 시간:</span> {data.play_time}
            </p>
            <p>
              <span className="font-semibold">비용:</span> {data.cost}
            </p>
            <p>
              <span className="font-semibold">모집 인원:</span> {data.people}
            </p>
            <p>
              <span className="font-semibold">모집 희망 포지션:</span>{" "}
              {data.positions.join(", ")}
            </p>
            <p>
              <span className="font-semibold">최소 쿼터:</span> {data.quarter}
            </p>
          </div>
        </section>

        <hr className="my-8 border-gray-300" />

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">공지사항</h2>
          <p className="bg-gray-100 p-4 rounded-lg shadow-md">
            {data.announcement}
          </p>
        </section>
        {mercenaryModal && (
          <MercenaryModal onClose={() => setMercenaryModal(false)} />
        )}
        <div className="flex justify-between items-center">
          <Link
            to=".."
            relative="path"
            className="text-blue-500 hover:underline"
          >
            뒤로가기
          </Link>
          {user._id !== data.owner ? (
            <button
              onClick={() => setMercenaryModal(true)}
              className="bg-orange-500 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-orange-600 transition-colors duration-300"
            >
              용병 신청
            </button>
          ) : (
            <div className="flex gap-7">
              <Link
                to={"edit"}
                className="bg-blue-500 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300"
              >
                모집 수정
              </Link>
              <button
                onClick={deleteRecruitment}
                className="bg-red-500 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-red-600 transition-colors duration-300"
              >
                모집 삭제
              </button>
            </div>
          )}
        </div>
      </>
    );
  }

  return (
    <div className="max-w-[1000px] mx-auto mt-[150px] px-4">{content}</div>
  );
};

export default MercenaryDetail;

export const loader = async ({ params }: LoaderFunctionArgs) => {
  return queryClient.fetchQuery({
    queryKey: ["mercenaries", params.teamId],
    queryFn: () => getMercenaryDetail(params.teamId as string),
  });
};
