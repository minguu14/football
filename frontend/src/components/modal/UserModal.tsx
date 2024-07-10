import { useAppDispatch } from "../../hooks/redux";
import { logOut } from "../../store/userSlice";

type Props = {
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const UserModal = ({ setIsModal }: Props) => {
  const dispatch = useAppDispatch();
  function handleBtn() {
    dispatch(logOut(null));
    setIsModal(false);
  }
  return (
    <div className="absolute border rounded-md w-48 top-10 right-[-75px]">
      <div className="flex flex-col">
        <button className="border-b p-3">유저정보</button>
        <button className="border-b p-3">팀</button>
        <button className="border-b p-3">용병</button>
        <button className="p-3" onClick={handleBtn}>
          로그아웃
        </button>
      </div>
    </div>
  );
};
