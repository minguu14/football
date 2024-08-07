import dayjs from "dayjs";
import { useEffect, useState } from "react";
import {
  ActionFunctionArgs,
  Form,
  FormMethod,
  redirect,
} from "react-router-dom";
import { AddressModal } from "./modal/AddressModal";
import { convertDateFormat } from "../utils/format";
import { Team } from "../models";
import { InputField } from "./UI/Form/InputField";
import { SelectField } from "./UI/Form/SelectField";
import PositionField from "./UI/Form/PositionField";

type Props = {
  mode: string;
  teamData: Team | undefined;
  method: FormMethod | undefined;
};

export const MercenaryRecruitmentForm = ({ mode, teamData, method }: Props) => {
  const [address, setAddress] = useState({ address: "", title: "" });
  const [addressModal, setAddressModal] = useState<boolean>(false);

  function handleSearch() {
    setAddressModal(true);
  }

  useEffect(() => {
    if (teamData) {
      setAddress({
        title: teamData.field,
        address: teamData.address,
      });
    }
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      {addressModal && (
        <AddressModal
          onClose={() => setAddressModal(false)}
          setAddress={setAddress}
        />
      )}
      <Form
        method={method}
        encType="multipart/form-data"
        className="max-w-3xl mx-auto mt-10 rounded-lg p-8 bg-white border border-gray-200"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-8 pb-4 border-b border-gray-200">
          팀 정보 {mode}
        </h2>
        <div className="space-y-6">
          <InputField
            id="teamName"
            label="팀 이름"
            defaultValue={teamData?.teamName}
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
              id="skillLevel"
              label="팀 실력"
              options={["하하하", "하하", "하", "상상상", "상상", "상"]}
              defaultValue={teamData?.skillLevel}
              className="w-full border rounded-md p-1"
            />
            <SelectField
              id="manners"
              label="팀 매너"
              options={["하하하", "하하", "하", "상상상", "상상", "상"]}
              defaultValue={teamData?.manner}
              className="w-full border rounded-md p-1"
            />
          </div>
          <InputField
            id="ageGroup"
            label="팀 연령대"
            defaultValue={teamData?.ageGroup}
            required
          />
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              경기 장소
            </label>
            <input
              type="text"
              id="field"
              name="field"
              className="mt-1 block w-full rounded-md border focus:border-orange-500 focus:ring-orange-500 p-2"
              defaultValue={address.title.replace(/<[^>]*>/g, "")}
              required
              readOnly
            />
            <div className="flex mt-2">
              <input
                type="text"
                id="address"
                name="address"
                className="mt-1 block w-full rounded-md border focus:border-orange-500 focus:ring-orange-500 p-2"
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
            id="matchStartTime"
            label="킥오프"
            type="datetime-local"
            defaultValue={teamData ? convertDateFormat(teamData.matchStartTime) : ""}
            required
          />
          <InputField
            id="totalMatchTime"
            label="경기 시간"
            defaultValue={teamData?.totalMatchTime}
            placeholder="ex) 2시간"
            required
          />
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              모집 포지션
            </label>
            <div className="flex flex-wrap gap-3">
              <PositionField teamData={teamData} />
            </div>
          </div>
          <InputField
            id="recruitingNumber"
            label="모집 인원"
            defaultValue={teamData?.recruitingNumber}
            required
          />
          <InputField
            id="cost"
            label="비용"
            defaultValue={teamData?.cost}
            required
          />
          <InputField
            id="minimumQuarter"
            label="최소 쿼터"
            defaultValue={teamData?.minimumQuarter}
            required
          />
          <div className="space-y-2">
            <label
              htmlFor="comment"
              className="block text-sm font-medium text-gray-700"
            >
              코멘트
            </label>
            <textarea
              id="comment"
              name="comment"
              rows={7}
              className="mt-1 block w-full rounded-md border focus:border-orange-500 focus:ring-orange-500 p-2"
              defaultValue={teamData?.comment}
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

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const method = request.method;
  const data = await request.formData();
  const teamData = Object.fromEntries(data.entries());
  const date = dayjs(teamData.kick_off as string);
  const formatDate = date.format("YY년 MM월 DD일 HH시 mm분");
  let fetchUrl = "api/mercenaryRecruitment/createteam";

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
    fetchUrl = "api/mercenaryRecruitment/patchTeam/" + params.teamId;

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
