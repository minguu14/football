import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { ActionFunctionArgs, Form, FormMethod, redirect } from "react-router-dom";
import { AddressModal } from "../modal/AddressModal";
import { convertDateFormat } from "../../utils";
import { Team } from "../../models";

const POSITION = ["LW", "ST", "RW", "CAM", "CM", "CDM", "LB", "CB", "RB", "GK"];

type Props = {
  mode: string;
  teamData: Team | null;
  method: FormMethod | undefined;
};

export const TeamForm = ({ mode, teamData, method }: Props) => {
  const [selectedPositions, setSelectedPositions] = useState<string[]>(
    teamData ? teamData.positions : []
  );
  const [address, setAddress] = useState({ address: "", title: "" });
  const [addressModal, setAddressModal] = useState<boolean>(false);

  const handlePositionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const position = e.target.value;
    setSelectedPositions((prevPositions: string[]) =>
      prevPositions.includes(position)
        ? prevPositions.filter((pos: string) => pos !== position)
        : [...prevPositions, position]
    );
  };

  function handleSearch() {
    setAddressModal(true);
  }

  // 기존 주소 가져오기.
  useEffect(() => {
    if (teamData) {
      setAddress({
        title: teamData.place,
        address: teamData.address,
      });
    }
  }, []);

  return (
    <main className="w-[90%] mx-auto">
      {addressModal ? (
        <AddressModal
          onClose={() => setAddressModal(false)}
          setAddress={setAddress}
        />
      ) : undefined}
      <Form
        method={method}
        encType="multipart/form-data"
        className="w-[800px] mx-auto mt-[150px] flex flex-col"
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
              defaultValue={teamData ? teamData.formation : ""}
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
          <div className="flex flex-col gap-y-1">
            <label>경기 장소</label>
            <input
              type="text"
              id="place"
              name="place"
              className="border rounded-md w-full p-2"
              defaultValue={address.title.replace(/<[^>]*>/g, "")}
              required
              readOnly
            />
            <div className="flex">
              <input
                type="text"
                id="address"
                name="address"
                className="border rounded-md w-full p-2"
                defaultValue={address.address}
                required
                readOnly
              />
              <button
                type="button"
                onClick={handleSearch}
                className="border rounded-md w-[80px]"
              >
                검색
              </button>
            </div>
          </div>
          <p className="flex flex-col gap-y-1">
            <label htmlFor="kick_off">킥오프</label>
            <input
              type="datetime-local"
              id="kick_off"
              name="kick_off"
              className="border rounded-md w-full p-2"
              defaultValue={
                teamData ? convertDateFormat(teamData.kick_off) : ""
              }
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
              defaultValue={teamData ? teamData.play_time : ""}
              placeholder="ex) 2시간"
              required
            />
          </p>
          <div className="flex flex-col gap-y-1">
            <label htmlFor="positions">모집 포지션</label>
            <p className="flex flex-wrap gap-2">
              {POSITION.map((position: string) => (
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
            </p>
          </div>
          <p className="flex flex-col gap-y-1">
            <label htmlFor="people">모집 인원</label>
            <input
              type="text"
              id="people"
              name="people"
              className="border rounded-md w-full p-2"
              defaultValue={teamData ? teamData.people : ""}
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
              defaultValue={teamData ? teamData.cost : ""}
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
              defaultValue={teamData ? teamData.quarter : ""}
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
              defaultValue={teamData ? teamData.announcement : ""}
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

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const method = request.method;
  const data = await request.formData();
  const teamData = Object.fromEntries(data.entries());
  const date = dayjs(teamData.kick_off as string);
  const formatDate = date.format("YY년 MM월 DD일 HH시 mm분");
  let fetchUrl = "http://localhost:8080/createteam";

  if (method === "POST") {
    const newTeam = {
      ...teamData,
      kick_off: formatDate,
      positions: data.getAll("positions"),
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

      if (res.ok) {
        return redirect("/");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  }

  if (method === "PATCH") {
    fetchUrl = "http://localhost:8080/patchTeam/" + params.teamId;

    const updateTeam = {
      ...teamData,
      kick_off: formatDate,
      positions: data.getAll("positions"),
    };
    try {
      const res = await fetch(fetchUrl, {
        method: method,
        body: JSON.stringify(updateTeam),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        return redirect("/");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  }
};
