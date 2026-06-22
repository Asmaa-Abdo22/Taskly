import Blocked from "@/src/icons/Blocked.svg";
import { getAvatarInitials } from "../../utils/getAvatarInitials";
export default function BlockedTaskCard() {
  return (
    <div
      className="
        bg-red-50
        border
        border-red-200
        rounded-xl
        p-5
        min-h-35
        flex
        flex-col
        justify-between
      "
    >
    <h3 className="text-[14px] font-medium text-slate-900 leading-7">
        Sync external assets database to Curator core
      </h3>

      <div className="flex items-center justify-between">
        
          <div className="flex items-center">
          <Blocked
            width={16}
            stroke="currentColor"
            height={16}
            className=" text-red-700 mt-1"
          />
         <span className="text-[10px] font-bold uppercase text-red-700">
          DELAYED
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
           {getAvatarInitials("omar hamza")}
        </div>
      </div>
    </div>
  );
}