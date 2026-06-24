export const formatDate = (dateString?: string | null) => {
  if (!dateString) return "";

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

//  human-readable way (e.g. Dec 25, 2025)
export const formatDate2 = (date?: string | null) => {
  if (!date) return "";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return "";

  return parsedDate.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
};
