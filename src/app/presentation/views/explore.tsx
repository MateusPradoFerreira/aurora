import chonos from "../../core/lib/utils/chonos";
import { CarouselPostList } from "../components/carousel-post-list";
import { Button } from "../components/ui/button";

export function ExploreView() {

  return (
    <div>

      <div className="mb-3 flex justify-between items-center">
        <h2 className="font-medium text-zinc-700">Popular</h2>
        <Button variant="slate" size="sm">View More</Button>
      </div>
      <CarouselPostList className="mb-6" tags={[ `date:${chonos().format("YYYY-MM-DD")}`, "order:upvotes" ]} limit={60} />

      <div className="mb-3 flex justify-between items-center">
        <h2 className="font-medium text-zinc-700">Hot</h2>
        <Button variant="slate" size="sm">View More</Button>
      </div>
      <CarouselPostList className="mb-6" tags={[ "order:rank" ]} limit={60} />

      <div className="mb-3 flex justify-between items-center">
        <h2 className="font-medium text-zinc-700">Most Favorite</h2>
        <Button variant="slate" size="sm">View More</Button>
      </div>
      <CarouselPostList className="mb-6" tags={[ "order:favcount" ]} limit={60} />

    </div>
  );

};