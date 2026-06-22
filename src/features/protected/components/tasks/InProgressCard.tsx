import { getAvatarInitials } from "../../utils/getAvatarInitials";
import DateIcon from "@/src/icons/date.svg";
export default function InProgressCard() {
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
        border-l-4
        border-blue-800
      "
    >
      <h3 className="text-[14px] font-medium text-slate-900 leading-7">
        Interactive Prototype for Curator Dashboard
      </h3>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <DateIcon
            width={16}
            stroke="currentColor"
            height={16}
            className=" text-blue-700"
          />
          <span className="text-[10px] font-bold uppercase text-blue-700">
            TODAY
          </span>
        </div>

        <div
          className="
            w-8
            h-8
            rounded-full
            bg-blue-700
            flex
            items-center
            justify-center
            text-[12px]
            font-bold
            text-white
          "
        >
          {getAvatarInitials("menna ali")}
        </div>
      </div>
    </div>
  );
}
