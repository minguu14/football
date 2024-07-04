type Props = {
  label?: string;
  input?: string;
  name?: string;
  placeholder?: string;
  register: any;
  registerModel: {},
};

const UserInput = ({ label, input, name, placeholder, register, registerModel }: Props) => {
  const inputClasses =
    "border rounded-md focus:outline-none w-full h-[45px] px-3 mb-2";
  const labelClasses = "text-xl";
  return (
    <>
      <label htmlFor={label} className={labelClasses}>
        {label}
      </label>
      <input
        type={input}
        id={name}
        className={inputClasses}
        placeholder={placeholder}
        {...register(name, registerModel)}
      />
    </>
  );
};

export default UserInput;
