import InfiniteScroll from "react-infinite-scroll-component"
import Masonry from "react-masonry-css"
import { PostCard } from "./post-card";
import { Post } from "../../domain/models/post.model";

type InfiniteScrolllerMasonryPostListProps = {
  values: Post[];
  fetchNextPage: () => void;
}

export function InfiniteScrolllerMasonryPostList({
  values, fetchNextPage
}: InfiniteScrolllerMasonryPostListProps) {
  return (
    <InfiniteScroll dataLength={values.length} next={fetchNextPage} hasMore={true} loader={""}>
      <Masonry breakpointCols={{ default: 7, 1280: 5, 768: 3, 642: 2 }} className="main-masonry-grid gap-2 md:gap-6" columnClassName="main-masonry-grid-column">
        { values.map(post => (
          <PostCard key={Math.random()} { ...post } />
        ))}
      </Masonry>
    </InfiniteScroll>
  )
}