import { useFirestoreCollection } from "./useFirestore";

export const useEvents = () => {
  const { data, loading, error } = useFirestoreCollection("events", "date", "desc");
  return { events: data, loading, error };
};
