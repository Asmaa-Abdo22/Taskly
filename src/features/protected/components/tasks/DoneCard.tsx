import GreenRight from "@/src/icons/greenRight.png";
import { getAvatarInitials } from "../../utils/getAvatarInitials";
import Image from "next/image";

const DoneCard = () => {
  return (
    <>
      <div
        className="
        bg-green-50
        border
        border-green-200
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
          <div className="flex items-center gap-1">
            <Image
              alt="done "
              width={16}
              src={GreenRight}
              height={16}
              className=" text-green-700 "
            />
            <span className="text-[10px] font-bold uppercase text-green-700">
              Done
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
            {getAvatarInitials("jonny andro")}
          </div>
        </div>
      </div>
    </>
  );
};

export default DoneCard;
