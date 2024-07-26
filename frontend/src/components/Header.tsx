import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";
import { UserModal } from "./modal/UserModal";

const Header = () => {
  const { user } = useAppSelector((state) => state.user);
  const [isModal, setIsModal] = useState(false);
  const [isScroll, setIsScroll] = useState(false);
  let classes =
    "fixed top-0 left-0 right-0 z-50 transition ease-in duration-500 bg-none";

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 0) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    });

    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  if (isScroll) {
    classes =
      "fixed top-0 left-0 right-0 z-50 transition ease-in duration-500 bg-stone-200";
  }

  function handleBtn() {
    setIsModal(!isModal);
  }

  return (
    <header className={classes}>
      <nav
        className={`flex justify-between px-5 py-7 sm:mx-24 ${
          isScroll && "text-orange-500"
        }`}
      >
        <ul className="flex gap-x-14 items-center">
          <li className="text-3xl">
            <Link to={"/"}>로고</Link>
          </li>
          <li className="max-sm:hidden hover:text-amber-300">
            <Link to={user ? "team" : "login"}>모집 등록</Link>
          </li>
          <li className="max-sm:hidden hover:text-amber-300">
            <Link to={"mercenary"}>용병 모집</Link>
          </li>
        </ul>
        {user ? (
          <div className="relative">
            {isModal && <UserModal setIsModal={setIsModal}/>}
            <button className="max-sm:hidden border rounded-[50%] w-[40px] h-[40px] bg-slate-300" onClick={handleBtn}>
              {user.name}
            </button>
            <button className="sm:hidden">햄버거</button>
          </div>
        ) : (
          <ul className="flex gap-x-5 items-center">
            <li className="max-sm:hidden hover:text-amber-300">
              <Link to={"/login"}>로그인</Link>
            </li>
            <li className="max-sm:hidden hover:text-amber-300">
              <Link to={"/register"}>회원가입</Link>
            </li>
            <li className="sm:hidden">
              <button>햄버거</button>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Header;
