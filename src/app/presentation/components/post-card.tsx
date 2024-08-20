import { useNavigate } from "react-router-dom";
import { Post } from "../../domain/models/post.model";
import { cn } from "../../core/lib/utils";
import { Button } from "./ui/button";
import { HiDownload } from "react-icons/hi";
import { formatTime } from "../../core/lib/utils/format-time.util";
import { useBookmark } from "../hooks/useBookmark";
import { GoBookmark, GoBookmarkFill } from "react-icons/go";

type PostCardProps = Post & {
  className?: string,
}

export function PostCard({ className = "", ...props }: PostCardProps) {

  const navigate = useNavigate();
  const { verifyBookmarkedPost, addBookmarkedPost, removeBookmarkedPost } = useBookmark();

  function handleNavigateToPostPage() {
    navigate(`/search/post/${props.id}`);
  }

  const isVideo = props.file_ext === "mp4";
  const title = ( props?.tag_string_character || props?.tag_string_artist ).replace(" ", ", ").replace("_", " ");

  const bookmarked = verifyBookmarkedPost(props.id);
  const handleBookmark = (event: any) => {
    event.stopPropagation();
    bookmarked? removeBookmarkedPost(props.id) : addBookmarkedPost(props);
  };

  return (
    <div className={cn("rounded-lg overflow-hidden group relative cursor-pointer", className)} onClick={handleNavigateToPostPage}>
      <img className="w-full h-full object-cover" src={isVideo? props.preview_file_url : props.large_file_url} alt="" />
      <div className="opacity-0 group-hover:opacity-100 w-full h-full absolute top-0 left-0 bg-gradient-to-t from-black/50 transition-all flex flex-col justify-end px-3 py-2.5">
        <nav className="flex justify-between items-center gap-2">
          <span className="truncate text-white capitalize">{title}</span>
          <div className="flex items-center gap-1">
            <Button className="text-base" shape="square" round="circle" variant="white-ghost" size="sm">
              <HiDownload />
            </Button>
            <Button onClick={handleBookmark} className="text-base" shape="square" round="circle" variant={bookmarked? "default" : "white-ghost"} size="sm">
              { bookmarked? <GoBookmarkFill /> : <GoBookmark /> }
            </Button>
          </div>
        </nav>
      </div>
      <div className="absolute top-0 left-0 px-3 py-2">
        { props.media_asset.duration? (
          <span className="text-xs py-1 px-1.5 rounded-lg bg-white/75">{ formatTime(Number(props.media_asset.duration)) }</span>
        ) : ""}
      </div>
    </div>
  );

}