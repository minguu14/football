import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";
import { UserModal } from "./modal/UserModal";
import { FaUserCircle, FaBars, FaFutbol } from 'react-icons/fa';

const Header = () => {
  const { user } = useAppSelector((state) => state.user);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [isScroll, setIsScroll] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScroll(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    isScroll ? 'bg-white shadow-md' : 'bg-transparent'
  }`;

  const linkClasses = `transition-colors duration-200 hover:text-orange-500 ${
    isScroll ? 'text-gray-800' : 'text-white'
  }`;

  return (
    <header className={headerClasses}>
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-3xl font-bold flex items-center">
              <FaFutbol className={`mr-2 ${isScroll ? 'text-orange-500' : 'text-white'}`} />
              <span className={isScroll ? 'text-gray-800' : 'text-white'}>축구하자</span>
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link to={user ? "team" : "login"} className={linkClasses}>
                모집 등록
              </Link>
              <Link to="mercenary" className={linkClasses}>
                용병 모집
              </Link>
            </div>
          </div>
          {user ? (
            <div className="relative">
              {isModal && <UserModal setIsModal={setIsModal} />}
              <button
                className="flex items-center space-x-2 focus:outline-none"
                onClick={() => setIsModal(!isModal)}
              >
                <FaUserCircle className={`text-2xl ${isScroll ? 'text-orange-500' : 'text-white'}`} />
                <span className={`hidden sm:inline ${isScroll ? 'text-gray-800' : 'text-white'}`}>
                  {user.name}
                </span>
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/login"
                className={`${linkClasses} px-4 py-2 rounded-full border border-current`}
              >
                로그인
              </Link>
              <Link
                to="/register"
                className={`${linkClasses} px-4 py-2 rounded-full bg-orange-500 text-white hover:bg-orange-600`}
              >
                회원가입
              </Link>
            </div>
          )}
          <button className="md:hidden focus:outline-none">
            <FaBars className={isScroll ? 'text-gray-800' : 'text-white'} />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;