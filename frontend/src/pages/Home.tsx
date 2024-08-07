import { Link } from "react-router-dom";
import teamImg from "../../images/team.jpg";
import { useAppSelector } from "../hooks/redux";
import { FaFutbol, FaUsers, FaSearch } from "react-icons/fa";

export const HomePage = () => {
  const { user } = useAppSelector((state) => state.user);

  return (
    <div className="bg-gray-100">
      <section className="relative h-screen flex items-center justify-center bg-[url(images/ball.jpg)] bg-cover bg-center">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center space-y-8">
          <h1 className="text-6xl font-bold text-white leading-tight">
            <span className="text-orange-500">축구</span> 용병을 찾아보자!
          </h1>
          <p className="text-4xl text-white">용병을 모집해보자!</p>
          <p className="text-3xl text-white">즐축 합시다</p>
          <Link
            to={user ? "recruitment" : "/login"}
            className="inline-block bg-orange-500 text-white text-xl font-semibold px-8 py-4 rounded-full hover:bg-orange-600 transition duration-300"
          >
            시작하기
          </Link>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              내 <span className="text-orange-500">팀</span>을 등록하고 <span className="text-orange-500">용병</span>을 구해보자
            </h2>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <img
              src={teamImg}
              alt="teamImg"
              className="w-full md:w-1/2 rounded-lg shadow-xl"
            />
            <div className="w-full md:w-1/2 space-y-6">
              <FeatureItem
                icon={FaFutbol}
                title="팀 등록"
                description="간편하게 팀을 등록하세요"
              />
              <FeatureItem
                icon={FaUsers}
                title="용병 모집"
                description="필요한 포지션의 용병을 모집하세요"
              />
              <FeatureItem
                icon={FaSearch}
                title="빠른 매칭"
                description="실력에 맞는 용병을 빠르게 찾아보세요"
              />
              <Link
                to={user ? "recruitment" : "/login"}
                className="inline-block bg-orange-500 text-white text-lg font-semibold px-8 py-3 rounded-full hover:bg-orange-600 transition duration-300"
              >
                모집 등록
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              <span className="text-orange-500">용병</span> 찾기
            </h2>
          </div>
          <div className="flex flex-col md:flex-row-reverse items-center justify-between gap-12">
            <img
              src={teamImg}
              alt="teamImg"
              className="w-full md:w-1/2 rounded-lg shadow-xl"
            />
            <div className="w-full md:w-1/2 space-y-6">
              <FeatureItem
                icon={FaSearch}
                title="팀 찾기"
                description="다양한 팀 정보를 확인하세요"
              />
              <FeatureItem
                icon={FaUsers}
                title="빠른 지원"
                description="원하는 팀에 바로 지원하세요"
              />
              <FeatureItem
                icon={FaFutbol}
                title="경기 참여"
                description="새로운 팀과 함께 축구를 즐기세요"
              />
              <Link
                to="/recruitments"
                className="inline-block bg-orange-500 text-white text-lg font-semibold px-8 py-3 rounded-full hover:bg-orange-600 transition duration-300"
              >
                살펴 보기
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureItem = ({ icon: Icon, title, description }: any) => (
  <div className="flex items-start">
    <div className="flex-shrink-0">
      <Icon className="h-8 w-8 text-orange-500" />
    </div>
    <div className="ml-4">
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      <p className="mt-1 text-gray-600">{description}</p>
    </div>
  </div>
);

export default HomePage;
