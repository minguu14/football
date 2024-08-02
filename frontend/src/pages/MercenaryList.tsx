import { MercenaryLists } from "../models";
import {
  acceptMember,
  getMercenaryLists,
  queryClient,
  rejectMember,
} from "../utils/http";
import { useMutation, useQuery } from "@tanstack/react-query";

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
  const handleAccept = async (id: string) => {
    // 수락 로직 구현
    if (data) {
      const [member] = data.filter((list) => list._id === id);
      accept({
        ...member,
        isAccepted: true,
      });
    }
  };

  const handleReject = async (id: string) => {
    // 거절 로직 구현
    reject(id);
  };

  let content;

  if (isError) {
  }

  if (data) {
    content = (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((list) => (
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
                <span className="font-semibold text-gray-700">선출 여부:</span>{" "}
                {list.player === "on" ? "선출" : "비선출"}
              </li>
            </ul>
            <div className="mt-4 flex justify-end gap-x-5">
              {list.isAccepted ? (
                <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
                  승인 취소
                </button>
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>
        ))}
        {data.length === 0 && <p>신청한 용병이 없습니다.</p>}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 mt-[100px]">
      <h1 className="text-4xl font-bold text-center mb-10">용병 리스트</h1>
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
