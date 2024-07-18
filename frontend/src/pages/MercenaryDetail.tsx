import { Link, useParams } from "react-router-dom";

const MercenaryDetail = () => {
  const params = useParams();
  return (
    <>
      <div className="mt-[200px]">{params.teamId}</div>
      <Link to=".." relative="path" className="w-[200px] h-[30px]">
        뒤로가기
      </Link>
    </>
  );
};

export default MercenaryDetail;
