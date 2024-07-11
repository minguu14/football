import { useState } from "react";

export const Team = () => {
  const [teamLogo, setTeamLogo] = useState<any>();

  function handleSubmit(event: any) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());
    console.log(data);
  }

  function handleImageChange(event: any) {
    const file = event.target.files[0];

    if (!file) {
      setTeamLogo(null);
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = () => {
      setTeamLogo(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  }

  return (
    <main className="w-[90%] mx-auto">
      <form
        className="w-[800px] mx-auto mt-[90px] flex flex-col"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-y-5">
          <p className="flex items-end gap-x-3">
            <div className="flex flex-col gap-y-1">
              <label htmlFor="logo">팀 로고</label>
              <img
                src={teamLogo}
                alt="team_logo"
                className="border-4 w-[150px] h-[150px]"
              />
            </div>

            <input
              type="file"
              id="logo"
              name="logo"
              onChange={handleImageChange}
              className="block w-[180px] h-[28px] text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            />
          </p>
          <p className="flex flex-col gap-y-1">
            <label htmlFor="name">팀 이름</label>
            <input
              type="text"
              id="name"
              name="name"
              className="border rounded-md w-full p-2"
            />
          </p>
          <div className="flex justify-between">
            <p className="flex flex-col gap-y-1 w-[47%]">
              <label htmlFor="skill">팀 실력</label>
              <select
                id="skill"
                name="skill"
                className="border rounded-md w-full p-2"
              >
                <option value="lowlowlow">하하하</option>
                <option value="lowlow">하하</option>
                <option value="low">하</option>
                <option value="highhighhigh">상상상</option>
                <option value="highhigh">상상</option>
                <option value="high">상</option>
              </select>
            </p>
            <p className="flex flex-col gap-y-1 w-[47%]">
              <label htmlFor="skill">팀 매너</label>
              <select
                id="skill"
                name="skill"
                className="border rounded-md w-full p-2"
              >
                <option value="lowlowlow">하하하</option>
                <option value="lowlow">하하</option>
                <option value="low">하</option>
                <option value="highhighhigh">상상상</option>
                <option value="highhigh">상상</option>
                <option value="high">상</option>
              </select>
            </p>
          </div>
          <p className="flex flex-col gap-y-1">
            <label htmlFor="age">연령대</label>
            <input
              type="text"
              id="age"
              name="age"
              className="border rounded-md w-full p-2"
            />
          </p>
          <p className="flex flex-col gap-y-1">
            <label htmlFor="area">활동지역</label>
            <input
              type="text"
              id="area"
              name="area"
              className="border rounded-md w-full p-2"
            />
          </p>
          <p className="flex flex-col gap-y-1">
            <label htmlFor="introductions">팀 소개</label>
            <textarea
              id="instructions"
              name="instructions"
              rows={7}
              className="border rounded-md p-2"
            ></textarea>
          </p>
        </div>
        <button className="border rounded-md px-5 py-2 text-white bg-orange-400 mt-5">
          등록하기
        </button>
      </form>
    </main>
  );
};
