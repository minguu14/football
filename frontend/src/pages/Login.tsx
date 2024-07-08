import { useForm } from "react-hook-form";
import UserInput from "../components/UI/UserInput";
import { Link, useNavigate } from "react-router-dom";
import InputError from "../components/UI/InputError";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { loginFailed, loginStart, loginSuccess } from "../store/userSlice";

export const Login = () => {
  const dispatch = useAppDispatch();
  //const { user, loading, error } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      dispatch(loginStart());
      const res = await fetch("http://localhost:8080/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resData = await res.json();
      console.log(resData);

      if(resData.success === false){
        dispatch(loginFailed(resData.message));
      }
  
      if (res.ok) {
        dispatch(loginSuccess(resData));
        navigate("/");
      }

    } catch (err) {
      dispatch(loginFailed(err));
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-[110px]">
      <h2 className="text-4xl max-w-[1000px] mx-auto text-center font-bold">
        로 그 인
      </h2>
      <div className="mx-auto max-w-[1000px] mt-10">
        <div className="flex flex-col gap-y-1 p-5">
          <UserInput
            input="email"
            name="email"
            placeholder="이메일을 입력해주세요."
            register={register}
            registerModel={{
              required: true,
              pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            }}
          />
          {errors.email?.type === "required" && (
            <InputError>이메일을 입력해주세요.</InputError>
          )}
          {errors.email?.type === "pattern" && (
            <InputError>이메일 형식을 맞춰주세요.</InputError>
          )}
          <UserInput
            input="password"
            name="password"
            placeholder="비밀번호를 입력해주세요."
            register={register}
            registerModel={{ required: true }}
          />
          {errors.password?.type === "required" && (
            <InputError>비밀번호를 입력해주세요.</InputError>
          )}
          <div className="flex justify-between">
            <div className="flex gap-x-1 items-center">
              <input type="checkbox" className="w-[15px] h-[15px]" />
              아이디 저장
            </div>
            <Link to={"/"}>아이디/비밀번호 찾기</Link>
          </div>

          <button className="border rounded-md w-full h-[45px] bg-orange-400 text-white mt-5">
            로그인
          </button>
          <div className="flex flex-col gap-y-1 border-t mt-7">
            <span className="mx-auto m-5">SNS 로그인</span>
            <button className="border rounded-md w-full h-[45px]">구글</button>
            <button className="border rounded-md w-full h-[45px] bg-yellow-300">
              카카오
            </button>
            <button className="border rounded-md w-full h-[45px] bg-green-500 text-white">
              네이버
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
