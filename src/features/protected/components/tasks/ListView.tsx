import { useGetTasksView } from "../../hooks/useGetTasksView";
import EmptyState from "../EmptyState";
import MembersSkeleton from "../members/MemberSkeleton";
import ListViewDesktop from "./ListViewDesktop";
import ListViewMobile from "./ListViewMobile";

export default function ListView() {
  const {
    allTasksList,
    tasksListError,
    tasksListLoading,
    projectId,
    tasksListPaginationLoading,
    tasksListInfiniteScrollLoading,
    tasksListObserverRef,
    tasksListCurrentPage,
    tasksListTotalPages,
    tasksListTotalCount,
    handleTasksListPageChange,
  } = useGetTasksView();

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
        <ListViewDesktop allTasks={allTasksList} projectId={projectId} />
        <div className="mt-4 flex items-center justify-between">
          <p className="text-body-md text-slate-700">
            Showing {allTasksList.length} of {tasksListTotalCount} active tasks
          </p>
          <div className="flex items-center gap-4 rounded-md  px-4 py-3">
            <button
              type="button"
              aria-label="Previous page"
              disabled={tasksListCurrentPage === 1 || tasksListPaginationLoading}
              onClick={() => handleTasksListPageChange(tasksListCurrentPage - 1)}
              className="cursor-pointer text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              ‹
            </button>

            <span className="text-body-md text-slate-700">
              Page {tasksListCurrentPage} of {tasksListTotalPages}
            </span>

            <button
              type="button"
              aria-label="Next page"
              disabled={
                tasksListCurrentPage === tasksListTotalPages ||
                tasksListPaginationLoading
              }
              onClick={() => handleTasksListPageChange(tasksListCurrentPage + 1)}
              className="cursor-pointer text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              ›
            </button>
          </div>
        </div>
      </div>

      <div className="lg:hidden">
        <ListViewMobile
          allTasks={allTasksList}
          projectId={projectId}
          observerRef={tasksListObserverRef}
          infiniteScrollLoading={tasksListInfiniteScrollLoading}
        />
      </div>
    </>
  );
}
