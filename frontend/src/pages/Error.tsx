import { useRouteError } from "react-router-dom";
import Header from "../components/Header";

const Error = () => {
  const error = useRouteError() as Error;
  return (
    <>
      <Header />
      <div>{error.message}</div>
    </>
  );
};

export default Error;
