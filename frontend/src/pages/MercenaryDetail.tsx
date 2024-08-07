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
import { MercenaryLists, Team } from "../models";
import {
  deleteMercenaryRecruitment,
  getMercenaryRecruitmentDetail,
  queryClient,
} from "../utils/http";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  FaMapMarkerAlt,
  FaEdit,
  FaTrash,
  FaArrowLeft,
  FaUserPlus,
  FaUndo,
} from "react-icons/fa";
import { InfoCard } from "../components/UI/MercenaryDetail/InfoCard";

export const MercenaryDetail = () => {
  const [mercenaryModal, setMercenaryModal] = useState<boolean>(false);
  const { user } = useAppSelector((state) => state.user);
  const params = useParams();
  const navigate = useNavigate();

  const {
    data: mercenaryDetailData,
    isError: isErrorMercenaryDetail,
    error: mercenaryDetailError,
  } = useQuery<Team>({
    queryKey: ["recruitments", params.teamId],
    queryFn: () => getMercenaryRecruitmentDetail(params.teamId as string),
  });
  
  const {
    mutate,
    isPending: isPendingDeletion,
    isError: isErrorDeleting,
    error: deleteError,
  } = useMutation({
    mutationFn: deleteMercenaryRecruitment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["recruitments"],
        refetchType: "none",
      });
      navigate("/");
    },
  });

  function deleteRecruitment() {
    mutate(params.teamId as string);
  }

  let content;

  if (mercenaryDetailData) {
    content = (
      <div className="max-w-4xl mx-auto mt-[150px] px-4">
        <div className="bg-white rounded-xl overflow-hidden border">
          <section className="p-8 border-b border-gray-200">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">경기장</h2>
            <div className="relative w-full h-[400px] rounded-xl overflow-hidden mb-4">
              <NaverMap address={mercenaryDetailData.address} />
            </div>
            <p className="text-xl font-medium text-gray-700 flex items-center">
              <FaMapMarkerAlt className="mr-2 text-red-500" />
              {mercenaryDetailData.field}{" "}
              <a
                href={`https://map.naver.com/p/search/${mercenaryDetailData.field}`}
                target="_blank"
                className="ml-2 text-blue-600 hover:underline"
              >
                길 찾기
              </a>
            </p>
            <p className="mt-2 text-lg text-gray-600">
              {mercenaryDetailData.address}
            </p>
          </section>

          <section className="p-8 border-b border-gray-200">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">팀 정보</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoCard label="팀 이름" value={mercenaryDetailData.teamName} />
              <InfoCard
                label="팀 실력"
                value={mercenaryDetailData.skillLevel}
              />
              <InfoCard label="팀 매너" value={mercenaryDetailData.manners} />
              <InfoCard
                label="팀 연령대"
                value={mercenaryDetailData.ageGroup}
              />
              <InfoCard
                label="포메이션"
                value={mercenaryDetailData.formation}
              />
            </div>
          </section>

          <section className="p-8 border-b border-gray-200">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">경기 정보</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoCard
                label="킥오프"
                value={mercenaryDetailData.matchStartTime}
              />
              <InfoCard
                label="경기 시간"
                value={mercenaryDetailData.totalMatchTime}
              />
              <InfoCard label="비용" value={mercenaryDetailData.cost} />
              <InfoCard
                label="모집 인원"
                value={mercenaryDetailData.recruitingNumber}
              />
              <InfoCard
                label="모집 희망 포지션"
                value={mercenaryDetailData.recruitingPositions.join(", ")}
              />
              <InfoCard
                label="최소 쿼터"
                value={mercenaryDetailData.minimumQuarter}
              />
            </div>
          </section>

          <section className="p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">코멘트</h2>
            <p className="bg-gray-100 p-4 rounded-lg text-gray-700 leading-relaxed">
              {mercenaryDetailData.comment}
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

            {user && user._id && user._id !== mercenaryDetailData.owner && (
              <button
                onClick={() => setMercenaryModal(true)}
                className="flex items-center bg-orange-500 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-orange-600 transition-all duration-300 transform hover:scale-105"
              >
                <FaUserPlus className="mr-2" /> 용병 신청
              </button>
            )}
            {user && user._id && user._id === mercenaryDetailData.owner && (
              <div className="flex gap-4">
                <Link
                  to={`/recruitments/${params.teamId}/edit`}
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
    return content;
  }
};

export const loader = ({ params }: LoaderFunctionArgs) => {
  return queryClient.fetchQuery({
    queryKey: ["recruitments", params.teamId],
    queryFn: () => getMercenaryRecruitmentDetail(params.teamId as string),
  });
};
