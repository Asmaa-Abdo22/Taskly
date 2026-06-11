"use client";
import Link from "next/link";
import InviteIcon from "@/src/icons/invite.svg";
import MemberRow, { MemberCard } from "./MemberRow";
import { useParams } from "next/navigation";
import { useGetProjectMembers } from "../../hooks/useGetProjectMembers";
import { useCallback, useEffect, useState } from "react";
import { Member } from "../../types/protected.types";
import MembersSkeleton from "./MemberSkeleton";
import { getAvatarInitials } from "../../utils/getAvatarInitials";

const ProjectMembersPage = () => {
  const params = useParams();
  const projectId = params.projectId as string;
  const { getProjectMembers, loading } = useGetProjectMembers();
  const [projectMembers, setProjectMembers] = useState<Member[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const loadMembers = useCallback(async () => {
    if (!projectId) {
      return;
    }
    try {
      const res = await getProjectMembers(projectId);
      const result = res?.result;
      setProjectMembers(result);
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      }
    }
  }, [getProjectMembers, projectId]);

  useEffect(() => {
    loadMembers();
  }, [loadMembers]);
  if (error) {
    throw error;
  }
  return (
    <>
      <div className="addProject md:px-0 px-5 ">
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
            project name
          </Link>
          <span className="text-slate-600 text-sm"> &gt; </span>
          <span className=" text-label-sm  uppercase text-primaryy tracking-[1.2px]">
            members
          </span>
        </nav>
        <div className="title  flex justify-between md:items-center mt-2 mb-4 flex-col md:flex-row">
          <h1 className="hidden md:block text-slate-900 text-[36px] headlineLgWeight">
            Project Members
          </h1>
          <button className="md:flex gap-2 items-center btn btn-primaryy hidden">
            <InviteIcon width={24} height={24} className="mt-2" />
            <span>Invite Members</span>
          </button>
          <div className="md:hidden block  text-center">
            <h1 className=" text-slate-900 text-[24px] headlineLgWeight">
              Project Members
            </h1>
          </div>
        </div>

        {loading ? (
          <MembersSkeleton />
        ) : (
          <>
            {/* TABLE */}
            <div className="hidden overflow-hidden rounded-2xl  bg-white md:block shadow-sm shadow-slate-300 w-[80%]  mx-auto mt-10">
              <table className="w-full min-w-175">
                <thead>
                  <tr className="bg-background">
                    <th className="px-6 py-4 text-left text-label-sm text-slate-700 uppercase">
                      Member
                    </th>

                    <th className="px-6 py-4 text-left text-label-sm text-slate-700 uppercase">
                      Role
                    </th>

                    <th className="px-6 py-4 text-right text-label-sm text-slate-700 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {projectMembers.map((member) => (
                    <MemberRow
                      key={member.member_id}
                      initials={getAvatarInitials(member.metadata.name)}
                      name={member.metadata.name}
                      email={member.email}
                      role={member.role}
                    />
                  ))}
                </tbody>
              </table>
            </div>
            <div className="space-y-4 md:hidden">
              {projectMembers.map((member) => (
                <MemberCard
                  key={member.member_id}
                  initials={getAvatarInitials(member.metadata.name)}
                  name={member.metadata.name}
                  email={member.email}
                  role={member.role}
                />
              ))}
            </div>
          </>
        )}
        <Link
          href="/project"
          className="md:hidden fixed bottom-18.75 right-5 h-10 w-10 rounded-lg btn-primaryy flex items-center justify-center"
        >
          <InviteIcon width={27} height={27} className="mt-3.5 ml-3.5" />
        </Link>
      </div>
    </>
  );
};

export default ProjectMembersPage;
