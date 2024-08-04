import { InfiniteScrolllerMasonryPostList } from "../components/infinite-scrolller-masonry-post-list";
import { useInfiniteScrolllerPosts } from "../../data/hooks/post/use-infinite-scrolller-posts";
import { Post } from "../../domain/models/post.model";
import { usePopularTags } from "../../data/hooks/tags/use-pupular-tags";
import chonos from "../../core/lib/utils/chonos";
import { TagChip } from "../components/tag-chip";

export function HomeView() {

  const { data, fetchNextPage } = useInfiniteScrolllerPosts({
    tags: [""],
  });

  const { data: popularTags } = usePopularTags({ date: chonos().format("YYYY-MM-DD"), limit: 20 })

  const formatedPopulartTags = popularTags?.map(tag => ({ ...tag, label: tag.name.split("_").join(" "), value: tag.name })) || [];

  const values: Post[] = [];
  data?.pages.map((page: any) => page.map((val: any) => values.push(val)));

  return (
    <div>
      <div className="flex gap-2 overflow-hidden mb-4">
        { formatedPopulartTags.length? formatedPopulartTags.map(tag => (
          <TagChip key={Math.random()} className="py-1.5 px-4 text-sm flex-shrink-0" variant={tag.category}>{tag.label}</TagChip>
        )) : ""}
      </div>
      <InfiniteScrolllerMasonryPostList values={values} fetchNextPage={() => fetchNextPage({ pageParam: { page: data?.pages.length + 1 } })}/>
    </div>
  );

};