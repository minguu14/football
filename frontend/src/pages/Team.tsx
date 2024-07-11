import { useState } from "react";

export const Team = () => {
  const [teamLogo, setTeamLogo] = useState<any>();

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
      <form className="border-4 w-[50%] mx-auto mt-[200px]">
        <div className="flex flex-col">
          <p>
            <div className="flex flex-col border">
              <img
                src={teamLogo}
                alt="team_logo"
                className="border-4 w-[150px] h-[150px]"
              />
              <p>팀 로고</p>
            </div>
            <label htmlFor="logo"></label>
            <input
              type="file"
              id="logo"
              name="logo"
              onChange={handleImageChange}
              className="border w-[200px]"
            />
          </p>
          <p>
            <label htmlFor="name">팀 이름</label>
            <input
              type="text"
              id="name"
              name="name"
              className="border w-[200px]"
            />
          </p>
          <p>
            <label htmlFor="age">연령대</label>
            <input
              type="text"
              id="age"
              name="age"
              className="border w-[200px]"
            />
          </p>
          <p>
            <label htmlFor="introductions">팀 소개</label>
            <textarea
              id="instructions"
              name="instructions"
              rows={7}
              className="border"
              required
            ></textarea>
          </p>
        </div>
      </form>
    </main>
  );
};
