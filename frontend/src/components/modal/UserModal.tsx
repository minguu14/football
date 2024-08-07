import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux";
import { logOut } from "../../store/userSlice";

type Props = {
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const UserModal = ({ setIsModal }: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      const res = await fetch("api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      const resData = await res.json();
      if (res.ok) {
        dispatch(logOut(null));
        setIsModal(false);
        navigate('/login');
      }
      console.log(resData);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="absolute w-64 top-5 left-[-6rem] mt-2 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
      <ul className="divide-y divide-gray-200">
        <li>
          <Link
            to="/user"
            className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition duration-150 ease-in-out"
            onClick={() => setIsModal(false)}
          >
            유저정보
          </Link>
        </li>
        <li>
          <Link
            to="/mercenarylist"
            className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition duration-150 ease-in-out"
            onClick={() => setIsModal(false)}
          >
            <span>용병 리스트</span>
          </Link>
        </li>
        <li>
          <Link
            to="/recruitlist"
            className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition duration-150 ease-in-out"
            onClick={() => setIsModal(false)}
          >
            <span>모집 리스트</span>
          </Link>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition duration-150 ease-in-out"
          >
            로그아웃
          </button>
        </li>
      </ul>
    </div>
  );
};