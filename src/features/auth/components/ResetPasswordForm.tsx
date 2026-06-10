"use client";

import InputField from "@/src/components/InputField";
import LoadingSpinner from "@/src/components/LoadingSpinner";
import Link from "next/link";
import { useResetPasswordForm } from "../hooks/useResetPasswordForm";
import PasswordRequirements from "./PasswordRequirements";
import PasswordVisibilityToggle from "./PasswordVisibilityToggle";

const ResetPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    accessToken,
    createNewPassword,
    loading,
    loadingToken,
    password,
    rules,
    setShowPassword,
    showPassword,
    showRules,
    successMessage,
  } = useResetPasswordForm();

  if (loadingToken) {
    return <LoadingSpinner />;
  }
  if (!accessToken) {
    return <p className="text-red-500">Invalid or expired reset link</p>;
  }
  if (accessToken) {
    return (
      <>
        <form
          className="formStyle  w-[90%]   px-7 md:[48px] md:w-xl bg-white"
          onSubmit={handleSubmit(createNewPassword)}
        >
          <div className=" w-[90%] mx-atuo">
            <div className=" md:mb-4 w-full ">
              <h1 className="w-120   text-[24px] font-semibold   pt-5">
                Create a New Password
              </h1>
              <p className="text-[14px] mt-3 text-[#434654]">
                Create a new, strong password to secure your workstation access.
              </p>
            </div>
            <div className="flex flex-col pt-5 gap-2 mb-4 md:w-120 w-full">
              <div className="passwordInput  w-full flex-1 relative mb-4">
                <InputField
                  label="New Password"
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
                    className="mt-2 flex flex-col gap-1 bg-surface-highest py-3 px-2"
                    title="Security Requirements"
                    activeClassName="text-[#041B3C]"
                    inactiveClassName="text-[#737685]"
                  />
                )}
              </div>

              <div className="confirmPassword  w-full flex-1 relative">
                <InputField
                  label="Confirm Password"
                  id="confirmPassword"
                  placeholder="Repeat your password"
                  type="password"
                  {...register("confirmPassword")}
                  error={errors.confirmPassword?.message as string}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || Boolean(successMessage)}
              className="btn btn-primaryy disabled:cursor-not-allowed text-[16px] font-medium md:w-120 w-full mt-2 mb-7"
            >
              {loading ? <LoadingSpinner /> : "Update Password"}
            </button>

            {successMessage && (
              <p className="mb-3 text-[13px] text-center text-[#0A6B45]">
                {successMessage}
              </p>
            )}

            <p className="mb-3 text-[13px]  text-center hidden md:block">
              <Link
                className=" text-primaryy-container font-medium"
                href="/login"
              >
                Back to sign in
              </Link>
            </p>
            <p className="mb-3 text-[13px]  text-center block md:hidden">
              <Link
                className=" text-primaryy-container font-medium"
                href="/login"
              >
                Back to Log In
              </Link>
            </p>
          </div>
        </form>
      </>
    );
  }

  return null;
};

export default ResetPasswordForm;
