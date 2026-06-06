"use client";

import InputField from "@/src/components/InputField";
import LoadingSpinner from "@/src/components/LoadingSpinner";
import Link from "next/link";
import { useSignUpForm } from "../hooks/useSignUpForm";
import PasswordRequirements from "./PasswordRequirements";
import PasswordVisibilityToggle from "./PasswordVisibilityToggle";

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    loading,
    password,
    rules,
    showConfirmPassword,
    showPassword,
    showRules,
    signUp,
    setShowConfirmPassword,
    setShowPassword,
  } = useSignUpForm();

  return (
    <form
      className="formStyle  w-[90%]   px-7 md:[48px] md:w-xl md:bg-white"
      onSubmit={handleSubmit(signUp)}
    >
      <h1 className=" text-[27px] font-semibold md:text-headline-lg  pt-5">
        Create your workspace
      </h1>
      <p className="text-[14px] hidden md:block text-[#737685]">
        Join the editorial approach to task management.
      </p>
      <p className="text-[14px] md:hidden block text-[#737685]">
        Join the curated environment for institutional trust and task precision.
      </p>

      <div className="nameInput md:w-120 w-full mt-7 mb-4">
        <InputField
          label="name"
          id="name"
          placeholder="Enter your full name"
          type="text"
          {...register("name")}
          error={errors.name?.message as string}
        />
      </div>

      <div className="emailInput mb-4 md:w-120 w-full">
        <InputField
          label="email"
          id="email"
          placeholder="yourname@company.com"
          type="email"
          {...register("email")}
          error={errors.email?.message as string}
        />
      </div>

      <div className="jobTitle mb-4 md:w-120 w-full">
        <InputField
          label="Job Title (Optional)"
          id="jobTitle"
          placeholder="e.g. Project Manager"
          type="text"
          {...register("jobTitle")}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-2 mb-4 md:w-120 w-full">
        <div className="passwordInput md:w-1/2 w-full flex-1 relative mb-4">
          <InputField
            label="Password"
            id="password"
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            {...register("password")}
            error={errors.password?.message as string}
          />

          <PasswordVisibilityToggle
            showPassword={showPassword}
            onToggle={() => setShowPassword(!showPassword)}
          />

          {showRules && (
            <PasswordRequirements
              password={password}
              rules={rules}
              className="mt-2 flex flex-col gap-1 bg-surface-highest w-120 p-3 rounded"
            />
          )}
        </div>

        <div className="confirmPassword md:w-1/2 w-full flex-1 relative">
          <InputField
            label="confirm Password"
            id="confirmPassword"
            placeholder="Repeat your password"
            type={showConfirmPassword ? "text" : "password"}
            {...register("confirmPassword")}
            error={errors.confirmPassword?.message as string}
          />

          <PasswordVisibilityToggle
            showPassword={showConfirmPassword}
            onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
          />
        </div>
      </div>

      <button className="btn btn-primaryy md:w-120 w-full mt-2 mb-7">
        {loading ? <LoadingSpinner /> : "Create Account"}
      </button>

      <p className="mb-3 text-body-md">
        <span className="text-slate-700">Already have an account ?</span>{" "}
        <Link className=" text-primaryy-container font-semibold" href="/login">
          Log In
        </Link>
      </p>
    </form>
  );
};

export default SignUpForm;
