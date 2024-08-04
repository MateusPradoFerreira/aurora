import { useQuery } from "react-query";
import { FindPostUseCase } from "../../use-cases/post/find-post.use-case";

export function usePost(id: number) {
  return useQuery(["posts", id], {
    queryFn: async () => await FindPostUseCase.execute(id),
  });
}