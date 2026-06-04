"use client";
import InputField from "@/src/components/InputField";
import Image from "next/image";
import LoadingSpinner from "@/src/components/LoadingSpinner";
import { useEffect, useState } from "react";
import Link from "next/link";
import eyeClosed from "@/src/icons/eyeClosed.png";
import passEye from "@/src/icons/passwordEye.png";
import emailIcon from "@/src/icons/emailIcon.png";
import arrowRight from "@/src/icons/arrowRight.png";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const schema = z.object({
  email: z
    .string()
    .min(1, "Email cannot be empty")
    .email("Email format must be valid"),

  password: z.string().min(1, "Password cannot be empty"),
  remember: z.boolean().optional(),
});

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("access_token");
    if (token) {
      router.push("/");
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const login = async (data: any) => {
    setLoading(true);

    try {
      const userData = {
        email: data.email,
        password: data.password,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/token?grant_type=password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
          },
          body: JSON.stringify(userData),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        toast.error("Invalid email or password");
        setLoading(false);
        return;
      }

      const accessToken = result.access_token;
      const refreshToken = result.refresh_token;
      const user = result.user;

      const isRemember = data.remember;

      const cookieOptions = isRemember ? { expires: 30 } : undefined;

      Cookies.set("access_token", accessToken, cookieOptions);
      Cookies.set("refresh_token", refreshToken, cookieOptions);
      Cookies.set("user", JSON.stringify(user), cookieOptions);

      toast.success("Welcome to taskly");

      setTimeout(() => {
        router.push("/project");
      }, 2000);
    } catch (error) {
      toast.error("Error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(login)}
      className="formStyle w-[90%] px-7 md:[48px] md:w-xl"
    >
      <h1 className="text-[27px] font-semibold md:text-headline-lg pt-5">
        Welcome Back
      </h1>

      <p className="text-[14px] w-[80%] text-center text-[#737685] mb-7">
        Please enter your details to access your workspace
      </p>

      {/* Email */}
      <div className="emailInput mb-4 w-full md:w-120 relative">
        <InputField
          label="Email Address"
          id="email"
          placeholder="yourname@company.com"
          type="email"
          {...register("email")}
          error={errors.email?.message as string}
        />

        <Image
          src={emailIcon}
          alt="email icon"
          width={15}
          height={15}
          className="absolute right-3 top-9.5 pointer-events-none md:hidden"
        />
      </div>

      {/* Password */}
      <div className="passwordInput w-full md:w-120 relative mb-4">
        <div className="flex justify-between items-center">
          <label
            htmlFor="password"
            className="block text-label-sm text-slate-700 uppercase mb-2"
          >
            Password
          </label>

          <div className="md:hidden font-bold text-end mb-2 text-[11px] text-brimaryy">
            <Link href="">Forgot?</Link>
          </div>
        </div>

        <input
          id="password"
          placeholder="......"
          type={showPassword ? "text" : "password"}
          className="w-full px-3 py-2 text-body-md bg-surface-highest rounded-md"
          {...register("password")}
        />

        <Image
          src={showPassword ? passEye : eyeClosed}
          alt="password eye icon"
          width={18}
          height={18}
          className="absolute right-3 top-9.5 cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        />

        {errors.password?.message && (
          <p className="text-label-sm text-error mt-1">
            {errors.password.message as string}
          </p>
        )}
      </div>

      {/* Remember Me */}
      <div className="hidden md:flex gap-2 mb-4 md:w-120">
        <div className="w-1/2 flex-1">
          <input type="checkbox" id="remember" {...register("remember")} />
          <label htmlFor="remember">Remember Me</label>
        </div>

        <div className="w-1/2 text-end font-medium text-brimaryy">
          <Link href="">Forgot Password?</Link>
        </div>
      </div>

      {/* Desktop Button */}
      <button
        type="submit"
        className="btn btn-primaryy hidden md:block md:w-120"
      >
        {loading ? <LoadingSpinner /> : "Log In"}
      </button>

      {/* Mobile Button */}
      <button
        type="submit"
        className="btn btn-primaryy md:hidden w-75 relative"
      >
        {loading ? <LoadingSpinner /> : "Sign In"}

        <Image
          src={arrowRight}
          alt="arrow"
          className="absolute right-21 top-1.5"
          width={45}
          height={45}
        />
      </button>

      <p className="mt-10 text-body-md">
        <span className="text-slate-700">Don't Have an account?</span>{" "}
        <Link href="/sign-up" className="text-primaryy-container font-semibold">
          Sign Up
        </Link>
      </p>
    </form>
  );
};

export default LoginPage;
