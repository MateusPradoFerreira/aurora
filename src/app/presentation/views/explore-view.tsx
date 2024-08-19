import { Fragment } from "react/jsx-runtime";
import chonos from "../../core/lib/utils/chonos";
import { CarouselPostList, CarouselPostListProps } from "../components/carousel-post-list";
import { Button } from "../components/ui/button";
import { useTagNavigation } from "../hooks/useTagNavigation";

type ExploreSession = {
  title: string;
  command?: () => void;
} & CarouselPostListProps;

export function ExploreView() {

  const tagNavigation = useTagNavigation();

  const exploreSessions: ExploreSession[] = [
    { title: "Popular", tags: [ `date:${chonos().format("YYYY-MM-DD")}`, "order:upvotes" ] },
    { title: "Hot", tags: [ "order:rank" ] },
    { title: "Most Favorite", tags: [ `date:${chonos().startOf('year').format("YYYY-MM-DD")}..${chonos().format("YYYY-MM-DD")}`, "order:favcount" ] },
    { title: "Most Viewed", tags: [ `date:${chonos().startOf('year').format("YYYY-MM-DD")}..${chonos().format("YYYY-MM-DD")}`, "order:rank" ] },
  ];

  return (
    <div>

      { exploreSessions.map(({ title, tags, command = () => tagNavigation(tags), ...props}) => (
        <Fragment key={Math.random()}>
          <div className="mb-3 flex justify-between items-center">
            <h2 className="font-medium text-zinc-700">{title}</h2>
            <Button variant="slate" size="sm" onClick={command}>View More</Button>
          </div>
          <CarouselPostList className="mb-6" limit={60} { ...props } tags={tags} />
        </Fragment>
      ))}

    </div>
  );

};