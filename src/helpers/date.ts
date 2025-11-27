import { format } from "date-fns";

export const formatDate = (dateString: string, pattern = "yyyy-MM-dd") => {
  try {
    return format(new Date(dateString), pattern);
  } catch {
    return "Invalid Date";
  }
};
