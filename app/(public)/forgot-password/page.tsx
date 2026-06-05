"use client";

import InputField from "@/src/components/InputField";
import LoadingSpinner from "@/src/components/LoadingSpinner";
import Image from "next/image";
import { useEffect, useState } from "react";
import clock from "@/src/icons/clock.png";
import greenRight from "@/src/icons/greenRight.png";
import resetpass from "@/src/icons/resetpass.png";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
const schema = z.object({
  email: z
    .string()
    .min(1, "Email cannot be empty")
    .email("Email format must be valid"),
});
const Page = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [resendCount, setResendCount] = useState(0);
  const [savedEmail, setSavedEmail] = useState("");
  useEffect(() => {
    if (!success) return;

    if (seconds <= 0) return;

    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds, success]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  const sendResetLink = async (data: any) => {
    setLoading(true);
    try {
      const userData = {
        email: data.email,
      };
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/recover`,
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
        toast.error("Failed to send reset link");
        return;
      }
      if (response.ok) {
        console.log(result);
        toast.success(
          "If an account exists with this email, we’ve sent a password reset link.",
        );
        setSavedEmail(data.email);
        setSuccess(true);
        setSeconds(300);
      }
    } catch (error) {
      toast.error("Network Error");
    } finally {
      setLoading(false);
    }
  };
  const handleResend = async () => {
    if (seconds > 0 || resendCount >= 3 || !savedEmail) return;

    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/recover`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
          },
          body: JSON.stringify({
            email: savedEmail,
          }),
        },
      );
      if (!response.ok) {
        toast.error("Failed to send reset link");
        return;
      }
      if (response.ok) {
        setResendCount((prev) => prev + 1);
        setSeconds(300);
        toast.success(
          "If an account exists with this email, we’ve sent a password reset link.",
        );
      }
    } catch {
      toast.error("Network Error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className=" flex flex-col  items-center justify-center px-4 py-8">
      <form
        onSubmit={handleSubmit(sendResetLink)}
        className="formStyle bg-white w-full max-w-md p-8 md:p-15 items-center md:items-start"
      >
        <div className=" md:w-[85%] mx-auto my-3 px-4 md:px-0">
          <div className="iconReset bg-surface-highest w-fit mx-auto my-3 p-3 rounded-xl flex md:hidden items-center justify-center">
            <Image
              src={resetpass}
              alt="reset pass  icon"
              width={20}
              height={20}
            />
          </div>
          <h1 className="w-full text-center md:text-left text-[24px]  md:text-headline-lg font-semibold text-slate-900">
            Forgot password?
          </h1>

          <p className="w-full text-center md:text-left text-[14px] text-slate-700 mb-8 mt-2">
            No worries, we'll send you reset instructions.
          </p>

          <div className="w-full mb-6">
            <InputField
              label="Email Address"
              id="email"
              placeholder="Enter your email"
              type="email"
              {...register("email")}
              error={errors.email?.message as string}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primaryy text-[14px] md:text-[16px] w-full mb-8 md:mb-6"
            disabled={loading}
          >
            {loading ? <LoadingSpinner /> : "Send Reset Link"}
          </button>

          <Link
            href="/login"
            className="w-full flex items-center justify-center gap-2 text-primaryy font-medium mb-8 text-[14px]"
          >
            ← Back to log in
          </Link>

          <hr className="w-full hidden md:block border-(--surface-low) mb-8" />

          {success && (
            <div className="w-full bg-[#E8F7EF] rounded-lg p-4  items-start gap-3 mb-8 justify-center hidden md:flex">
              <Image
                src={greenRight}
                alt="green right click icon"
                width={22}
                height={22}
              />
              <p className="text-[#0A6B45] text-[14px]">
                If an account exists with this email, we've sent a password
                reset link.
              </p>
            </div>
          )}

          {success && (
            <>
              <p className="w-full text-center text-[14px] text-label-sm text-slate-700 uppercase mb-4 hidden md:block">
                Didn't receive the email?
              </p>

              <button
                type="button"
                onClick={handleResend}
                disabled={seconds > 0 || resendCount >= 3 || loading}
                className="w-full bg-surface-low rounded-md py-4 text-[#737685] font-semibold hidden md:flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50"
              >
                <Image src={clock} alt="clock icon" width={15} height={15} />

                <span className="text-[16px]">
                  {seconds > 0
                    ? `Resend in ${Math.floor(seconds / 60)}:${String(
                        seconds % 60,
                      ).padStart(2, "0")}`
                    : resendCount >= 3
                      ? "No more attempts"
                      : "Resend"}
                </span>
              </button>
            </>
          )}
        </div>
      </form>
      {success && (
        <div className="mobileGreenBox mb-22 bg-[#82F9BE4D] w-full max-w-md flex flex-col md:hidden px-3">
          <div className="one">
            <div className=" rounded-lg pt-3  flex items-start justify-between gap-2">
              <Image
                src={greenRight}
                alt="green right click icon"
                width={22}
                height={22}
              />
              <p className="text-[#0A6B45] text-[12px] font-medium">
                If an account exists with this email, we've sent a password
                reset link.
              </p>
            </div>
          </div>
          <hr className="w-full  border-gray-300 my-3" />
          <div className="two flex items-center justify-between mb-2">
            <p className=" text-label-sm text-[#00523599] uppercase  ">
              Didn't receive the email?
            </p>
            <button
              onClick={handleResend}
              disabled={seconds > 0 || resendCount >= 3 || loading}
              type="button"
              className="text-label-sm uppercase cursor-pointer text-primaryy font-semibold"
            >
              <span>
                {seconds > 0
                  ? `Resend in ${Math.floor(seconds / 60)}:${String(
                      seconds % 60,
                    ).padStart(2, "0")}`
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

export default Page;
