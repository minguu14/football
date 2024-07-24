import { Link } from "react-router-dom";
import teamImg from "../../images/team.jpg";

export const HomePage = () => {
  return (
    <>
      <section className="flex flex-col gap-y-16 justify-center h-[700px] bg-[url(images/ball.jpg)] bg-cover bg-center">
        <p className="mx-auto text-5xl text-white">
          <strong>축구</strong> 용병을 찾아보자!
        </p>
        <p className="mx-auto text-4xl text-white">용병을 모집해보자!</p>
        <p className="mx-auto text-3xl text-white">즐축 합시다</p>
      </section>
      <section className="flex flex-col justify-center items-center">
        <h2 className="text-[35px] mt-20 mb-10">
          <strong>내 팀을 등록하고 용병을 구해보자</strong>
        </h2>
        <p>팀을 등록하고 용병을 빠르고 쉽게 구해보세요!</p>
        <img src={teamImg} alt="teamImg" className="w-[1000px] my-10" />
        <Link
          to={"/team"}
          className="border rounded-lg h-[50px] w-[110px] p-3 bg-orange-400 text-white text-center"
        >
          모집 등록
        </Link>
      </section>
      <section className="flex flex-col justify-center items-center mt-20">
        <h2 className="mx-auto text-3xl mb-10">
          <strong>용병</strong>
        </h2>
        <p>용병 구하는 팀 정보를 한 눈에 살펴보자</p>
        <img src={teamImg} alt="teamImg" className="w-[1000px] my-10" />
        <Link
          to={"/mercenary"}
          className="border rounded-lg h-[50px] w-[110px] p-3 bg-orange-400 text-white text-center"
        >
          살펴 보기
        </Link>
      </section>
    </>
  );
};
