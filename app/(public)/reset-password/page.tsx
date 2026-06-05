"use client";
import InputField from "@/src/components/InputField";
import Image from "next/image";
import { useForm } from "react-hook-form";
import passEye from "@/src/icons/passwordEye.png";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import validated from "@/src/icons/validated.png";
import noValidate from "@/src/icons/noValidate.png";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import LoadingSpinner from "@/src/components/LoadingSpinner";
import eyeClosed from "@/src/icons/eyeClosed.png";
const schema = z.object({
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password must be at most 64 characters")
    .regex(/^\S+$/, "Password must not contain spaces")
    .regex(/[A-Z]/, "Must contain uppercase letter")
    .regex(/[a-z]/, "Must contain lowercase letter")
    .regex(/[0-9]/, "Must contain a number")
    .regex(/[!@#$%^&*]/, "Must contain special character"),
  confirmPassword: z.string(),
});
const page = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loadingToken, setLoadingToken] = useState(true);
  const finalSchema = schema.refine(
    (data) => data.password === data.confirmPassword,
    {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    },
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: zodResolver(finalSchema) });

  const password = watch("password", "");

  const rules = [
    { label: "8-64 characters", test: (v: string) => v.length >= 8 },
    { label: "No spaces", test: (v: string) => !/\s/.test(v) },
    { label: "Uppercase letter", test: (v: string) => /[A-Z]/.test(v) },
    { label: "Lowercase letter", test: (v: string) => /[a-z]/.test(v) },
    { label: "One Digit", test: (v: string) => /[0-9]/.test(v) },
    { label: "Special character", test: (v: string) => /[!@#$%^&*]/.test(v) },
  ];

  useEffect(() => {
    const hash = window.location.hash;

    if (hash) {
      const params = new URLSearchParams(hash.slice(1));

      const token = params.get("access_token");

      if (token) {
        setAccessToken(token);
      }
    }

    setLoadingToken(false);
  }, []);

  const createNewPassword = async (data: any) => {
    if (!accessToken) {
      toast.error("Invalid or expired reset link");
      return;
    }
    setLoading(true);
    try {
      const userData = {
        password: data.password,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/user`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            apikey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(userData),
        },
      );

      const result = await response.json();
      console.log("base url", process.env.NEXT_PUBLIC_SUPABASE_URL);
      if (!response.ok) {
        toast.error("Failed");
        return;
      }
      if (response.ok) {
        console.log("response", result);
        toast.success(
          "Your password has been updated successfully. You can now log in",
        );

        setTimeout(() => {
          router.replace("/login");
        }, 3000);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error(" error occurred");
    } finally {
      setLoading(false);
    }
  };

  const showRules = password.length > 0;

  if (loadingToken) {
    return <LoadingSpinner />;
  }
  if (!accessToken) {
    return <p className="text-red-500">Invalid or expired reset link.</p>;
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

                <Image
                  src={showPassword ? passEye : eyeClosed}
                  alt="password eye icon"
                  width={18}
                  height={18}
                  className="absolute right-3 top-9.5 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />

                {showRules && (
                  <div className="mt-2 flex flex-col gap-1 bg-surface-highest py-3 px-2">
                    <p className="uppercase text-[11px] font-bold mb-3 text-[#434654]">
                      Security Requirements
                    </p>
                    {rules.map((r, i) => {
                      const ok = r.test(password || "");
                      return (
                        <>
                          <div
                            key={i}
                            className="flex items-center gap-2 text-[11px]"
                          >
                            <Image
                              src={ok ? validated : noValidate}
                              alt=""
                              width={12}
                              height={12}
                            />
                            <span
                              className={
                                ok ? "text-[#041B3C]" : "text-[#737685]"
                              }
                            >
                              {r.label}
                            </span>
                          </div>
                        </>
                      );
                    })}
                  </div>
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
              className="btn btn-primaryy text-[16px] font-medium md:w-120 w-full mt-2 mb-7"
            >
              {loading ? <LoadingSpinner /> : "Update Password"}
            </button>

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
};

export default page;
