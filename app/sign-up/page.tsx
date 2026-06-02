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
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import LoadingSpinner from "@/src/components/LoadingSpinner";

const page = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const schema = z.object({
    name: z
      .string()
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name must be at most 50 characters")
      .regex(/^(?!.*\s{2,})[A-Za-zÀ-ÿ\u0600-\u06FF\s]+$/, "Invalid name"),
    email: z.string().email("Invalid email format"),
    jobTitle: z.string().optional(),
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
    { label: "At least 8 characters", test: (v: string) => v.length >= 8 },
    { label: "No spaces", test: (v: string) => !/\s/.test(v) },
    { label: "Uppercase letter", test: (v: string) => /[A-Z]/.test(v) },
    { label: "Lowercase letter", test: (v: string) => /[a-z]/.test(v) },
    { label: "Number", test: (v: string) => /[0-9]/.test(v) },
    { label: "Special character", test: (v: string) => /[!@#$%^&*]/.test(v) },
  ];

  const signUp = async (data: any) => {
    setLoading(true);
    try {
      const userData = {
        email: data.email,
        password: data.password,
        data: {
          name: data.name,
          job_title: data.jobTitle,
        },
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/signup`,
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
      console.log("base url", process.env.NEXT_PUBLIC_SUPABASE_URL);
      if (!response.ok) {
        toast.error(result.msg || "Failed to create account");
        return;
      }
      if (response.ok) {
        console.log("response", result);
        toast.success("Account created successfully!");

        setTimeout(() => {
          router.push("/project");
        }, 2500);
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

  return (
    <form
      className="formStyle  w-[90%]   px-7 md:[48px] md:w-xl md:bg-white"
      onSubmit={handleSubmit(signUp)}
    >
      <h1 className=" text-[27px] font-semibold md:text-headline-lg  ">
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

          <Image
            src={passEye}
            alt="password eye icon"
            width={18}
            height={18}
            className="absolute right-3 top-9.5 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          />

          {showRules && (
            <div className="mt-2 flex flex-col gap-1">
              {rules.map((r, i) => {
                const ok = r.test(password || "");
                return (
                  <div key={i} className="flex items-center gap-2 text-[11px]">
                    <Image
                      src={ok ? validated : noValidate}
                      alt=""
                      width={12}
                      height={12}
                    />
                    <span>{r.label}</span>
                  </div>
                );
              })}
            </div>
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

          <Image
            src={passEye}
            alt="password eye icon"
            width={18}
            height={18}
            className="absolute right-3 top-9.5 cursor-pointer"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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

export default page;
