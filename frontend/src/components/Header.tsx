import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";
import { UserModal } from "./modal/UserModal";
import { FaUserCircle, FaBars, FaFutbol, FaTimes } from "react-icons/fa";

const Header = () => {
  const { user } = useAppSelector((state) => state.user);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [isScroll, setIsScroll] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScroll(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const homeHeaderClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    isScroll ? "bg-white shadow-md" : "bg-transparent"
  }`;

  const headerClasses =
    "fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white shadow-md";

  const homeLinkClasses = `transition-colors duration-200 hover:text-orange-500 ${
    isScroll ? "text-gray-800" : "text-white"
  }`;

  const linkClasses =
    "transition-colors duration-200 hover:text-orange-500 text-gray-800";

  const homeIconClasses = `${isScroll ? "text-orange-500" : "text-white"}`;
  const iconClasses = "text-orange-500";

  return (
    <header
      className={location.pathname === "/" ? homeHeaderClasses : headerClasses}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-3xl font-bold flex items-center">
              <FaFutbol
                className={`mr-2 ${
                  location.pathname === "/" ? homeIconClasses : iconClasses
                }`}
              />
              <span
                className={
                  location.pathname === "/" ? homeIconClasses : iconClasses
                }
              >
                축구하자
              </span>
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link
                to={user ? "team" : "login"}
                className={
                  location.pathname === "/" ? homeLinkClasses : linkClasses
                }
              >
                모집 등록
              </Link>
              <Link
                to="mercenary"
                className={
                  location.pathname === "/" ? homeLinkClasses : linkClasses
                }
              >
                용병 모집
              </Link>
            </div>
          </div>
          {user ? (
            <div className="hidden md:block relative">
              {isModal && <UserModal setIsModal={setIsModal} />}
              <button
                className="flex items-center space-x-2 focus:outline-none"
                onClick={() => setIsModal(!isModal)}
              >
                <FaUserCircle
                  className={`text-2xl ${
                    location.pathname === "/" ? homeIconClasses : iconClasses
                  }`}
                />
                <span
                  className={`hidden sm:inline ${
                    location.pathname === "/" ? homeIconClasses : iconClasses
                  }`}
                >
                  {user.name}
                </span>
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/login"
                className={`${homeLinkClasses} px-4 py-2 rounded-full`}
              >
                로그인
              </Link>
              <Link
                to="/register"
                className={`${homeLinkClasses} px-4 py-2 rounded-full`}
              >
                회원가입
              </Link>
            </div>
          )}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <FaTimes className={isScroll ? "text-gray-800" : "text-white"} />
            ) : (
              <FaBars
                className={
                  location.pathname === "/" ? homeLinkClasses : linkClasses
                }
              />
            )}
          </button>
        </div>
      </nav>
      {/* 모바일 */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-500 ease-in-out ${
          isMobileMenuOpen ? "translate-x-10" : "translate-x-full"
        }`}
      >
        <div className="p-4">
          <button
            className="mb-4 text-gray-800"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <FaTimes />
          </button>
          <div className="flex flex-col space-y-4">
            <Link
              to={user ? "team" : "login"}
              className="text-gray-800 hover:text-orange-500"
            >
              모집 등록
            </Link>
            <Link
              to="mercenary"
              className="text-gray-800 hover:text-orange-500"
            >
              용병 모집
            </Link>
            {user ? (
              <>
                <Link
                  to="/user"
                  className="text-gray-800 hover:text-orange-500"
                >
                  유저정보
                </Link>
                <Link
                  to="/mercenarylist"
                  className="text-gray-800 hover:text-orange-500"
                >
                  용병 리스트
                </Link>
                <Link
                  to="/recruitlist"
                  className="text-gray-800 hover:text-orange-500"
                >
                  모집 리스트
                </Link>
                <button
                  className="text-red-600 hover:text-red-700 text-left"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                  }}
                >
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-800 hover:text-orange-500"
                >
                  로그인
                </Link>
                <Link
                  to="/register"
                  className="text-gray-800 hover:text-orange-500"
                >
                  회원가입
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
