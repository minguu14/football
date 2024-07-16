import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { createTeam } from "../store/userSlice";

export const Team = () => {
  const navigate = useNavigate();
  const [teamLogo, setTeamLogo] = useState<any>(null);
  const userInfo = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  async function handleSubmit(event: any) {
    event.preventDefault();
    const fd = new FormData(event.target);

    if (teamLogo) {
      fd.append("logo", teamLogo);
    }

    const data = Object.fromEntries(fd.entries());

    try {
      const res = await fetch("http://localhost:8080/createteam", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const resData = await res.json();
      console.log(resData);
      if (resData.success) {
        dispatch(createTeam(resData.message));
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  }

  function handleImageChange(event: any) {
    const file = event.target.files[0];

    if (!file) {
      setTeamLogo("");
      return;
    }

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      setTeamLogo(fileReader.result);
    };
  }

  useEffect(() => {
    async function fetchUserTeam() {
      try {
        const res = await fetch("http://localhost:8080/getUserTeam", {
          credentials: "include",
        });
        const resData = await res.json();
        console.log(resData);
        if (!userInfo) {
          return navigate("/login");
        }
        if (res.ok) {
          return navigate("/myteam");
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchUserTeam();
  }, []);

  return (
    <main className="w-[90%] mx-auto">
      <form
        className="w-[800px] mx-auto mt-[90px] flex flex-col"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-y-5">
          <p className="flex items-end gap-x-3">
            <img
              src={teamLogo}
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
              id="introductions"
              name="introductions"
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
