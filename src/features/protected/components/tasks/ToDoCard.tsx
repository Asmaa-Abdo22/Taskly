import { getAvatarInitials } from "../../utils/getAvatarInitials";
import DateIcon from "@/src/icons/date.svg";
export default function ToDoCard() {
  return (
    <div
      className="
        bg-white
        rounded-xl
        p-5
        min-h-35
        flex
        flex-col
        justify-between
      "
    >
      <h3 className="text-[14px] font-medium text-slate-900 leading-7">
        Incorporate stakeholder feedback from v1.2 Review
      </h3>

      <div className="flex items-center justify-between">
       

   <div className="flex items-center">
          <DateIcon
            width={16}
            stroke="currentColor"
            height={16}
            className=" text-slate-400"
          />
          <span className="text-[10px] font-bold uppercase text-slate-400">
          OCT 12
        </span>
        </div>

        <div
          className="
            w-8
            h-8
            rounded-full
            bg-slate-200
            flex
            items-center
            justify-center
            text-[12px]
            font-bold
            text-slate-900
          "
        >
          {getAvatarInitials("asmaa abdo")}
        </div>
      </div>
    </div>
  );
}