import { QueryClient } from "@tanstack/react-query";
import { json, redirect } from "react-router-dom";
import { MercenaryLists } from "../models";

export const queryClient = new QueryClient();

export async function getMercenaries() {
  const res = await fetch("http://localhost:8080/getMercenary");
  if (!res.ok) {
    return json({ message: "데이터를 가져올 수 없습니다." });
  }

  const resData = await res.json();
  return resData;
}

export async function getMercenaryDetail(id: string) {
  const res = await fetch("http://localhost:8080/getMercenaryDetail/" + id);
  if (!res.ok) {
    return json({ message: "데이터를 가져올 수 없습니다." });
  }

  const resData = await res.json();
  return resData;
}

export async function deleteMercenary(id: string) {
  const res = await fetch("http://localhost:8080/deleteMercenary/" + id, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  if (!res.ok) {
    console.log("삭제 실패");
  }

  redirect("/mercenary");
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
  const res = await fetch("http://localhost:8080/mercenarylist", {
    credentials: "include",
  });

  if (!res.ok) {
    console.log("용병 리스트를 가져오는데 실패했습니다.");
  }

  const resData = await res.json();
  return resData;
}

export async function acceptMember(member: MercenaryLists) {
  await fetch("http://localhost:8080/acceptmember", {
    method: "PATCH",
    body: JSON.stringify(member),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function rejectMember(id: string) {
  await fetch("http://localhost:8080/rejectmember", {
    method: "DELETE",
    body: JSON.stringify({ id }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function cancelMember(member: MercenaryLists) {
  await fetch("http://localhost:8080/cancelmember", {
    method: "PATCH",
    body: JSON.stringify(member),
    headers: {
      "Content-Type": "application/json",
    },
  });
}
