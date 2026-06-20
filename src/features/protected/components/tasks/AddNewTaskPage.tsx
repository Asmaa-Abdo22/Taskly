"use client";
import LoadingSpinner from "@/src/components/LoadingSpinner";
import Link from "next/link";
import ErrorIcon from "@/src/icons/error.svg";
import { useAddNewTask } from "../../hooks/useAddNewTask";

const AddNewTaskPage = () => {
  const {
    projectId,
    router,
    loading,
    handleSubmit,
    formState: { errors },
    addNewTask,
    register,
    watch,
    allEpics,
    projectMembers,
    taskStatuses,
  } = useAddNewTask();

  const descriptionLength = watch("description")?.length || 0;
  const epicId = watch("epic_id") || "";
  return (
    <>
      <div className="addTask md:px-0 px-5 ">
        <nav className="hidden md:block">
          <Link
            href="/project"
            className="text-slate-600 uppercase text-label-sm tracking-[1.2px]"
          >
            Projects
          </Link>
          <span className="text-slate-600 text-sm"> &gt; </span>
          <Link
            href={`/project/${projectId}/edit`}
            className="text-slate-600 uppercase text-label-sm tracking-[1.2px]"
          >
            project alpha
          </Link>
          <span className="text-slate-600 text-sm"> &gt; </span>
          <Link
            href={`/project/${projectId}/tasks`}
            className="text-slate-600 uppercase text-label-sm tracking-[1.2px]"
          >
            tasks
          </Link>
          <span className="text-slate-600 text-sm"> &gt; </span>
          <span className=" text-label-sm  uppercase text-primaryy tracking-[1.2px]">
            new task
          </span>
        </nav>
        {/* TITLE */}
        <div className="title  flex  md:items-center mt-2 mb-4 flex-col md:flex-row">
          <div>
            <h1 className="text-slate-900 text-[24px] md:text-[30px] headlineLgWeight">
              Create New Task
            </h1>
            <p className="text-body-md md:text-[16px] text-slate-700 leading-relaxed">
              Initialize a new work item within the Architectural Workspace
              ecosystem.
            </p>
          </div>
        </div>
        {/* FORM */}
        <form
          onSubmit={handleSubmit(addNewTask)}
          className="md:w-[75%] mx-auto md:bg-white rounded-sm py-5 md:mt-10 md:px-6"
        >
          {/* Desktop Header */}

          {/* INPUT Title */}
          <div className="flex flex-col   justify-between items-start mb-4">
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
              placeholder="e.g., Finalize structural schematics"
              className={`w-full     placeholder:text-slate-600/50 px-3 py-2 text-body-md text-slate-900 bg-surface-highest border-transparent rounded-md focus:outline-none transition-colors mb-2`}
            />
          </div>
          {errors.title && (
            <div className="flex gap-1 items-center justify-end mb-4">
              <ErrorIcon alt="error icon" width={13} height={13} />
              <p className="text-label-sm text-error">{errors.title.message}</p>
            </div>
          )}

          {/* Status * + Assignee */}
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            {/* Status */}
            <div className="flex-1">
              <label
                htmlFor="status"
                className="block text-label-sm text-slate-700 uppercase tracking-wide mb-2"
              >
                Status
              </label>

              <select
                {...register("status")}
                id="status"
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
                <option value="" disabled>
                  {" "}
                  Status
                </option>
                {taskStatuses.map((item) => (
                  <option key={item} value={item}>
                    {item.replaceAll("_", " ")}
                  </option>
                ))}
              </select>
            </div>

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
                <option value="">Select Team Member</option>

                {projectMembers?.map((member) => (
                  <option key={member.member_id} value={member.user_id}>
                    {member.metadata?.name || member.email}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* INPUT Epic */}
          <div className="flex flex-col   justify-between items-start mb-4">
            <label
              htmlFor="epic"
              className="block text-label-sm text-slate-700 uppercase leading-[16.5px] tracking-wide mb-2"
            >
              epic
            </label>

            <select
              {...register("epic_id")}
              id="epic"
              value={epicId}
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
              <option value="" >
                Select Epic Link
              </option>
              {allEpics.map((item) => (
                <option key={item.epic_id} value={item.epic_id}>
                  {item.epic_id} -{" "}
                  {item.title.length > 100
                    ? `${item.title.slice(0, 100)}...`
                    : item.title}
                </option>
              ))}
            </select>
          </div>
          {errors.epic_id && (
            <div className="flex gap-1 items-center justify-end mb-4">
              <ErrorIcon alt="error icon" width={13} height={13} />
              <p className="text-label-sm text-error">
                {errors.epic_id.message}
              </p>
            </div>
          )}

          {/* INPUT Due Date */}
          <div className="flex flex-col   justify-between items-start mb-4">
            <label
              htmlFor="dueDate"
              className="block text-label-sm text-slate-700 uppercase leading-[16.5px] tracking-wide mb-2"
            >
              due date
            </label>

            <input
              {...register("due_date")}
              id="dueDate"
              type="datetime-local"
              placeholder="e.g., Finalize structural schematics"
              className={`w-full     placeholder:text-slate-600/50 px-3 py-2 text-body-md text-slate-900 bg-surface-highest border-transparent rounded-md focus:outline-none transition-colors mb-2`}
            />
          </div>

          {/* Description */}
          <div className="mb-5 mt-7 flex  flex-col  justify-between items-start">
            <label
              htmlFor="description"
              className="block text-label-sm text-slate-700 uppercase tracking-wide mb-2"
            >
              Description
            </label>

            <textarea
              {...register("description")}
              id="description"
              maxLength={500}
              className="
              w-full
             
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
              placeholder="Provide detailed context for this task..."
            />
          </div>

          {
            <p className="flex  justify-end text-label-sm text-slate-600  mb-3">
              {500 - descriptionLength}/500
              <span className="hidden md:inline ml-1">characters</span>
            </p>
          }
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
              Back
            </button>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`  order-1
        md:order-2
        btn
        btn-primaryy
        w-full
        md:w-auto
        min-w-35
        h-12
        shadow-[0px_8px_16px_rgba(0,61,155,0.24)]
        ${loading && "cursor-not-allowed"}
`}
            >
              {loading ? <LoadingSpinner /> : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddNewTaskPage;
