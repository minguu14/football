import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import {
  ActionFunctionArgs,
  Form,
  FormMethod,
  redirect,
} from "react-router-dom";
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

  useEffect(() => {
    if (teamData) {
      setAddress({
        title: teamData.place,
        address: teamData.address,
      });
    }
  }, []);

  return (
    <main className="min-h-screen py-10">
      {addressModal && (
        <AddressModal
          onClose={() => setAddressModal(false)}
          setAddress={setAddress}
        />
      )}
      <Form
        method={method}
        encType="multipart/form-data"
        className="max-w-3xl mx-auto mt-10 shadow-lg rounded-lg p-8"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          팀 정보 {mode}
        </h2>
        <div className="space-y-6">
          <InputField
            id="name"
            label="팀 이름"
            defaultValue={teamData?.name}
            required
          />
          <InputField
            id="formation"
            label="팀 포메이션"
            defaultValue={teamData?.formation}
            required
          />
          <div className="flex gap-4">
            <SelectField
              id="skill"
              label="팀 실력"
              options={["하하하", "하하", "하", "상상상", "상상", "상"]}
              defaultValue={teamData?.skill}
              className="w-full"
            />
            <SelectField
              id="manner"
              label="팀 매너"
              options={["하하하", "하하", "하", "상상상", "상상", "상"]}
              defaultValue={teamData?.manner}
              className="w-full"
            />
          </div>
          <InputField
            id="age"
            label="팀 연령대"
            defaultValue={teamData?.age}
            required
          />
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              경기 장소
            </label>
            <input
              type="text"
              id="place"
              name="place"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              defaultValue={address.title.replace(/<[^>]*>/g, "")}
              required
              readOnly
            />
            <div className="flex mt-2">
              <input
                type="text"
                id="address"
                name="address"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                defaultValue={address.address}
                required
                readOnly
              />
              <button
                type="button"
                onClick={handleSearch}
                className="ml-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-400 hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                검색
              </button>
            </div>
          </div>
          <InputField
            id="kick_off"
            label="킥오프"
            type="datetime-local"
            defaultValue={teamData ? convertDateFormat(teamData.kick_off) : ""}
            required
          />
          <InputField
            id="play_time"
            label="경기 시간"
            defaultValue={teamData?.play_time}
            placeholder="ex) 2시간"
            required
          />
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              모집 포지션
            </label>
            <div className="flex flex-wrap gap-3">
              {POSITION.map((position: string) => (
                <label key={position} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    id={`position-${position}`}
                    name="positions"
                    value={position}
                    checked={selectedPositions.includes(position)}
                    onChange={handlePositionChange}
                    className="rounded border-gray-300 text-orange-600 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
                  />
                  <span className="ml-2 text-sm text-gray-700">{position}</span>
                </label>
              ))}
            </div>
          </div>
          <InputField
            id="people"
            label="모집 인원"
            defaultValue={teamData?.people}
            required
          />
          <InputField
            id="cost"
            label="비용"
            defaultValue={teamData?.cost}
            required
          />
          <InputField
            id="quarter"
            label="최소 쿼터"
            defaultValue={teamData?.quarter}
            required
          />
          <div className="space-y-2">
            <label
              htmlFor="announcement"
              className="block text-sm font-medium text-gray-700"
            >
              공지사항
            </label>
            <textarea
              id="announcement"
              name="announcement"
              rows={7}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              defaultValue={teamData?.announcement}
              required
            ></textarea>
          </div>
        </div>
        <button className="mt-6 w-full bg-orange-400 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-500 transition duration-300">
          {mode}
        </button>
      </Form>
    </main>
  );
};

const InputField = ({ id, label, type = "text", ...props }: any) => (
  <div className="space-y-2">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
      {...props}
    />
  </div>
);

const SelectField = ({ id, label, options, ...props }: any) => (
  <div className="space-y-2">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <select
      id={id}
      name={id}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
      {...props}
    >
      {options.map((option: any) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

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
        return redirect("/mercenary");
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
        return redirect("/mercenary/" + params.teamId);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  }
};
