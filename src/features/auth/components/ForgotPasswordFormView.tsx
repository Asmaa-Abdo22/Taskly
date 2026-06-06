"use client";

import Image from "next/image";
import Link from "next/link";

import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import InputField from "@/src/components/InputField";
import LoadingSpinner from "@/src/components/LoadingSpinner";
import resetpass from "@/src/icons/resetpass.png";
import greenRight from "@/src/icons/greenRight.png";
import ForgotPasswordSuccess from "./ForgotPasswordSuccess";
import ForgotPasswordResendButton from "./ForgotPasswordResendButton";
import type { ForgotPasswordForm } from "@/src/features/auth/types/auth.types";

import { formatTimer } from "@/src/features/auth/utils/formatTimer";

interface Props {
  register: UseFormRegister<ForgotPasswordForm>;
  handleSubmit: UseFormHandleSubmit<ForgotPasswordForm>;
  errors: FieldErrors<ForgotPasswordForm>;
  isSubmitting: boolean;
  success: boolean;
  seconds: number;
  resendCount: number;
  onSubmit: (data: ForgotPasswordForm) => Promise<void>;
  handleResend: () => Promise<void>;
}

const ForgotPasswordFormView = ({
  register,
  handleSubmit,
  errors,
  isSubmitting,
  success,
  seconds,
  resendCount,
  onSubmit,
  handleResend,
}: Props) => {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="formStyle bg-white w-full max-w-md p-8 md:p-15 items-center md:items-start"
      >
        <div className="md:w-[85%] mx-auto my-3 px-4 md:px-0">
          <div className="iconReset bg-surface-highest w-fit mx-auto my-3 p-3 rounded-xl flex md:hidden items-center justify-center">
            <Image
              src={resetpass}
              alt="reset pass icon"
              width={20}
              height={20}
            />
          </div>

          <h1 className="w-full text-center md:text-left text-[24px] md:text-headline-lg font-semibold text-slate-900">
            Forgot password?
          </h1>

          <p className="w-full text-center md:text-left text-[14px] text-slate-700 mb-8 mt-2">
            No worries, we&apos;ll send you reset instructions.
          </p>

          <div className="w-full mb-6">
            <InputField
              label="Email Address"
              id="email"
              placeholder="Enter your email"
              type="email"
              {...register("email")}
              error={errors.email?.message}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primaryy text-[14px] md:text-[16px] w-full mb-8 md:mb-6"
            disabled={isSubmitting}
          >
            {isSubmitting ? <LoadingSpinner /> : "Send Reset Link"}
          </button>

          <Link
            href="/login"
            className="w-full flex items-center justify-center gap-2 text-primaryy font-medium mb-8 text-[14px]"
          >
            ← Back to log in
          </Link>

          <hr className="w-full hidden md:block border-(--surface-low) mb-8" />

          {success && <ForgotPasswordSuccess />}

          {success && (
            <ForgotPasswordResendButton
              seconds={seconds}
              resendCount={resendCount}
              loading={isSubmitting}
              onResend={handleResend}
            />
          )}
        </div>
      </form>

      {success && (
        <div className="mobileGreenBox mt-5 mb-22 bg-[#82F9BE4D] w-full max-w-md flex flex-col md:hidden px-3">
          <div className="one">
            <div className="rounded-lg pt-3 flex items-start justify-between gap-2">
              <Image
                src={greenRight}
                alt="green right icon"
                width={22}
                height={22}
              />

              <p className="text-[#0A6B45] text-[12px] font-medium">
                If an account exists with this email, we&apos;ve sent a password
                reset link.
              </p>
            </div>
          </div>

          <hr className="w-full border-gray-300 my-3" />

          <div className="two flex items-center justify-between mb-2">
            <p className="text-label-sm text-[#00523599] uppercase">
              Didn&apos;t receive the email?
            </p>

            <button
              onClick={handleResend}
              disabled={seconds > 0 || resendCount >= 3 || isSubmitting}
              type="button"
              className="text-label-sm uppercase cursor-pointer text-primaryy font-semibold"
            >
              <span>
                {seconds > 0
                  ? `Resend in ${formatTimer(seconds)}`
                  : resendCount >= 3
                  ? "No more attempts"
                  : "Resend"}
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPasswordFormView;
