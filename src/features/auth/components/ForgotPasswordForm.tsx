"use client";

import ForgotPasswordFormView from "./ForgotPasswordFormView";
import { useForgotPasswordForm } from "../hooks/useForgotPasswordForm";

const ForgotPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    handleResend,
    onSubmit,
    resendCount,
    seconds,
    success,
  } = useForgotPasswordForm();

  return (
    <ForgotPasswordFormView
      register={register}
      handleSubmit={handleSubmit}
      errors={errors}
      isSubmitting={isSubmitting}
      success={success}
      seconds={seconds}
      resendCount={resendCount}
      onSubmit={onSubmit}
      handleResend={handleResend}
    />
  );
};

export default ForgotPasswordForm;
