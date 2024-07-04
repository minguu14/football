import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
const InputError = ({ children }: Props) => {
  return <p className="text-red-500">{children}</p>;
};

export default InputError;
