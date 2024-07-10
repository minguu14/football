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
      <section className="gap-y-16 justify-center h-[700px] mx-12 px-5 py-7">
        <h3 className="mx-auto text-3xl">
          <strong>팀정보</strong>
        </h3>
        <div className="mx-auto px-5 py-7 max-h-[600px] flex justify-around gap-5">
          <div className="border border-black w-[200px] h-[250px]"></div>
          <div className="border border-black w-[200px] h-[250px]"></div>
          <div className="border border-black w-[200px] h-[250px]"></div>
          <div className="border border-black w-[200px] h-[250px]"></div>
          <div className="border border-black w-[200px] h-[250px]"></div>
          <div className="border border-black w-[200px] h-[250px]"></div>
          <div className="border border-black w-[200px] h-[250px]"></div>
        </div>
      </section>
      <section className="gap-y-16 justify-center h-[700px] mx-12 px-5 py-7">
        <h3 className="mx-auto text-3xl">
          <strong>용병구함</strong>
        </h3>
        <div className="mx-auto px-5 py-7 max-h-[600px] flex justify-around gap-5">
          <div className="border border-black w-[200px] h-[250px]"></div>
          <div className="border border-black w-[200px] h-[250px]"></div>
          <div className="border border-black w-[200px] h-[250px]"></div>
          <div className="border border-black w-[200px] h-[250px]"></div>
          <div className="border border-black w-[200px] h-[250px]"></div>
          <div className="border border-black w-[200px] h-[250px]"></div>
          <div className="border border-black w-[200px] h-[250px]"></div>
        </div>
      </section>
      
    </>
  );
};
