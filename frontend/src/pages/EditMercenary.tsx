import { LoaderFunctionArgs, useParams } from "react-router-dom";
import { MercenaryRecruitmentForm } from "../components/MercenaryRecruitmentForm";
import { Team } from "../models";
import { getMercenaryRecruitmentDetail, queryClient } from "../utils/http";
import { useQuery } from "@tanstack/react-query";

export const EditMercenary = () => {
  const params = useParams();
  const { data, isError, error } = useQuery<Team>({
    queryKey: ["recruitments", params.teamId],
    queryFn: () => getMercenaryRecruitmentDetail(params.teamId as string),
  });
  return (
    <MercenaryRecruitmentForm mode="수정" teamData={data} method="patch" />
  );
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  return queryClient.fetchQuery({
    queryKey: ["recruitments", params.teamId],
    queryFn: () => getMercenaryRecruitmentDetail(params.teamId as string),
  });
};
