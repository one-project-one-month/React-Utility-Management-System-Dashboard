import { Input } from "@heroui/input";
import Logo from "../../assets/logo-final.svg";
import LoginFrame from "../../assets/auth/Login.svg";
import { Button } from "@heroui/button";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type TLoginSchema } from "@/types/auth";
import { Spinner } from "@heroui/react";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TLoginSchema>({ resolver: zodResolver(loginSchema) });

  const onSubmit: SubmitHandler<TLoginSchema> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    reset();
  };

  return (
    <div className="flex flex-col items-center justify-center h-full mx-auto w-[1200px]">
      <div className="flex items-center mb-3 gap-x-2">
        <img src={Logo} alt="" className="w-14" />
        <h1 className="text-2xl font-semibold text-[#333333]">Nest Flow</h1>
      </div>
      <h2 className="mb-10 text-3xl font-semibold text-[#333333]">
        Manage, Monitor and Measure
      </h2>

      <div className="grid grid-cols-2 gap-x-5">
        <img src={LoginFrame} alt="" className="max-w-md" />
        <div className="max-w-sm ">
          <h1 className="mb-8 text-3xl font-semibold text-center text-[#333333]">
            Login Your Account
          </h1>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <Input
              type="email"
              placeholder="Enter Your Email"
              className=""
              variant="bordered"
              radius="sm"
              size="lg"
              classNames={{
                inputWrapper: ["border border-[#333333] ps-5"],
              }}
              {...register("email")}
              isInvalid={errors.email ? true : false}
              errorMessage={errors.email?.message}
              disabled={isSubmitting}
            />
            <Input
              type="password"
              placeholder="Enter Your Password"
              className=""
              variant="bordered"
              radius="sm"
              size="lg"
              classNames={{
                inputWrapper: ["border border-[#333333] ps-5"],
              }}
              {...register("password")}
              isInvalid={errors.password ? true : false}
              errorMessage={errors.password?.message}
              disabled={isSubmitting}
            />

            <Button
              type="submit"
              size="lg"
              color="primary"
              className="flex items-center justify-center w-full text-sm"
              isLoading={isSubmitting}
              spinner={<Spinner color="white" size="sm" />}
            >
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
