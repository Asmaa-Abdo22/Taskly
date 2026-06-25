import { useGetTasksView } from "../../hooks/useGetTasksView";
import EmptyState from "../EmptyState";
import MembersSkeleton from "../members/MemberSkeleton";
import Pagination from "../Pagination";
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
    tasksListPageNumbers,
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
          <Pagination
            currentPage={tasksListCurrentPage}
            totalPages={tasksListTotalPages}
            pageNumbers={tasksListPageNumbers}
            loading={tasksListPaginationLoading}
            onPageChange={handleTasksListPageChange}
          />
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
