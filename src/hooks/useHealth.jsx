import { useQuery } from "@tanstack/react-query";

const useHealth = () => {
  const {
    isPending,
    data: healths = [],
    refetch,
  } = useQuery({
    queryKey: ["healths"],
    queryFn: async () => {
      const res = await fetch("https://kawan.onrender.com/api/v1/health");
      return res.json();
    },
  });
  return [healths, refetch, isPending];
};

export default useHealth;
