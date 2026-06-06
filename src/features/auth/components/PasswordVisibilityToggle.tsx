"use client";

import eyeClosed from "@/src/icons/eyeClosed.png";
import passEye from "@/src/icons/passwordEye.png";
import Image from "next/image";

interface Props {
  showPassword: boolean;
  onToggle: () => void;
}

const PasswordVisibilityToggle = ({ showPassword, onToggle }: Props) => {
  return (
    <Image
      src={showPassword ? passEye : eyeClosed}
      alt="password eye icon"
      width={18}
      height={18}
      className="absolute right-3 top-9.5 cursor-pointer"
      onClick={onToggle}
    />
  );
};

export default PasswordVisibilityToggle;
