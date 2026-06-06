"use client";

import Image from "next/image";
import greenRight from "@/src/icons/greenRight.png";

const ForgotPasswordSuccess = () => {
  return (
    <div className="w-full bg-[#E8F7EF] rounded-lg p-4 items-start gap-3 mb-8 justify-center hidden md:flex">
      <Image
        src={greenRight}
        alt="green right icon"
        width={22}
        height={22}
      />

      <p className="text-[#0A6B45] text-[14px]">
        If an account exists with this email, we&apos;ve sent a password reset link.
      </p>
    </div>
  );
};

export default ForgotPasswordSuccess;
