import RouteState from "@/src/components/RouteState";

export default function NotFound() {
  return (
    <RouteState
      title="Page not found"
      description="The page you are looking for does not exist."
      actionLabel="Back to projects"
      actionHref="/project"
      className="min-h-[45vh]"
    />
  );
}
