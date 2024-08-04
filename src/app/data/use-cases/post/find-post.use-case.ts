import { DanbooruApi } from "../../../core/config/axios.config";
import { Post } from "../../../domain/models/post.model";

export class FindPostUseCase {
  
  static async execute(id: number): Promise<Post> {
    const { data } = await DanbooruApi.get<Post>(`/posts/${id}.json`);
    return data;
  }

}