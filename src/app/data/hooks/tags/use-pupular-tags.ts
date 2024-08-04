import { useQuery } from "react-query";
import { FindPopularTagsUseCase, FindPopularTagsUseCaseParams } from "../../use-cases/tags/find-popular-tags";

export function usePopularTags(params: FindPopularTagsUseCaseParams) {
  return useQuery(["popularTags", params], {
    queryFn: async () => await FindPopularTagsUseCase.execute({ ...params }),
    enabled: !!params.date,
  });
}