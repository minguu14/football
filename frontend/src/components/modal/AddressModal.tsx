import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Props = {
  onClose: any;
  setAddress: React.Dispatch<
    React.SetStateAction<{
      address: string;
      title: string;
    }>
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
      className="rounded-md h-[500px] w-[800px] backdrop:bg-black/50"
      ref={dialog}
      onClose={onClose}
    >
      <div className="flex flex-col gap-y-4 justify-center items-center w-full h-full">
        <div className="flex">
          <input
            type="text"
            onChange={(e) => handleChange(e)}
            placeholder="경기 장소를 입력해주세요"
            className="border rounded-md w-full p-2"
          />
          <button
            className="border rounded-md w-[80px]"
            onClick={() => handleSearch(searchAddress)}
          >
            검색
          </button>
        </div>
        {addressItems.map((item: any, index: any) => (
          <div className="w-[500px] cursor-pointer hover:underline" key={index}>
            {!errorMessage && (
              <div onClick={() => handleSelectAddress(item)}>
                <p>{item.title.replace(/<[^>]*>/g, "")}</p>
                <p>{item.address}</p>
              </div>
            )}
          </div>
        ))}
        {errorMessage && <p>{errorMessage}</p>}
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
