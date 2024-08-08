import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useParams } from "react-router-dom";
import PositionField from "../UI/Form/PositionField";
import { TextareaField } from "../UI/Form/TextareaField";
import { mercenaryApplication, queryClient } from "../../utils/http";
import { useMutation } from "@tanstack/react-query";

type Props = {
  onClose: any;
};

export const MercenaryModal: React.FC<Props> = ({ onClose }) => {
  const params = useParams();
  const dialog = useRef<HTMLDialogElement>(null);
  const modalRoot = document.getElementById("modal");

  const {
    mutate,
    isPending: isPendingApplication,
    isError: isErrorApplication,
    error: applicationError,
  } = useMutation({
    mutationFn: mercenaryApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["recruitments", params.teamId],
        refetchType: "none",
      });

      dialog.current?.close();
      onClose();
    },
  });

  function handleCancel() {
    if (dialog.current) {
      dialog.current.close();
    }
    onClose();
  }

  async function handleApplication(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fd = new FormData(event.target as HTMLFormElement);
    const positions = fd.getAll("recruitingPositions");
    const data: Record<string, FormDataEntryValue | FormDataEntryValue[]> =
      Object.fromEntries(fd.entries());
    data.positions = positions;

    mutate({ data, params });
  }

  useEffect(() => {
    if (dialog.current) {
      dialog.current.showModal();
    }
  }, []);

  if (!modalRoot) {
    return null;
  }

  return createPortal(
    <dialog
      className="rounded-md h-[450px] w-[700px] backdrop:bg-black/50 p-6 shadow-lg"
      ref={dialog}
      onClose={onClose}
    >
      <form onSubmit={handleApplication}>
        <h2 className="text-2xl font-bold mb-4">용병 신청</h2>
        <div className="mb-4">
          <TextareaField
            id="comment"
            name="comment"
            rows={5}
            defaultValue={undefined}
            label="코멘트"
            required={false}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="positions" className="block text-sm font-medium mb-1">
            선호 포지션
          </label>
          <div className="flex flex-wrap gap-2">
            <PositionField teamData={undefined} />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="player" className="block text-sm font-medium mb-1">
            선출 여부
          </label>
          <input
            type="checkbox"
            id="player"
            name="player"
            className="border rounded-md p-2"
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={handleCancel}
            className="border rounded-md w-[80px] h-[30px] bg-red-500 text-white"
          >
            취소
          </button>
          <button className="border rounded-md w-[80px] h-[30px] bg-orange-400 text-white">
            신청
          </button>
        </div>
      </form>
    </dialog>,
    modalRoot
  );
};
