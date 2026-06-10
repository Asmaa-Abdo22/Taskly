import Image from "next/image";
import clock from "@/src/icons/clock.png";
import { formatTimer } from "../utils/formatTimer";
import { MAX_RESEND_ATTEMPTS } from "../constants/auth.constants";

interface Props {
  seconds: number;
  resendCount: number;
  loading: boolean;
  onResend: () => void;
}

const ForgotPasswordResendButton = ({
  seconds,
  resendCount,
  loading,
  onResend,
}: Props) => {
  const text =
    loading
      ? "Sending..."
      : seconds > 0
      ? `Resend in ${formatTimer(seconds)}`
      : resendCount >= MAX_RESEND_ATTEMPTS
        ? "No more attempts"
        : "Resend";

  return (
    <>
      <p className="w-full text-center text-[14px] text-label-sm text-slate-700 uppercase mb-4 hidden md:block">
        Didn&apos;t receive the email?
      </p>

      <button
        type="button"
        onClick={onResend}
        disabled={seconds > 0 || resendCount >= MAX_RESEND_ATTEMPTS || loading}
        className="w-full bg-surface-low rounded-md py-4 text-[#737685] font-semibold hidden md:flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50  disabled:cursor-not-allowed"
      >
        <Image src={clock} alt="clock icon" width={15} height={15} />
        <span className="text-[16px]">{text}</span>
      </button>
    </>
  );
};

export default ForgotPasswordResendButton;
