type MemberRowProps = {
  initials: string;
  name: string;
  email: string;
  role: string;
};

export default function MemberRow({
  initials,
  name,
  email,
  role,
}: MemberRowProps) {
  const normalizedRole = role.toUpperCase();

  return (
    <tr className="border-b border-slate-300/40 last:border-b-0">
      <td className="px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-highest font-semibold text-primaryy">
            {initials}
          </div>

          <div>
            <p className="font-medium text-slate-900">{name}</p>

            <p className="text-sm text-slate-700">{email}</p>
          </div>
        </div>
      </td>

      <td className="px-6 py-5">
        <span
          className={`rounded-md ${normalizedRole === "OWNER" ? "bg-primaryy text-white" : normalizedRole === "ADMIN" ? "bg-[#CDDDFF] text-[#51617E]" : normalizedRole === "MEMBER" ? "text-slate-600 bg-[#D7E2FF]" : "text-slate-600 bg-[#E8EDFF]"} px-3 py-1 text-label-sm`}
        >
          {role}
        </span>
      </td>

      <td className="px-6 py-5 text-right">
        <button className="cursor-pointer text-xl text-slate-700">⋮</button>
      </td>
    </tr>
  );
}

type MemberCardProps = {
  initials: string;
  name: string;
  email: string;
  role: string;
};

export function MemberCard({ initials, name, email, role }: MemberCardProps) {
  const normalizedRole = role.toUpperCase();

  return (
    <div className="flex relative items-center justify-between rounded-md bg-white p-3 ">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-md bg-surface-highest text-[16px] font-semibold text-primaryy">
          {initials}
        </div>

        <div>
          <p className="text-slate-900 text-[14px] font-semibold">{name}</p>

          <p className="text-[11px] font-normal text-slate-600 ">{email}</p>
        </div>
      </div>

      <div className="flex items-end gap-1 flex-col absolute right-2 top-3">
        <span
          className={`rounded-sm  px-2 py-1 text-[10px]  order-1 font-bold ${normalizedRole === "OWNER" ? "bg-primaryy text-white" : normalizedRole === "ADMIN" ? "bg-[#CDDDFF] text-[#51617E]" : normalizedRole === "MEMBER" ? "text-slate-600 bg-[#D7E2FF]" : "text-slate-600 bg-[#E8EDFF]"}`}
        >
          {role}
        </span>

        <button className="cursor-pointer text-md text-slate-600 order-2 ">
          ⋮
        </button>
      </div>
    </div>
  );
}
