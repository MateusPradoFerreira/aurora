import { InfiniteScrolllerMasonryPostList } from "../components/infinite-scrolller-masonry-post-list";
import { useInfiniteScrolllerPosts } from "../../data/hooks/post/use-infinite-scrolller-posts";
import { Post } from "../../domain/models/post.model";
import { Button } from "../components/ui/button";
import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import chonos from "../../core/lib/utils/chonos";

export function PopularView() {

  const navigate = useNavigate();
  const { startDate = chonos().format("YYYY-MM-DD"), endDate } = useParams();

  const { data, fetchNextPage } = useInfiniteScrolllerPosts({
    tags: ["order:upvotes", `date:${startDate}${endDate? `..${endDate}` : ""}`],
  });

  const dates: { [key: string]: { startDate: string, endDate?: string } } = useMemo(() => ({
    today: { startDate: chonos().format("YYYY-MM-DD") },
    week: { startDate: chonos().startOf("week").format("YYYY-MM-DD"), endDate: chonos().endOf("week").format("YYYY-MM-DD") },
    month: { startDate: chonos().startOf("month").format("YYYY-MM-DD"), endDate: chonos().endOf("month").format("YYYY-MM-DD") },
  }), []);

  const handleChangeQuery = (key: string) => {
    if(!dates[key]) navigate(`/popular`);
    const date = dates[key];
    navigate(`/popular/${date.startDate}${date?.endDate? `/${date.endDate}` : ""}`);
  };

  const values: Post[] = [];
  data?.pages.map((page: any) => page.map((val: any) => values.push(val)));

  return (
    <div>
      <div className="flex items-center justify-center flex-col mb-8">
        <h1 className="mb-4 mt-6 text-xl font-semibold">Popular Posts of {startDate} {endDate? `at ${endDate}` : ""}</h1>
        <div className="flex gap-2">
          <Button size="sm" variant="secondary" onClick={() => handleChangeQuery("today")}>Today</Button>
          <Button size="sm" variant="secondary" onClick={() => handleChangeQuery("week")}>Week</Button>
          <Button size="sm" variant="secondary" onClick={() => handleChangeQuery("month")}>Month</Button>
        </div>
      </div>
      <InfiniteScrolllerMasonryPostList values={values} fetchNextPage={() => fetchNextPage({ pageParam: { page: data?.pages.length + 1 } })}/>
    </div>
  );

};