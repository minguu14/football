import { json } from "react-router-dom";

export async function getMercenaries() {
  const res = await fetch("http://localhost:8080/getMercenary");
  if (!res.ok) {
    return json({ message: "데이터를 가져올 수 없습니다." });
  }

  const resData = res.json();
  return resData;
}
