import { cn } from "../../core/lib/utils";
import { usePosts } from "../../data/hooks/post/use-posts";
import { PostCard } from "./post-card";
import { Carousel, CarouselContent, CarouselNext, CarouselPrevious, CarouselProps } from "./ui/carousel";

type CarouselPostListProps = {
  tags: string[];
  limit?: number;
  className?: string;
  cardClassName?: string;
} & CarouselProps;

export function CarouselPostList({ tags = [], limit = 20, cardClassName, ...props }: CarouselPostListProps) {

  const { data, isLoading } = usePosts({ limit, tags });

  return (
    <Carousel { ...props }>
      <CarouselContent className="gap-4 px-4">
        { !isLoading? data?.map(post => (
          <PostCard className={cn("h-72 flex-shrink-0", cardClassName)} key={post.id} { ...post } />
        )) : Array.from({ length: 20 }, (_, i) => i + 1).map(() => (
          <div key={Math.random()} className="h-72 aspect-[46/66] rounded-lg animate-pulse bg-slate-200" />
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}