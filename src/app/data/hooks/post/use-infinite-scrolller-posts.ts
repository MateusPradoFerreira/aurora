import { useInfiniteQuery } from "react-query";
import { FindPostsUseCase, FindPostsUseCaseParams } from "../../use-cases/post/find-posts.use-case";

export function useInfiniteScrolllerPosts(params: FindPostsUseCaseParams) {
  return useInfiniteQuery(["posts-infinite-scrolller", params], {
    queryFn: async ({ pageParam }) => await FindPostsUseCase.execute({ ...params, page: pageParam?.page || 0 }),
    getNextPageParam: (_, pages) => pages.length + 1,
  });
}