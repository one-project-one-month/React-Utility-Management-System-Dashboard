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

   const accessToken = Cookies.get("ums_token");
   if (accessToken) return <Navigate to="/" />;

   const onSubmit: SubmitHandler<TLoginSchema> = formData => {
      mutate(formData);
   };

   return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-100">
         <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
            {/* Left Illustration */}
            <div className="hidden lg:flex items-center justify-center">
               <img
                  src={LoginFrame}
                  alt="Login illustration"
                  className="w-full max-w-md drop-shadow-xl"
               />
            </div>

            {/* Login Card */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-8 sm:p-10">
               {/* Logo & Brand */}
               <div className="flex flex-col items-center mb-8">
                  <img src={Logo} alt="Nest Flow Logo" className="w-14 mb-2" />
                  <h1 className="text-2xl font-bold text-gray-800">Nest Flow</h1>
                  <p className="text-sm text-gray-500 mt-1">
                     Manage, Monitor and Measure
                  </p>
               </div>

               <h2 className="text-xl font-semibold text-center text-gray-700 mb-6">
                  Login to your account
               </h2>

               <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                  <Input
                     type="email"
                     placeholder="Email address"
                     variant="bordered"
                     radius="md"
                     size="lg"
                     classNames={{
                        inputWrapper: [
                           "border-gray-300",
                           "hover:border-primary",
                           "focus-within:border-primary",
                        ],
                     }}
                     {...register("email")}
                     isInvalid={!!errors.email}
                     errorMessage={errors.email?.message}
                     disabled={isPending}
                  />

                  <Input
                     type="password"
                     placeholder="Password"
                     variant="bordered"
                     radius="md"
                     size="lg"
                     classNames={{
                        inputWrapper: [
                           "border-gray-300",
                           "hover:border-primary",
                           "focus-within:border-primary",
                        ],
                     }}
                     {...register("password")}
                     isInvalid={!!errors.password}
                     errorMessage={errors.password?.message}
                     disabled={isPending}
                  />

                  {/* Forgot password */}
                  <div className="text-right text-sm">
                     <a href="#" className="text-primary hover:underline">
                        Forgot password?
                     </a>
                  </div>

                  <Button
                     type="submit"
                     size="lg"
                     color="primary"
                     className="w-full font-medium tracking-wide"
                     isLoading={isPending}
                     spinner={<Spinner color="white" size="sm" />}
                     radius="md"
                  >
                     Login
                  </Button>
               </form>
            </div>
         </div>
      </div>
   );
}
