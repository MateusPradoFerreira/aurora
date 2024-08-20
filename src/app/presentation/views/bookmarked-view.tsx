import Masonry from "react-masonry-css";
import { useBookmark } from "../hooks/useBookmark";
import { PostCard } from "../components/post-card";

export function BookmarkedView() {

  const { data } = useBookmark();

  return (
    <div>
      <div className="flex items-center justify-center flex-col mb-8">
        <h1 className="mb-4 mt-6 text-xl font-semibold">Bookmarked Posts</h1>
      </div>
      <Masonry breakpointCols={{ default: 7, 1280: 5, 768: 3, 642: 2 }} className="main-masonry-grid gap-2 md:gap-6" columnClassName="main-masonry-grid-column">
        { data.map(post => (
          <PostCard key={Math.random()} { ...post } />
        ))}
      </Masonry>
    </div>
  )

}