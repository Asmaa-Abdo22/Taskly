"use client";

import InputField from "@/src/components/InputField";
import LoadingSpinner from "@/src/components/LoadingSpinner";
import arrowRight from "@/src/icons/arrowRight.png";
import emailIcon from "@/src/icons/emailIcon.png";
import Image from "next/image";
import Link from "next/link";
import { useLoginForm } from "../hooks/useLoginForm";
import PasswordVisibilityToggle from "./PasswordVisibilityToggle";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    isMobile,
    loading,
    login,
    showPassword,
    setShowPassword,
  } = useLoginForm();

  return (
    <form
      onSubmit={handleSubmit(login)}
      className="formStyle w-[90%] px-7 md:[48px] md:w-xl md:bg-white"
    >
      <h1 className="text-[27px] font-semibold md:text-headline-lg pt-5">
        Welcome Back
      </h1>

      <p className="text-[14px] w-[80%] text-center text-[#737685] mb-7">
        Please enter your details to access your workspace
      </p>

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

      <div className="passwordInput w-full md:w-120 relative mb-4">
        <div className="flex justify-between items-center">
          <label
            htmlFor="password"
            className="block text-label-sm text-slate-700 uppercase mb-2"
          >
            Password
          </label>

          <div className="md:hidden font-bold text-end mb-2 text-[11px] text-brimaryy">
            <Link href="/forgot-password">Forgot?</Link>
          </div>
        </div>

        <input
          id="password"
          placeholder="Enter your password"
          type={showPassword ? "text" : "password"}
          className="w-full px-3 py-2 text-body-md bg-surface-highest rounded-md border-transparent focus:outline-none  transition-colors"
          {...register("password")}
        />

        <PasswordVisibilityToggle
          showPassword={showPassword}
          onToggle={() => setShowPassword(!showPassword)}
        />

        {errors.password?.message && (
          <p className="text-label-sm text-error mt-1">
            {errors.password.message as string}
          </p>
        )}
      </div>

      {isMobile ? (
        <div className="mb-4 w-full">
          <div className="flex items-center justify-between ">
            <input
              type="checkbox"
              id="remember-mobile"
              {...register("remember")}
              className="cursor-pointer"
            />
            <label
              htmlFor="remember-mobile"
              className="text-[10px] text-slate-700 cursor-pointer"
            >
              Remember Me
            </label>
          </div>
        </div>
      ) : (
        <div className="flex gap-2 mb-4 md:w-120 w-full">
          <div className="w-1/2 flex-1 items-center">
            <input
              type="checkbox"
              id="remember"
              {...register("remember")}
              className="mr-2 cursor-pointer w-4 h-4"
            />
            <label htmlFor="remember" className="cursor-pointer">
              Remember Me
            </label>
          </div>

          <div className="w-1/2 text-end font-medium text-brimaryy">
            <Link href="/forgot-password">Forgot Password?</Link>
          </div>
        </div>
      )}
      <button
        type="submit"
        disabled={loading}
        className="btn btn-primaryy cursor-pointer  disabled:cursor-not-allowed hidden md:block md:w-120"
      >
        {loading ? <LoadingSpinner /> : "Log In"}
      </button>

      <button
        type="submit"
        disabled={loading}
        className="btn btn-primaryy md:hidden w-80 relative"
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

      <p className="mt-50 md:mt-7 text-body-md mb-7">
        <span className="text-slate-700 ">Don&apos;t Have an account?</span>{" "}
        <Link href="/sign-up" className="text-primaryy-container font-semibold">
          Sign Up
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
