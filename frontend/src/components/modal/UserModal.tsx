import { Link } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux";
import { logOut } from "../../store/userSlice";

type Props = {
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const UserModal = ({ setIsModal }: Props) => {
  const dispatch = useAppDispatch();

  async function handleLogout() {
    try {
      const res = await fetch("http://localhost:8080/logout", {
        method: "POST",
        credentials: "include",
      });
      const resData = await res.json();
      if (res.ok) {
        dispatch(logOut(null));
        setIsModal(false);
      }
      console.log(resData);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="absolute border rounded-md w-48 top-10 right-[-75px]">
      <ul className="flex flex-col bg-white text-center">
        <Link to={"/user"} onClick={() => setIsModal(false)}>
          <li className="border-b p-3">유저정보</li>
        </Link>
        <Link to={"/mercenarylist"} onClick={() => setIsModal(false)}>
          <li className="border-b p-3">신청</li>
        </Link>
        <button onClick={handleLogout}>
          <li className="p-3">로그아웃</li>
        </button>
      </ul>
    </div>
  );
};
