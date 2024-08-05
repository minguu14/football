import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useParams } from "react-router-dom";

type Props = {
  onClose: any;
};
const POSITION = ["LW", "ST", "RW", "CAM", "CM", "CDM", "LB", "CB", "RB", "GK"];
export const MercenaryModal = ({ onClose }: Props) => {
  const params = useParams();
  const dialog = useRef<HTMLDialogElement>(null);
  const modalRoot = document.getElementById("modal");

  const [selectedPositions, setSelectedPositions] = useState<string[]>([]);
  const handlePositionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const position = e.target.value;
    setSelectedPositions((prevPositions: string[]) =>
      prevPositions.includes(position)
        ? prevPositions.filter((pos: string) => pos !== position)
        : [...prevPositions, position]
    );
  };

  function handleCancel() {
    if (dialog.current) {
      dialog.current.close();
    }
    onClose();
  }

  async function handleApplication(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fd = new FormData(event.target as HTMLFormElement);
    const positions = fd.getAll("positions");
    const data: Record<string, FormDataEntryValue | FormDataEntryValue[]> =
      Object.fromEntries(fd.entries());
    data.positions = positions;

    const newData = {
      ...data,
      teamId: params.teamId,
      isAccepted: false,
    };

    const res = await fetch("http://localhost:8080/mercenary", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newData),
      credentials: "include",
    });

    if (res.ok) {
      if (dialog.current) {
        dialog.current.close();
      }
      onClose();
    }
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
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            실명
          </label>
          <input
            type="text"
            id="real_name"
            name="real_name"
            className="border rounded-md w-full p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="contact" className="block text-sm font-medium mb-1">
            연락처
          </label>
          <input
            type="text"
            id="contact"
            name="contact"
            className="border rounded-md w-full p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="positions" className="block text-sm font-medium mb-1">
            선호 포지션
          </label>
          <div className="flex flex-wrap gap-2">
            {POSITION.map((position: string) => (
              <label key={position} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="positions"
                  name="positions"
                  value={position}
                  checked={selectedPositions.includes(position)}
                  onChange={handlePositionChange}
                />
                {position}
              </label>
            ))}
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
