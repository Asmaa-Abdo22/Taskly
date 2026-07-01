"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import DragandDrop from "@/src/icons/DragDrop.svg";
import type { Task } from "../../types/protected.types";
import { formatDate } from "../../utils/formatDate";
import { getAvatarInitials } from "../../utils/getAvatarInitials";

type TaskCardStyles = {
  card: string;
  avatar: string;
};

type Props = {
  task: Task;
  status: string;
  styles: TaskCardStyles;
  onOpen: () => void;
};

export default function DraggableTaskCard({
  task,
  status,
  styles,
  onOpen,
}: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "task",
      task,
      status,
    },
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.8 : undefined,
        zIndex: isDragging ? 1 : undefined,
      }}
      onClick={onOpen}
      className={`
        rounded-xl
        p-5
        min-h-35
        flex
        flex-col
        justify-between
        ${styles.card}
        cursor-pointer
      `}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-[14px] font-medium text-slate-900 leading-7">
          {task.title}
        </h3>

        <button
          ref={setActivatorNodeRef}
          type="button"
          aria-label="Drag task"
          onClick={(event) => event.stopPropagation()}
          className="shrink-0 cursor-grab rounded-md p-1 text-slate-400 active:cursor-grabbing"
          style={{ touchAction: "none" }}
          {...attributes}
          {...listeners}
        >
          <DragandDrop
            width={18}
            height={18}
            
          />
        </button>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase text-slate-400">
          {formatDate(task.due_date)}
        </span>

        <div
          className={`
            w-8
            h-8
            rounded-full
            flex
            items-center
            justify-center
            text-[12px]
            font-bold
            ${styles.avatar}
          `}
        >
          {getAvatarInitials(task.assignee?.name ?? "")}
        </div>
      </div>
    </div>
  );
}
