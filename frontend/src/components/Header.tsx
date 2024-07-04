import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
    const [isScroll, setIsScroll] = useState(false);
    let classes = "fixed top-0 left-0 right-0 z-50 transition ease-in duration-500 bg-none";

  useEffect(() => {
    window.addEventListener("scroll", () => {
        
        if(window.scrollY > 0){
            setIsScroll(true);
        }else{
            setIsScroll(false);
        }
    });

    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  if(isScroll) {
    classes = "fixed top-0 left-0 right-0 z-50 transition ease-in duration-500 bg-stone-200";
  }

  return (
    <header className={classes}>
      <nav className={`flex justify-between px-5 py-7 sm:mx-24 ${isScroll && 'text-orange-500'}`}>
        <ul className="flex gap-x-14 items-center">
          <li className="text-3xl">
            <Link to={"/"}>용병가좌</Link>
          </li>
          <li className="max-sm:hidden hover:text-amber-300">
            <Link to={"/teams"}>팀</Link>
          </li>
          <li className="max-sm:hidden hover:text-amber-300">
            <Link to={"/mercenary"}>용병</Link>
          </li>
        </ul>
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
      </nav>
    </header>
  );
};

export default Header;
