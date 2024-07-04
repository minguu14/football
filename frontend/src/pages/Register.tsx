import UserInput from "../components/UI/UserInput";
import UserSelect from "../components/UI/UserSelect";
import { useForm } from "react-hook-form";
import InputError from "../components/UI/InputError";

export const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: any) => {
    try {
      const res = await fetch("http://localhost:8080/register", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resData = await res.json();
      console.log(resData);
    } catch (err) {}
  };
  //   async function handleSubmit(event: FormEvent<HTMLFormElement>) {
  //     event.preventDefault();

  //     const fd = new FormData(event.target as HTMLFormElement);
  //     const userData = Object.fromEntries(fd.entries());

  //     fetch("http://localhost:8080/register", {
  //       method: "POST",
  //       body: JSON.stringify(userData),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //   }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-[150px]">
      <h2 className="text-4xl max-w-[1000px] mx-auto text-center font-bold">
        회 원 가 입
      </h2>
      <div className="mx-auto max-w-[1000px] mt-10">
        <div className="flex flex-col gap-y-3 p-5">
          <UserInput
            label="이메일"
            input="email"
            name="email"
            placeholder="이메일을 입력해주세요."
            register={register}
          />
          {errors.email?.type === "required" && (
            <InputError>이메일을 입력해주세요.</InputError>
          )}
          {errors.email?.type === "maxLength" && (
            <InputError>20자 이내로 입력해주세요.</InputError>
          )}
          <UserInput
            label="비밀번호"
            input="password"
            name="password"
            placeholder="비밀번호를 입력해주세요."
            register={register}
          />
          <UserInput
            label="비밀번호 확인"
            input="password"
            name="confirm_password"
            placeholder="비밀번호를 다시 입력해주세요."
            register={register}
          />
          <UserSelect label="성별" {...register("gender")} />
          <UserInput
            label="이름"
            input="text"
            name="name"
            placeholder="이름을 입력해주세요."
            register={register}
          />
          <UserInput
            label="생년월일"
            input="text"
            name="birthday"
            placeholder="ex) 990101"
            register={register}
          />
          <button className="border rounded-md w-full h-[45px] bg-orange-500 text-white mt-5">
            제출
          </button>
        </div>
      </div>
    </form>
  );
};
