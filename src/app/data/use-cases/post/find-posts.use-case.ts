import { DanbooruApi } from "../../../../app/core/config/axios.config";
import { Post } from "../../../../app/domain/models/post.model";

export type FindPostsUseCaseParams = {
  tags?: string[];
  page?: number;
  limit?: number;
}

export class FindPostsUseCase {
  
  static async execute({ tags = [], page = 1, limit = 80, ...params}: FindPostsUseCaseParams): Promise<Post[]> {
    const stringTags = tags.join(" ") + " rating:general"; // + " rating:general";
    const { data } = await DanbooruApi.get<Post[]>("/posts.json", { params: { ...params, tags: stringTags, page, limit }});
    return data.filter(post => post.file_ext !== "zip");
  }

}