import { useLoaderData } from "react-router-dom";
import { MercenaryLists } from "../models";

const MercenaryList = () => {
  const lists = useLoaderData() as MercenaryLists[];
  console.log(lists);
  return (
    <>
      {lists.map((list) => (
        <ul key={list._id}>
          <li>{list.real_name}</li>
          <li>{list.contact}</li>
          <li>{list.positions}</li>
          <li>{list.player === "on" ? "선출" : ""}</li>
        </ul>
      ))}
    </>
  );
};

export default MercenaryList;

export const loader = async () => {
  try {
    const res = await fetch("http://localhost:8080/mercenarylist");
    return res;
  } catch (err) {
    console.log(err);
  }
};
