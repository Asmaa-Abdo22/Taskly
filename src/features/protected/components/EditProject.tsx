"use client";
import InputField from "@/src/components/InputField";
import LoadingSpinner from "@/src/components/LoadingSpinner";
import Link from "next/link";
import TipIcon from "@/src/icons/tip.svg";
import InviteIcon from "@/src/icons/invite.svg";
import InitialzeProject from "@/src/icons/initialzeProject.svg";
import { useEditProject } from "../hooks/useEditProject";
import { useParams } from "next/navigation";
const EditProject = () => {
  const params = useParams();
  const projectId = params.projectId as string;
  const {
    loading,
    register,
    watch,
    handleSubmit,
    formState: { errors },
    EditProject,
  } = useEditProject(projectId);
  const descriptionLength = watch("description")?.length || 0;

  return (
    <>
      <div className="EditProject md:px-0 px-5 ">
        <nav className="hidden md:block">
          <Link
            href="/project"
            className="text-slate-600 uppercase text-label-sm tracking-[1.2px]"
          >
            Projects
          </Link>
          <span className="text-slate-600 text-sm"> &gt; </span>
          <Link
            href={`/project/${projectId}/epics`}
            className="text-slate-600 uppercase text-label-sm tracking-[1.2px]"
          >
            project title
          </Link>
          <span className="text-slate-600 text-sm"> &gt; </span>
          <span className=" text-label-sm  uppercase text-primaryy tracking-[1.2px]">
            edit
          </span>
        </nav>
        <div className="title  flex justify-between md:items-center mt-2 mb-4 flex-col md:flex-row">
          <h1 className="hidden md:block text-slate-900 text-[36px] headlineLgWeight">
            Edit Project
          </h1>
          <button className="md:flex gap-2 items-center btn btn-primaryy hidden">
            <InviteIcon width={24} height={24} className="mt-2" />
            <span>Invite Member</span>
          </button>
          <div className="md:hidden block">
            <h1 className=" text-slate-900 text-[24px] headlineLgWeight">
              Edit Project
            </h1>
            <p className="text-slate-700 text-body-md ">
              Define the scope and foundational details of your project.
            </p>
          </div>
        </div>
        {/* FORM */}
        <form
          onSubmit={handleSubmit((data) => EditProject(projectId, data))}
          className=" md:w-[75%] mx-auto md:bg-white rounded-sm py-3 md:mt-5 md:px-6"
        >
          {/* formTitle */}
          <div className="formTitle hidden md:flex  gap-3 items-center">
            {/* icon */}
            <div className=" bg-surface-highest w-fit  my-3 p-3 rounded-md flex  items-center justify-center">
              <InitialzeProject
                alt=" InitialzeProject icon"
                width={20}
                height={20}
              />
            </div>
            {/* title */}
            <div>
              <h1 className=" text-slate-900 text-[24px] headlineLgWeight">
                Edit Project
              </h1>
              <p className="text-slate-700 text-body-md ">
                Define the scope and foundational details of your project.
              </p>
            </div>
          </div>
          <hr className="text-slate-200 hidden md:block my-5" />
          {/* forminputs */}
          <div className="inputs">
            {/* project title */}
            <div className="w-full mb-4 ">
              <InputField
                label="Project TITLE "
                id="projectTitle"
                placeholder="Project Title"
                type="text"
                {...register("name")}
                error={errors.name?.message as string}
              />
            </div>
            {/* project descriptionn */}
            <div className="flex justify-between">
              <label
                htmlFor="description"
                className="block text-label-sm text-slate-700 uppercase leading-[16.5px] tracking-wide mb-2"
              >
                Description
              </label>
              <span className="text-slate-600 hidden md:block text-label-sm tracking-[1.2px]">
                Optional
              </span>
            </div>

            <textarea
              {...register("description")}
              maxLength={500}
              name="description"
              id="description"
              className="w-full placeholder:text-slate-600/50 placeholder:text-[16px] px-3 py-2 text-body-md text-slate-900 bg-surface-highest border-transparent rounded-md focus:outline-none  transition-colors resize-none h-37"
              placeholder="Provide a high-level overview of the project's architectural objectives and key milestones..."
            ></textarea>
            <p className="text-slate-500 text-label-sm justify-end gap-1 flex">
              {500 - descriptionLength}/500{" "}
              <span className="hidden md:block">characters</span>
            </p>
          </div>
          {/* formButtons */}
          <div className="buttons mt-4 flex gap-2 justify-between md:flex-row flex-col">
            <Link
              href="/project"
              type="button"
              className="text-body-md order-2 md:order-1 cursor-pointer text-slate-700 bg-transparent"
            >
              Back
            </Link>
            <button
              type="submit"
              className="text-body-md btn btn-primaryy order-1 md:order-2"
            >
              {loading ? <LoadingSpinner /> : " Save Changes"}
            </button>
          </div>
        </form>
        {/* tip */}
        <div className="flex gap-1 bg-surface-low rounded-md md:p-4 md:w-[75%] mx-auto mt-2 md:mt-4 md:px-5 flex-col md:flex-row">
          {/* icon */}
          <TipIcon
            alt=" tip icon"
            width={20}
            height={20}
            className="hidden md:block"
          />
          {/* text */}
          <p className="text-[12px] text-slate-700 font-medium hidden md:block">
            <span className="font-extrabold">Pro Tip:</span> You can invite
            project members and assign epics immediately after the initial
            creation process.
          </p>
          <p className=" md:hidden text-[12px] gap-2 bg-surface-low py-3 px-2   text-slate-700 font-medium flex flex-col  w-full rounded-md">
            <span className="font-extrabold">Pro Tip:</span> You can invite
            project members and assign epics immediately after the initial
            creation process.
          </p>
        </div>
      </div>
    </>
  );
};

export default EditProject;
