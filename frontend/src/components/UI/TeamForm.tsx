import dayjs from "dayjs";
import { useState } from "react";
import { Form, redirect } from "react-router-dom";

const POSITION = [
  "LW",
  "ST",
  "RW",
  "CAM",
  "CM",
  "CDM",
  "LB",
  "CB",
  "RB",
  "GK",
  ,
];

export const TeamForm = ({ mode, teamData, method }: any) => {
  const [selectedPositions, setSelectedPositions] = useState<string[]>(
    teamData ? teamData.positions : []
  );

  const handlePositionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const position = e.target.value;
    setSelectedPositions((prevPositions: any) =>
      prevPositions.includes(position)
        ? prevPositions.filter((pos: any) => pos !== position)
        : [...prevPositions, position]
    );
  };
  return (
    <main className="w-[90%] mx-auto">
      <Form
        method={method}
        encType="multipart/form-data"
        className="w-[800px] mx-auto mt-[90px] flex flex-col"
      >
        <div className="flex flex-col gap-y-5">
          <p className="flex flex-col gap-y-1">
            <label htmlFor="name">팀 이름</label>
            <input
              type="text"
              id="name"
              name="name"
              className="border rounded-md w-full p-2"
              defaultValue={teamData ? teamData.name : ""}
              required
            />
          </p>
          <p className="flex flex-col gap-y-1">
            <label htmlFor="formation">팀 포메이션</label>
            <input
              type="text"
              id="formation"
              name="formation"
              className="border rounded-md w-full p-2"
              defaultValue={teamData ? teamData.name : ""}
              required
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
            <label htmlFor="age">팀 연령대</label>
            <input
              type="text"
              id="age"
              name="age"
              className="border rounded-md w-full p-2"
              defaultValue={teamData ? teamData.age : ""}
              required
            />
          </p>
          <p className="flex flex-col gap-y-1">
            <label htmlFor="place">경기 장소</label>
            <input
              type="text"
              id="place"
              name="place"
              className="border rounded-md w-full p-2"
              defaultValue={teamData ? teamData.area : ""}
              required
            />
          </p>
          <p className="flex flex-col gap-y-1">
            <label htmlFor="kick_off">킥오프</label>
            <input
              type="datetime-local"
              id="kick_off"
              name="kick_off"
              className="border rounded-md w-full p-2"
              defaultValue={teamData ? teamData.area : ""}
              required
            />
          </p>
          <p className="flex flex-col gap-y-1">
            <label htmlFor="play_time">경기 시간</label>
            <input
              type="text"
              id="play_time"
              name="play_time"
              className="border rounded-md w-full p-2"
              defaultValue={teamData ? teamData.area : ""}
              placeholder="ex) 2시간"
              required
            />
          </p>
          <p className="flex flex-col gap-y-1">
            <label htmlFor="positions">모집 포지션</label>
            <div className="flex flex-wrap gap-2">
              {POSITION.map((position: any) => (
                <label key={position} className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    id="positions"
                    name="positions"
                    value={position}
                    checked={selectedPositions.includes(position)}
                    onChange={handlePositionChange}
                  />
                  {position}
                </label>
              ))}
            </div>
          </p>
          <p className="flex flex-col gap-y-1">
            <label htmlFor="people">모집 인원</label>
            <input
              type="text"
              id="people"
              name="people"
              className="border rounded-md w-full p-2"
              defaultValue={teamData ? teamData.area : ""}
              required
            />
          </p>
          <p className="flex flex-col gap-y-1">
            <label htmlFor="cost">비용</label>
            <input
              type="text"
              id="cost"
              name="cost"
              className="border rounded-md w-full p-2"
              defaultValue={teamData ? teamData.area : ""}
              required
            />
          </p>
          <p className="flex flex-col gap-y-1">
            <label htmlFor="quarter">최소 쿼터</label>
            <input
              type="text"
              id="quarter"
              name="quarter"
              className="border rounded-md w-full p-2"
              defaultValue={teamData ? teamData.area : ""}
              required
            />
          </p>
          <p className="flex flex-col gap-y-1">
            <label htmlFor="announcement">공지사항</label>
            <textarea
              id="announcement"
              name="announcement"
              rows={7}
              className="border rounded-md p-2"
              defaultValue={teamData ? teamData.introductions : ""}
              required
            ></textarea>
          </p>
        </div>
        <button className="border rounded-md px-5 py-2 text-white bg-orange-400 mt-5 w-[50rem]">
          {mode}
        </button>
      </Form>
    </main>
  );
};

export const action = async ({ request }: any) => {
  const method = request.method;
  const data = await request.formData();
  const teamData = Object.fromEntries(data.entries());
  const date = dayjs(teamData.kick_off);
  const formatDate = date.format("YY년 MM월 DD일 HH시 mm분");
  let fetchUrl = "http://localhost:8080/createteam";

  if (method === "POST") {
    const newTeam = {
      ...teamData,
      kick_off: formatDate,
      positions: data.getAll("positions"),
    };
    console.log(newTeam);
    try {
      const res = await fetch(fetchUrl, {
        method: method,
        body: JSON.stringify(newTeam),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (res.ok) {
        return redirect("/");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  }
};
