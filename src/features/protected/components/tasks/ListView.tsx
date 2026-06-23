import { useGetTasksView } from "../../hooks/useGetTasksView";
import EmptyState from "../EmptyState";
import MembersSkeleton from "../members/MemberSkeleton";
import ListViewDesktop from "./ListViewDesktop";
import ListViewMobile from "./ListViewMobile";

export default function ListView() {
  const { allTasksList, tasksListError, tasksListLoading, projectId } =
    useGetTasksView();

  if (tasksListError) {
    throw tasksListError;
  }

  if (tasksListLoading) {
    return <MembersSkeleton />;
  }

  if (!allTasksList?.length) {
    return (
      <EmptyState
        title="No Tasks Yet"
        description="Create your first task to start tracking work and collaborating with your team."
        buttonText="Create Task"
        href={`/project/${projectId}/tasks/new`}
      />
    );
  }

  return (
    <>
      <div className="hidden lg:block">
        <ListViewDesktop
          allTasks={allTasksList}
          projectId={projectId}
        />
      </div>

      <div className="lg:hidden">
        <ListViewMobile
          allTasks={allTasksList}
          projectId={projectId}
        />
      </div>
    </>
  );
}