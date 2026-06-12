"use client";
import LoadingSpinner from "@/src/components/LoadingSpinner";
import Link from "next/link";
import { useParams } from "next/navigation";
import ErrorIcon from "@/src/icons/error.svg";
import { useAddNewEpic } from "../../hooks/useAddNewEpic";
import { useGetProjectMembers } from "../../hooks/useGetProjectMembers";
import type { Member } from "../../types/protected.types";
import { useCallback, useEffect, useMemo, useState } from "react";

const AddNewEpicPage = () => {
  const params = useParams();
  const projectId = params.projectId as string;
  const [members, setMembers] = useState<Member[]>([]);
  const { getProjectMembers } = useGetProjectMembers();
  const {
    register,
    router,
    loading,
    addAddNewEpic,
    handleSubmit,
    formState: { errors },
    watch,
  } = useAddNewEpic(projectId);
  const descriptionLength = watch("description")?.length || 0;

  const loadMembers = useCallback(async () => {
    if (!projectId) {
      return;
    }
    const res = await getProjectMembers(projectId);
    const result = res?.result;

    setMembers(result);
  }, [getProjectMembers, projectId]);
  useEffect(() => {
    loadMembers();
  }, [loadMembers]);

  return (
    <>
      <div className="addEpic md:px-0 px-5 ">
        <nav className="hidden md:block">
          <Link
            href="/project"
            className="text-slate-600 uppercase text-label-sm tracking-[1.2px]"
          >
            Projects
          </Link>
          <span className="text-slate-600 text-sm"> &gt; </span>
          <Link
            href={`/project/epics`}
            className="text-slate-600 uppercase text-label-sm tracking-[1.2px]"
          >
            project alpha
          </Link>
          <span className="text-slate-600 text-sm"> &gt; </span>
          <Link
            href={`/project/${projectId}/epics`}
            className="text-slate-600 uppercase text-label-sm tracking-[1.2px]"
          >
            epics
          </Link>
          <span className="text-slate-600 text-sm"> &gt; </span>
          <span className=" text-label-sm  uppercase text-primaryy tracking-[1.2px]">
            new epic
          </span>
        </nav>
        {/* TITLE */}
        <div className="title  flex  md:items-center mt-2 mb-4 flex-col md:flex-row">
          <div className="hidden md:block">
            <h1 className="text-slate-900 text-[30px] headlineLgWeight">
              Create New Epic
            </h1>
            <p className="text-[16px] text-slate-700 leading-relaxed">
              Define a major project phase or high-level milestone to group{" "}
              <br />
              related tasks and track architectural progress.
            </p>
          </div>

          <div className="md:hidden block">
            <h1 className=" text-slate-900 text-[24px] headlineLgWeight">
              Create New Epic
            </h1>
            <p className="text-slate-700 text-body-md ">
              Define a high-level goal and organizational structure for your
              architectural phase.
            </p>
          </div>
        </div>
        {/* FORM */}
        <form
          onSubmit={handleSubmit(addAddNewEpic)}
          className="md:w-[75%] mx-auto md:bg-white rounded-sm py-5 md:mt-10 md:px-6"
        >
          {/* Desktop Header */}

          {/* INPUT */}
          <div className="flex  flex-col md:flex-row justify-between md:items-start">
            <label
              htmlFor="title"
              className="block text-label-sm text-slate-700 uppercase leading-[16.5px] tracking-wide mb-2"
            >
              TITLE
            </label>

            <input
              {...register("title")}
              id="title"
              type="text"
              placeholder="e.g. Structural Foundation Phase"
              className={`s-full md:w-[75%]     placeholder:text-slate-600/50 px-3 py-2 text-body-md text-slate-900 bg-surface-highest border-transparent rounded-md focus:outline-none transition-colors mb-2`}
            />
          </div>
          {errors.title && (
            <div className="flex gap-1 items-center justify-end mb-4">
              <ErrorIcon alt="error icon" width={13} height={13} />
              <p className="text-label-sm text-error">{errors.title.message}</p>
            </div>
          )}

          {/* Description */}
          <div className="mb-5 mt-4 flex  flex-col md:flex-row justify-between md:items-start">
            <div className="flex justify-center flex-col">
              <label
                htmlFor="description"
                className="block text-label-sm text-slate-700 uppercase tracking-wide mb-2"
              >
                Description
              </label>

              <span className="hidden md:block text-slate-600 text-label-sm">
                Optional
              </span>
            </div>

            <textarea
              {...register("description")}
              id="description"
              maxLength={500}
              className="
              w-full
              md:w-[75%]
          h-36
           resize-none
          rounded-md
              bg-surface-highest
          px-3
         py-3
        text-body-md
        text-slate-900
        placeholder:text-slate-600/50
        border-transparent
        focus:outline-none
      "
              placeholder="Describe the scope and objectives of this epic..."
            />
          </div>
          {
            <p className="flex  justify-end text-label-sm text-slate-600  mb-3">
              {500 - descriptionLength}/500
              <span className="hidden md:inline ml-1">characters</span>
            </p>
          }

          {/* Assignee + Deadline */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Assignee */}
            <div className="flex-1">
              <label
                htmlFor="assignee"
                className="block text-label-sm text-slate-700 uppercase tracking-wide mb-2"
              >
                Assignee
              </label>

              <select
                {...register("assignee_id")}
                id="assignee"
                className="
          w-full
          h-11
          rounded-md
          bg-surface-highest
          px-3
          text-body-md
          text-slate-900
          border-none
          focus:outline-none
        "
              >
                <option value="">Select a member...</option>

                {members?.map((member) => (
                  <option key={member.member_id} value={member.user_id}>
                    {member.metadata?.name || member.email}
                  </option>
                ))}
              </select>
            </div>

            {/* Deadline */}
            <div className="flex-1">
              <label
                htmlFor="deadline"
                className="block text-label-sm text-slate-700 uppercase tracking-wide mb-2"
              >
                Deadline
              </label>

              <input
                type="date"
                min={new Date().toLocaleDateString("en-CA")}
                id="deadline"
                {...register("deadline")}
                className="
          w-full
          h-11
          rounded-md
          bg-surface-highest
          px-3
          text-body-md
          text-slate-900
          border-none
          focus:outline-none
        "
              />
              {errors.deadline && (
                <div className="flex gap-1 items-center mt-1">
                  <ErrorIcon alt="error icon" width={13} height={13} />
                  <p className="text-label-sm text-error">
                    {errors.deadline.message}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div
            className="
      mt-8
      flex
      flex-col
      md:flex-row
      md:justify-end
      gap-8
      items-center
    "
          >
            {/* Cancel */}
            <button
              type="button"
              onClick={() => router.back()}
              className="
        order-2
        md:order-1
        text-slate-700
        text-[14px]
        cursor-pointer
        font-semibold
      "
            >
              Cancel
            </button>

            {/* Submit */}
            <button
              type="submit"
              className="
        order-1
        md:order-2
        btn
        btn-primaryy
        w-full
        md:w-auto
        min-w-35
        h-12
        shadow-[0px_8px_16px_rgba(0,61,155,0.24)]
      "
            >
              {loading ? <LoadingSpinner /> : "Create Epic"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddNewEpicPage;
