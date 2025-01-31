import { useQuery } from "@tanstack/react-query";

const useUser = () => {
  const {
    isPending,
    data: users = [],
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("https://kawan.onrender.com/api/v1/user");
      return res.json();
    },
  });
  return [users, refetch, isPending];
};

export default useUser;
