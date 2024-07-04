import React from "react";

type Props = {
  label: string;
  name: string;
  onChange: any;
};
const UserSelect = React.forwardRef(({ label, name, onChange }: Props, ref: any) => {
  const inputClasses =
    "border rounded-md focus:outline-none w-full h-[45px] px-3 mb-2";
  const labelClasses = "text-xl";

  return (
    <>
      <label htmlFor={label} className={labelClasses}>
        성별
      </label>
      <select id={name} name={name} onChange={onChange} className={inputClasses} ref={ref}>
        <option value="man">남자</option>
        <option value="female">여자</option>
      </select>
    </>
  );
});

export default UserSelect;
