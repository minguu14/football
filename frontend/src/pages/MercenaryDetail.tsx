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
import {
  FaMapMarkerAlt,
  FaEdit,
  FaTrash,
  FaArrowLeft,
  FaUserPlus,
} from "react-icons/fa";

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
    // 에러 처리 로직을 여기에 추가할 수 있습니다.
  }

  if (data) {
    content = (
      <div className="max-w-4xl mx-auto mt-[150px] px-4">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <section className="p-8 border-b border-gray-200">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">경기장</h2>
            <div className="relative w-full h-[400px] rounded-xl overflow-hidden shadow-md mb-4">
              <NaverMap address={data.address} />
            </div>
            <p className="text-xl font-medium text-gray-700 flex items-center">
              <FaMapMarkerAlt className="mr-2 text-red-500" />
              {data.place}{" "}
              <a
                href={`https://map.naver.com/p/search/${data.place}`}
                target="_blank"
                className="ml-2 text-blue-600 hover:underline"
              >
                길 찾기
              </a>
            </p>
            <p className="mt-2 text-lg text-gray-600">{data.address}</p>
          </section>

          <section className="p-8 border-b border-gray-200">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">팀 정보</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoCard label="팀 이름" value={data.name} />
              <InfoCard label="팀 실력" value={data.skill} />
              <InfoCard label="팀 매너" value={data.manner} />
              <InfoCard label="팀 연령대" value={data.age} />
              <InfoCard label="포메이션" value={data.formation} />
            </div>
          </section>

          <section className="p-8 border-b border-gray-200">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">경기 정보</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoCard label="킥오프" value={data.kick_off} />
              <InfoCard label="경기 시간" value={data.play_time} />
              <InfoCard label="비용" value={data.cost} />
              <InfoCard label="모집 인원" value={data.member} />
              <InfoCard
                label="모집 희망 포지션"
                value={data.positions.join(", ")}
              />
              <InfoCard label="최소 쿼터" value={data.quarter} />
            </div>
          </section>

          <section className="p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">공지사항</h2>
            <p className="bg-gray-100 p-4 rounded-lg text-gray-700 leading-relaxed">
              {data.announcement}
            </p>
          </section>

          <div className="flex justify-between items-center p-8 bg-gray-50">
            <Link
              to=".."
              relative="path"
              className="flex items-center text-blue-600 hover:underline"
            >
              <FaArrowLeft className="mr-2" /> 뒤로가기
            </Link>
            {user && user._id && user._id !== data.owner && (
              <button
                onClick={() => setMercenaryModal(true)}
                className="flex items-center bg-orange-500 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-orange-600 transition-all duration-300 transform hover:scale-105"
              >
                <FaUserPlus className="mr-2" /> 용병 신청
              </button>
            )}
            {user && user._id && user._id === data.owner && (
              <div className="flex gap-4">
                <Link
                  to={"edit"}
                  className="flex items-center bg-blue-500 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
                >
                  <FaEdit className="mr-2" /> 모집 수정
                </Link>
                <button
                  onClick={deleteRecruitment}
                  className="flex items-center bg-red-500 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-red-600 transition-all duration-300 transform hover:scale-105"
                >
                  <FaTrash className="mr-2" /> 모집 삭제
                </button>
              </div>
            )}
          </div>
        </div>
        {mercenaryModal && (
          <MercenaryModal onClose={() => setMercenaryModal(false)} />
        )}
      </div>
    );
  }

  return content;
};

const InfoCard = ({ label, value }: any) => (
  <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
    <p className="font-semibold text-gray-700">{label}</p>
    <p className="text-lg text-gray-800">{value}</p>
  </div>
);

export default MercenaryDetail;

export const loader = async ({ params }: LoaderFunctionArgs) => {
  return queryClient.fetchQuery({
    queryKey: ["mercenaries", params.teamId],
    queryFn: () => getMercenaryDetail(params.teamId as string),
  });
};
