import { InfiniteScrolllerMasonryPostList } from "../components/infinite-scrolller-masonry-post-list";
import { useInfiniteScrolllerPosts } from "../../data/hooks/post/use-infinite-scrolller-posts";
import { Post } from "../../domain/models/post.model";
import { useSearchParams } from "react-router-dom";

export function SearchView() {

  const [ searchParams ] = useSearchParams();
  const { data, fetchNextPage } = useInfiniteScrolllerPosts({
    tags: searchParams.get("tags")?.replace(" ", "_")?.split(",") || [""],
  });

  const values: Post[] = [];
  data?.pages.map((page: any) => page.map((val: any) => values.push(val)));

  return (
    <InfiniteScrolllerMasonryPostList values={values} fetchNextPage={() => fetchNextPage({ pageParam: { page: data?.pages.length + 1 } })}/>
  );

};