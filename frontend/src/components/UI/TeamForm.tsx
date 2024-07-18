import { useEffect, useState } from "react";
import { Form, redirect } from "react-router-dom";

export const TeamForm = ({ mode, teamData, method }: any) => {
  const [teamLogo, setTeamLogo] = useState<any>(null);

  function handleImageChange(event: any) {
    const file = event.target.files[0];

    if (!file) {
      setTeamLogo("");
      return;
    }

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      console.log(fileReader);
      setTeamLogo(fileReader.result);
    };
  }

  return (
    <main className="w-[90%] mx-auto">
      <Form
        method={method}
        encType="multipart/form-data"
        className="w-[800px] mx-auto mt-[90px] flex flex-col"
      >
        <div className="flex flex-col gap-y-5">
          <p className="flex items-end gap-x-3">
            <img
              src={teamData ? teamData.logo : teamLogo}
              alt="team_logo"
              className="border-4 w-[150px] h-[150px] object-fill"
            />
            <label htmlFor="logo"></label>
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
              defaultValue={teamData ? teamData.name : ""}
            />
          </p>
          <div className="flex justify-between">
            <p className="flex flex-col gap-y-1 w-[47%]">
              <label htmlFor="skill">팀 실력</label>
              <select
                id="skill"
                name="skill"
                className="border rounded-md w-full p-2"
                defaultValue={teamData ? teamData.skill : ""}
              >
                <option value="하하하">하하하</option>
                <option value="하하">하하</option>
                <option value="하">하</option>
                <option value="상상상">상상상</option>
                <option value="상상">상상</option>
                <option value="상">상</option>
              </select>
            </p>
            <p className="flex flex-col gap-y-1 w-[47%]">
              <label htmlFor="manner">팀 매너</label>
              <select
                id="manner"
                name="manner"
                className="border rounded-md w-full p-2"
                defaultValue={teamData ? teamData.manner : ""}
              >
                <option value="하하하">하하하</option>
                <option value="하하">하하</option>
                <option value="하">하</option>
                <option value="상상상">상상상</option>
                <option value="상상">상상</option>
                <option value="상">상</option>
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
              defaultValue={teamData ? teamData.age : ""}
            />
          </p>
          <p className="flex flex-col gap-y-1">
            <label htmlFor="area">활동지역</label>
            <input
              type="text"
              id="area"
              name="area"
              className="border rounded-md w-full p-2"
              defaultValue={teamData ? teamData.area : ""}
            />
          </p>
          <p className="flex flex-col gap-y-1">
            <label htmlFor="introductions">팀 소개</label>
            <textarea
              id="introductions"
              name="introductions"
              rows={7}
              className="border rounded-md p-2"
              defaultValue={teamData ? teamData.introductions : ""}
            ></textarea>
          </p>
        </div>
        <button className="border rounded-md px-5 py-2 text-white bg-orange-400 mt-5">
          {mode}
        </button>
      </Form>
    </main>
  );
};

export const action = async ({ request }: any) => {
  const method = request.method;
  console.log(method);
  const data = await request.formData();
  const teamData = Object.fromEntries(data.entries());
  let fetchUrl = "http://localhost:8080/createteam";

  if (method === "POST") {
    const reader = new FileReader();

    reader.onloadend = async () => {
      const logoUrl = reader.result;

      const newTeam = {
        ...teamData,
        logo: logoUrl,
      };

      try {
        const res = await fetch(fetchUrl, {
          method: method,
          body: JSON.stringify(newTeam),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        return res;
      } catch (err) {
        console.error("Error:", err);
      }
    };
    reader.readAsDataURL(teamData.logo);
    return redirect("/");
  }

  if (method === "PATCH") {
    console.log("업데이트");
    fetchUrl = "http://localhost:8080/patchTeam";

    const reader = new FileReader();
    reader.onloadend = async () => {
      const logoUrl = reader.result;
      const newTeam = {
        ...teamData,
        logo: logoUrl,
      };

      try {
        const res = await fetch(fetchUrl, {
          method: method,
          body: JSON.stringify(newTeam),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        const resData = await res.json();
        console.log(resData);
        if (resData.success) {
        }
      } catch (err) {
        console.error("Error:", err);
      }
    };
    reader.readAsDataURL(teamData.logo);
    return redirect("/myteam");
  }
};
