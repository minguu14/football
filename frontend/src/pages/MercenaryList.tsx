import { Link } from "react-router-dom";
import { MercenaryLists } from "../models";
import {
  acceptMember,
  cancelMember,
  getMercenaryLists,
  queryClient,
  rejectMember,
} from "../utils/http";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FaUserCheck, FaUserTimes, FaUndo, FaEye } from 'react-icons/fa';

const MercenaryList = () => {
  const { data, isError, error } = useQuery<MercenaryLists[]>({
    queryKey: ["mercenaryLists"],
    queryFn: getMercenaryLists,
  });

  const {
    mutate: reject,
    isPending: isPendingDeletion,
    isError: isErrorDeleting,
    error: deleteError,
  } = useMutation({
    mutationFn: rejectMember,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["mercenaryLists"],
      });
    },
  });

  const {
    mutate: accept,
    isPending: isPendingAccept,
    isError: isErrorAccept,
    error: acceptError,
  } = useMutation({
    mutationFn: acceptMember,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["mercenaryLists"],
      });
    },
  });

  const {
    mutate: cancel,
    isPending: isPendingCancel,
    isError: isErrorCancel,
    error: CancelError,
  } = useMutation({
    mutationFn: cancelMember,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["mercenaryLists"],
      });
    },
  });

  const handleAccept = async (id: string) => {
    if (data) {
      const [member] = data.filter((list) => list._id === id);
      accept({
        ...member,
        isAccepted: true,
      });
    }
  };

  const handleReject = async (id: string) => {
    reject(id);
  };

  const handleCancel = async (id: string) => {
    if (data) {
      const [member] = data.filter((list) => list._id === id);
      cancel({
        ...member,
        isAccepted: false,
      });
    }
  };

  let content;

  if (isError) {
    content = <div className="text-red-600 text-center">에러가 발생했습니다. 다시 시도해 주세요.</div>;
  }

  if (data) {
    content = (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((list) => (
          <div
            key={list._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1"
          >
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4">
              <h2 className="text-xl font-bold text-white">{list.real_name}</h2>
            </div>
            <div className="p-6">
              <ul className="space-y-3">
                <li className="flex items-center">
                  <span className="font-semibold text-gray-700 w-1/3">연락처:</span>
                  <span className="text-gray-600">{list.contact}</span>
                </li>
                <li className="flex items-center">
                  <span className="font-semibold text-gray-700 w-1/3">선호 포지션:</span>
                  <span className="text-gray-600">{list.positions.join(", ")}</span>
                </li>
                <li className="flex items-center">
                  <span className="font-semibold text-gray-700 w-1/3">선출 여부:</span>
                  <span className={`px-2 py-1 rounded-full text-sm ${list.player === "on" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                    {list.player === "on" ? "선출" : "비선출"}
                  </span>
                </li>
              </ul>
              <Link 
                to={`/mercenary/${list.mercenary_teamId}`}
                className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
              >
                <FaEye className="mr-2" />
                <span className="font-semibold">신청한 모집 보기</span>
              </Link>
            </div>
            <div className="bg-gray-100 p-4 flex justify-end gap-x-3">
              {list.isAccepted ? (
                <button
                  onClick={() => handleCancel(list._id)}
                  className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200"
                >
                  <FaUndo className="mr-2" />
                  승인 취소
                </button>
              ) : (
                <>
                  <button
                    onClick={() => handleAccept(list._id)}
                    className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200"
                  >
                    <FaUserCheck className="mr-2" />
                    수락
                  </button>
                  <button
                    onClick={() => handleReject(list._id)}
                    className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200"
                  >
                    <FaUserTimes className="mr-2" />
                    거절
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
        {data.length === 0 && (
          <div className="col-span-full text-center text-gray-500 py-10">
            <p className="text-xl">신청한 용병이 없습니다.</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-[100px]">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">용병 리스트</h1>
      {content}
    </div>
  );
};

export default MercenaryList;

export const loader = async () => {
  return queryClient.fetchQuery({
    queryKey: ["mercenaryLists"],
    queryFn: getMercenaryLists,
  });
};