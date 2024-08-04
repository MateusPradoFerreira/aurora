import { AutocompleteQuery } from "@/src/app/domain/models/autocomplete-query";
import { DanbooruApi } from "../../../../app/core/config/axios.config";

export type FindAutocompletedTagsUseCaseParams = {
  query: string,
  limit?: number,
}

export class FindAutocompletedTagsUseCase {
  
  static async execute({ query, limit = 20, ...params}: FindAutocompletedTagsUseCaseParams): Promise<AutocompleteQuery[]> {
    const { data } = await DanbooruApi.get<AutocompleteQuery[]>("/autocomplete.json", { params: { ...params, limit, search: {
      query: query, 
      type: "tag_query",
    } }});
    return data;
  }

}