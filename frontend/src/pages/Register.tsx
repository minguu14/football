import UserInput from "../components/UI/UserInput";
import UserSelect from "../components/UI/UserSelect";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import InputError from "../components/UI/InputError";
import { json, useNavigate } from "react-router-dom";
import { register as registerApi } from "../utils/http";

export const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password", "");

  const registerModel = {
    email: {
      required: true,
      pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
    password: { required: true },
    confirm_password: {
      required: true,
      validate: (value: string) => value === password,
    },
    gender: { required: true },
    phone_number: { required: true, pattern: /^010-\d{4}-\d{4}$/ },
    real_name: { required: true, maxLength: 5 },
    nickname: { required: true, maxLength: 10 },
    birthday: {
      required: true,
      pattern: /^(?:[0-9]{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[1,2][0-9]|3[0,1]))$/,
    },
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const resData = await registerApi(data);
      if (resData.success) {
        console.log(resData.message);
        navigate("/");
      } else {
        return console.log(resData.message);
      }
    } catch (err) {
      return json("서버 에러!");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-[110px]">
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
            registerModel={registerModel.email}
          />
          {errors.email?.type === "required" && (
            <InputError>이메일을 입력해주세요.</InputError>
          )}
          {errors.email?.type === "pattern" && (
            <InputError>이메일 형식을 맞춰주세요.</InputError>
          )}
          <UserInput
            label="비밀번호"
            input="password"
            name="password"
            placeholder="비밀번호를 입력해주세요."
            register={register}
            registerModel={registerModel.password}
          />
          {errors.password?.type === "required" && (
            <InputError>비밀번호를 입력해주세요.</InputError>
          )}
          <UserInput
            label="비밀번호 확인"
            input="password"
            name="confirm_password"
            placeholder="비밀번호를 다시 입력해주세요."
            register={register}
            registerModel={registerModel.confirm_password}
          />
          {errors.confirm_password?.type === "validate" && (
            <InputError>비밀번호가 다릅니다.</InputError>
          )}
          <UserInput
            label="이름"
            input="text"
            name="real_name"
            placeholder="이름을 최대 5자 이하로 입력해주세요."
            register={register}
            registerModel={registerModel.real_name}
          />
          {errors.real_name?.type === "required" && (
            <InputError>이름을 입력해주세요.</InputError>
          )}
          {errors.real_name?.type === "maxLength" && (
            <InputError>이름을 5자 이하로 입력해주세요.</InputError>
          )}
          <UserInput
            label="휴대폰"
            input="text"
            name="phone_number"
            placeholder="ex) 010-0000-0000"
            register={register}
            registerModel={registerModel.phone_number}
          />
          {errors.phone_number?.type === "required" && (
            <InputError>휴대폰 번호를 입력해주세요.</InputError>
          )}
          {errors.phone_number?.type === "pattern" && (
            <InputError>휴대폰 번호 형식이 맞지 않습니다.</InputError>
          )}
          <UserInput
            label="생년월일"
            input="text"
            name="birthday"
            placeholder="ex) 990101"
            register={register}
            registerModel={registerModel.birthday}
          />
          {errors.birthday?.type === "required" && (
            <InputError>생년월일을 입력해주세요.</InputError>
          )}
          {errors.birthday?.type === "pattern" && (
            <InputError>생년월일 형식이 맞지 않습니다.</InputError>
          )}
          <UserSelect label="성별" {...register("gender")} />
          {errors.gender?.type === "required" && (
            <InputError>성별을 선택해주세요.</InputError>
          )}
          <UserInput
            label="닉네임"
            input="text"
            name="nickname"
            placeholder="닉네임을 최대 10자 이하로 입력해주세요."
            register={register}
            registerModel={registerModel.nickname}
          />
          {errors.nickname?.type === "required" && (
            <InputError>닉네임을 입력해주세요.</InputError>
          )}
          {errors.nickname?.type === "maxLength" && (
            <InputError>닉네임을 10자 이하로 입력해주세요.</InputError>
          )}
          <button className="border rounded-md w-full h-[45px] bg-orange-400 hover:bg-orange-500 text-white mt-5 hover:bg-orange-400">
            가입하기
          </button>
        </div>
      </div>
    </form>
  );
};
