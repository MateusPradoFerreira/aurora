import { Tag } from "../../../../../src/app/domain/models/tag";
import { DanbooruApi } from "../../../core/config/axios.config";

export type FindPopularTagsUseCaseParams = {
  date: string,
  limit?: number,
}

export class FindPopularTagsUseCase {
  
  static async execute({ limit = 20, ...params}: FindPopularTagsUseCaseParams): Promise<Tag[]> {
    const { data } = await DanbooruApi.get<[string, number][]>("/explore/posts/searches.json", { params: { ...params }});
    const stringTag: string = data.map(val => val[0]).join();

    const { data: tags } = await DanbooruApi.get<Tag[]>("/tags.json", { params: { limit: 1000, search: {
      name_comma: stringTag,
      hide_empty: "yes",
      
    }}});

    const orderMap = new Map(stringTag.split(",").map((item, index) => [item, index]));
    const sortedTags = tags.sort((a, b) => { return orderMap.get(a.name) - orderMap.get(b.name) });

    return sortedTags.filter((_, i) => i < limit);
  }

}