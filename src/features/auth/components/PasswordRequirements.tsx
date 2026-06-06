"use client";

import noValidate from "@/src/icons/noValidate.png";
import validated from "@/src/icons/validated.png";
import Image from "next/image";
import type { PasswordRule } from "../utils/passwordRules";

interface Props {
  password: string;
  rules: PasswordRule[];
  className: string;
  title?: string;
  inactiveClassName?: string;
  activeClassName?: string;
}

const PasswordRequirements = ({
  password,
  rules,
  className,
  title,
  inactiveClassName,
  activeClassName,
}: Props) => {
  return (
    <div className={className}>
      {title && (
        <p className="uppercase text-[11px] font-bold mb-3 text-[#434654]">
          {title}
        </p>
      )}
      {rules.map((rule, index) => {
        const ok = rule.test(password || "");
        return (
          <div key={index} className="flex items-center gap-2 text-[11px]">
            <Image
              src={ok ? validated : noValidate}
              alt=""
              width={12}
              height={12}
            />
            <span
              className={
                ok
                  ? activeClassName
                  : inactiveClassName
              }
            >
              {rule.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default PasswordRequirements;
