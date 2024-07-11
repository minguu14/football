import { Link } from "react-router-dom";
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
      <ul className="flex flex-col bg-white text-center">
        <Link to={"/user"} onClick={() => setIsModal(false)}>
          <li className="border-b p-3">유저정보</li>
        </Link>
        <button onClick={handleBtn}>
          <li className="p-3">로그아웃</li>
        </button>
      </ul>
    </div>
  );
};
