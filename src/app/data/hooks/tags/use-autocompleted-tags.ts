import { useQuery } from "react-query";
import { FindAutocompletedTagsUseCase, FindAutocompletedTagsUseCaseParams } from "../../use-cases/tags/find-autocompleted-tags";

export function useAutocompletedTags(params: FindAutocompletedTagsUseCaseParams) {
  return useQuery(["autocompletedTags", params], {
    queryFn: async () => await FindAutocompletedTagsUseCase.execute({ ...params }),
    enabled: !!params.query,
  });
}