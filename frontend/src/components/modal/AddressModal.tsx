import { SetStateAction, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Props = {
  onClose: () => void;
  setAddress: React.Dispatch<
    SetStateAction<{ address: string; title: string }>
  >;
};

export const AddressModal = ({ onClose, setAddress }: Props) => {
  const dialog = useRef<HTMLDialogElement>(null);
  const modalRoot = document.getElementById("modal");
  const [addressItems, setAddressItems] = useState<any[]>([]);
  const [searchAddress, setSearchAddress] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  async function handleSearch(searchAddress: string) {
    setErrorMessage("");
    const res = await fetch(
      `/v1/search/local.json?query=${searchAddress}&display=5&start=1&sort=random`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Naver-Client-Id": `${import.meta.env.VITE_HEADERS_CLIENT_ID}`,
          "X-Naver-Client-Secret": `${import.meta.env.VITE_HEADERS_SECRET_KEY}`,
        },
      }
    );
    const resData = await res.json();
    if (resData.items.length === 0) {
      setErrorMessage("해당 장소를 찾지 못했습니다.");
    }
    setAddressItems(resData.items);
  }

  function handleSelectAddress(item: any) {
    setAddress({ address: item.address, title: item.title });
    if (dialog.current) {
      dialog.current.close();
    }
    onClose();
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchAddress(e.target.value);
  }

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
      className="rounded-lg shadow-xl h-[500px] w-[800px] backdrop:bg-black/50 p-6"
      ref={dialog}
      onClose={onClose}
    >
      <div className="flex flex-col gap-y-6 h-full">
        <h2 className="text-2xl font-bold text-gray-800">경기 장소 검색</h2>
        <div className="flex gap-x-2">
          <input
            type="text"
            onChange={(e) => handleChange(e)}
            placeholder="경기 장소를 입력해주세요"
            className="border border-gray-300 rounded-md w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition duration-300"
            onClick={() => handleSearch(searchAddress)}
          >
            검색
          </button>
        </div>
        <div className="flex-grow overflow-y-auto">
          {addressItems.map((item: any, index: any) => (
            <div
              className="mb-4 p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer transition duration-300"
              key={index}
              onClick={() => handleSelectAddress(item)}
            >
              {!errorMessage && (
                <div>
                  <p className="font-semibold text-gray-800">
                    {item.title.replace(/<[^>]*>/g, "")}
                  </p>
                  <p className="text-gray-600 text-sm mt-1">{item.address}</p>
                </div>
              )}
            </div>
          ))}
          {errorMessage && (
            <p className="text-red-500 text-center">{errorMessage}</p>
          )}
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleBtn}
            className="bg-orange-400 text-white rounded-md px-6 py-2 hover:bg-orange-500 transition duration-300"
          >
            확인
          </button>
        </div>
      </div>
    </dialog>,
    modalRoot
  );
};
