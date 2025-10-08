import { Input } from "@heroui/input";
import Logo from "../../assets/logo-final.svg";
import LoginFrame from "../../assets/auth/Login.svg";
import { Button } from "@heroui/button";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type TLoginSchema } from "@/types/auth";
import { Spinner } from "@heroui/react";
import useAuth from "@/hooks/useAuth";
import { Navigate } from "react-router";
import Cookies from "js-cookie";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginSchema>({ resolver: zodResolver(loginSchema) });

  const { mutate, isPending } = useAuth();

  const accessToken = Cookies.get("token");

  if (accessToken) {
    return <Navigate to="/" />;
  }

  const onSubmit: SubmitHandler<TLoginSchema> = (formData) => {
    mutate(formData);
  };

  return (
    <div className="flex flex-col items-center justify-center max-w-screen-xl min-h-screen px-4 mx-auto">
      {/* Logo & Title */}
      <div className="flex items-center mb-3 gap-x-2">
        <img src={Logo} alt="Nest Flow Logo" className="w-12 sm:w-14" />
        <h1 className="text-xl sm:text-2xl font-semibold text-[#333333]">
          Nest Flow
        </h1>
      </div>

      <h2 className="mb-10 text-2xl sm:text-3xl font-semibold text-center text-[#333333]">
        Manage, Monitor and Measure
      </h2>

      {/* Content Section */}
      <div className="grid items-center max-w-4xl grid-cols-1 gap-5 lg:gap-10 lg:grid-cols-2 ">
        {/* Left Image */}
        <img src={LoginFrame} alt="" className="w-full max-w-md " />

        {/* Right Form */}
        <div className="w-full max-w-sm mx-auto lg:mx-0">
          <h1 className="mb-8 text-2xl sm:text-3xl font-semibold text-center text-[#333333]">
            Login Your Account
          </h1>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <Input
              type="email"
              placeholder="Enter Your Email"
              variant="bordered"
              radius="sm"
              size="lg"
              classNames={{
                inputWrapper: ["border border-[#333333] ps-5"],
              }}
              {...register("email")}
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message}
              disabled={isPending}
            />

            <Input
              type="password"
              placeholder="Enter Your Password"
              variant="bordered"
              radius="sm"
              size="lg"
              classNames={{
                inputWrapper: ["border border-[#333333] ps-5"],
              }}
              {...register("password")}
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message}
              disabled={isPending}
            />

            <Button
              type="submit"
              size="lg"
              color="primary"
              className="flex items-center justify-center w-full text-sm mb-"
              isLoading={isPending}
              spinner={<Spinner color="white" size="sm" />}
              radius="sm"
            >
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
