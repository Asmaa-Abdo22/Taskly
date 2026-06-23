import ListViewDesktop from "./ListViewDesktop";
import ListViewMobile from "./ListViewMobile";

export default function ListView() {
  return (
    <>
      <div className="hidden lg:block">
        <ListViewDesktop />
      </div>

      <div className="lg:hidden">
        <ListViewMobile />
      </div>
    </>
  );
}