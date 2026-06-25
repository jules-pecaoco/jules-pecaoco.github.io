import { useFirestoreDoc } from "./useFirestore";

export const useSiteContent = () => {
  const { data, loading, error } = useFirestoreDoc("siteContent", "main");
  return { siteContent: data, loading, error };
};
