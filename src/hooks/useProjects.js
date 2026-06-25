import { useFirestoreCollection } from "./useFirestore";

export const useProjects = () => {
  const { data, loading, error } = useFirestoreCollection("projects", "order", "asc");
  return { projects: data, loading, error };
};
