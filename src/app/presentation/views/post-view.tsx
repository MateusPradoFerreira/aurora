import { useNavigate, useParams } from "react-router-dom";
import { usePost } from "../../data/hooks/post/use-post";
import { CarouselPostList } from "../components/carousel-post-list";
import { TagChip } from "../components/tag-chip";
import { Button } from "../components/ui/button";
import { IoMdArrowRoundBack } from "react-icons/io";
import { TbZoomScan } from "react-icons/tb";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "../components/ui/dialog";

function tagStringConversor(tagString: string): { label: string, value: string }[] {
  return tagString.split(" ").map(tag => ({ label: tag.split("_").join(" "), value: tag }));
}

export function PostView() {

  let { id } = useParams();

  const navigate = useNavigate();
  const { data, isLoading } = usePost(Number(id));
  const [open, setOpen] = useState(false);

  const handleToggleOpenState = () => setOpen(prev => !prev);

  console.log(data)

  const isVideo = data?.file_ext === "mp4";

  return isLoading? "loading" : (
    <div>
      <div className="grid gap-6 grid-cols-[556px_1fr] 2xl:grid-cols-[956px_1fr] mb-6"> 

        <div className="relative">
          { isVideo? (
            <video className="w-full aspect-video bg-black rounded-xl" controls>
              <source src={data.large_file_url} type="video/mp4"/>
            </video>
          ) : (
            <div className="flex items-center justify-center border-2 border-slate-100 rounded-xl overflow-hidden max-h-[556px] 2xl:min-h-[500px] 2xl:max-h-[756px]">
              <img className="max-w-[556px] max-h-[556px] 2xl:max-w-[956px] 2xl:max-h-[756px]" src={data.large_file_url} alt="" />
            </div>
          )}

          <Button variant="white-ghost" shape="square" round="circle" className="absolute top-0 left-0 mt-3 ml-3" onClick={() => window.history.back()}>
            <IoMdArrowRoundBack />
          </Button>

          { !isVideo? (
            <Button variant="ghost" shape="square" className="absolute bottom-0 right-0 mb-3 mr-3 text-2xl" onClick={handleToggleOpenState}>
              <TbZoomScan />
            </Button>
          ) : ""}
        </div>

        <aside>
          <h1 className="font-semibold line-clamp-2 capitalize mb-2 text-lg text-zinc-700">{(data.tag_string_character ||data.tag_string_artist).split(" ").join(", ").split("_").join(" ")}</h1>
          <div className="flex flex-wrap gap-1">
            { data.tag_string_copyright? tagStringConversor(data.tag_string_copyright).map(tag => (
              <TagChip command={() => navigate(`/search?tags=${tag.value}`)} key={Math.random()} variant="copyright" className="text-xs 2xl:text-sm">{tag.label}</TagChip>
            )) : ""}
            { data.tag_string_artist? tagStringConversor(data.tag_string_artist).map(tag => (
              <TagChip command={() => navigate(`/search?tags=${tag.value}`)} key={Math.random()} variant="artist" className="text-xs 2xl:text-sm">{tag.label}</TagChip>
            )) : ""}
            { data.tag_string_character? tagStringConversor(data.tag_string_character).map(tag => (
              <TagChip command={() => navigate(`/search?tags=${tag.value}`)} key={Math.random()} variant="character" className="text-xs 2xl:text-sm">{tag.label}</TagChip>
            )) : ""}
            { data.tag_string_general? tagStringConversor(data.tag_string_general).map(tag => (
              <TagChip command={() => navigate(`/search?tags=${tag.value}`)} key={Math.random()} variant="general" className="text-xs 2xl:text-sm">{tag.label}</TagChip>
            )) : ""}
            { data.tag_string_meta? tagStringConversor(data.tag_string_meta).map(tag => (
              <TagChip command={() => navigate(`/search?tags=${tag.value}`)} key={Math.random()} variant="meta" className="text-xs 2xl:text-sm">{tag.label}</TagChip>
            )) : ""}
          </div>
        </aside>

      </div>
      
      { data.parent_id? (
        <div className="mb-6">
          <div className="mb-3 flex justify-between items-center">
            <h2 className="font-medium text-zinc-700">Related Posts</h2>
            <Button variant="slate" size="sm">View More</Button>
          </div>
          <CarouselPostList cardClassName="" tags={[`parent:${data.parent_id}`]} />
        </div>
      ) : ""}

      { data.tag_string_artist? data.tag_string_artist.split(" ").map(tag => (
        <div className="mb-6" key={Math.random()}>
          <div className="mb-3 flex justify-between items-center">
            <h2 className="font-medium text-zinc-700 capitalize">More of Artist "{ tag.split("_").join(" ") }"</h2>
            <Button variant="slate" size="sm">View More</Button>
          </div>
          <CarouselPostList cardClassName="" tags={[tag]} />
        </div>
      )) : ""}

      <Dialog open={open} onOpenChange={handleToggleOpenState}>
        <DialogContent className="border-0 bg-transparent shadow-none rounded-none h-fit w-fit flex items-center justify-center">
          <DialogTitle className="hidden" />
          <img className="max-w-screen max-h-screen" src={data.large_file_url} alt="" />
        </DialogContent>
      </Dialog>

    </div>
  );

};