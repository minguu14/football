import { QueryClient } from "@tanstack/react-query";
import { json } from "react-router-dom";
import { MercenaryLists } from "../models";
import { FieldValues } from "react-hook-form";

export const queryClient = new QueryClient();

export async function register(data: FieldValues) {
  try {
    const res = await fetch("http://localhost:8080/api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const resData = await res.json();
    return resData;
  } catch (err) {
    return json("오류가 발생했습니다.");
  }
}

export async function getAllMercenaryRecruitments() {
  const res = await fetch("http://localhost:8080/api/mercenary/recruitments");
  if (!res.ok) {
    return json({ message: "데이터를 가져올 수 없습니다." });
  }

  const resData = await res.json();
  return resData;
}

export async function getMercenaryRecruitmentDetail(id: string) {
  const res = await fetch(
    "http://localhost:8080/api/mercenary/recruitment/" + id
  );
  if (!res.ok) {
    return json({ message: "데이터를 가져올 수 없습니다." });
  }

  const resData = await res.json();
  return resData;
}

export async function deleteMercenaryRecruitment(id: string) {
  await fetch("http://localhost:8080/api/mercenary/recruitment/" + id, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
}

export async function mercenaryApplication({ data, params }: any) {
  try {
    const res = await fetch(
      "http://localhost:8080/api/list/mercenary/" + params.teamId,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      }
    );

    if (!res) {
      console.log("용병 신청을 실패했습니다.");
    }

    const resData = await res.json();
    return resData;
  } catch (err) {
    console.log(err);
  }
}

export async function getMyMercenaries(teamId: string) {
  const res = await fetch("http://localhost:8080/mercenaries", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ teamId }),
    credentials: "include",
  });

  if (!res.ok) {
    console.log("신청한 용병 내역을 가져오는데 실패했습니다.");
  }

  const resData = await res.json();
  return resData;
}

export async function getMercenaryLists() {
  const res = await fetch("http://localhost:8080/api/list/mercenarylist", {
    credentials: "include",
  });

  if (!res.ok) {
    console.log("용병 리스트를 가져오는데 실패했습니다.");
  }

  const resData = await res.json();
  return resData;
}

export async function acceptMember(member: MercenaryLists) {
  await fetch("http://localhost:8080/api/list/acceptmember", {
    method: "PATCH",
    body: JSON.stringify(member),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function rejectMember(id: string) {
  await fetch("http://localhost:8080/api/list/rejectmember", {
    method: "DELETE",
    body: JSON.stringify({ id }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function cancelMember(member: MercenaryLists) {
  await fetch("http://localhost:8080/api/list/cancelmember", {
    method: "PATCH",
    body: JSON.stringify(member),
    headers: {
      "Content-Type": "application/json",
    },
  });
}
