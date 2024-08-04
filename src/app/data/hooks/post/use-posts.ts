import { useQuery } from "react-query";
import { FindPostsUseCase, FindPostsUseCaseParams } from "../../use-cases/post/find-posts.use-case";

export function usePosts(params: FindPostsUseCaseParams) {
  return useQuery(["posts", params], {
    queryFn: async () => await FindPostsUseCase.execute({ ...params }),
  });
}