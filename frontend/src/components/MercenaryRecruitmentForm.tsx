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
import { TextareaField } from "./UI/Form/TextareaField";

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
            />
            <SelectField
              id="manners"
              label="팀 매너"
              options={["하하하", "하하", "하", "상상상", "상상", "상"]}
              defaultValue={teamData?.manners}
            />
          </div>
          <InputField
            id="ageGroup"
            label="팀 연령대"
            defaultValue={teamData?.ageGroup}
            required
          />
          <div className="space-y-2">
            <InputField
              id="field"
              label="경기 장소"
              defaultValue={address.title.replace(/<[^>]*>/g, "")}
              required
              readOnly
            />
            <div className="flex space-y-2">
              <InputField
                id="address"
                defaultValue={address.address}
                required
                readOnly
              />
              <button
                type="button"
                onClick={handleSearch}
                className="ml-2 w-16 px-4 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-orange-400 hover:bg-orange-500"
              >
                검색
              </button>
            </div>
          </div>
          <InputField
            id="matchStartTime"
            label="킥오프"
            type="datetime-local"
            defaultValue={
              teamData ? convertDateFormat(teamData.matchStartTime) : ""
            }
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
            <TextareaField
              id="comment"
              name="comment"
              rows={7}
              label="코멘트"
              defaultValue={teamData?.comment}
              required
            />
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
  let fetchUrl = "http://localhost:8080/api/mercenary/recruitment";

  if (method === "POST") {
    const newTeam = {
      ...teamData,
      matchStartTime: formatDate,
      recruitingPositions: data.getAll("recruitingPositions"),
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

      if (resData.success) {
        console.log(resData.message);
        return redirect("/recruitments");
      } else {
        console.log(resData.message);
      }
    } catch (err) {
      console.error(err);
    }
  }

  if (method === "PATCH") {
    fetchUrl =
      "http://localhost:8080/api/mercenary/recruitment/" + params.teamId;

    const updateTeam = {
      ...teamData,
      matchStartTime: formatDate,
      recruitingPositions: data.getAll("recruitingPositions"),
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
        return redirect(`/recruitments/${params.teamId}`);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  }
};
