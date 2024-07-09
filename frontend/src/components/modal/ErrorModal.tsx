import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

type Props = {
  errorMessage: string;
  onClose: any;
};

export const ErrorModal = ({ errorMessage, onClose }: Props) => {
  const dialog = useRef<HTMLDialogElement>(null);
  const modalRoot = document.getElementById("modal");

  function handleBtn() {
    if (dialog.current) {
      dialog.current.close();
    }
  }

  useEffect(() => {
    dialog.current;
    if (dialog.current) {
      dialog.current.showModal();
    }
  }, []);

  if (!modalRoot) {
    return null;
  }

  return createPortal(
    <dialog
      className="rounded-md text-red-500 h-[150px] w-[300px] backdrop:bg-black/50"
      ref={dialog}
      onClose={onClose}
    >
      <div className="flex flex-col gap-y-4 justify-center items-center w-full h-full border">
        <p>{errorMessage}</p>
        <button
          onClick={handleBtn}
          className="border rounded-md w-[80px] h-[30px] bg-orange-400 text-white"
        >
          확인
        </button>
      </div>
    </dialog>,
    modalRoot
  );
};
