import { Fragment, useContext } from "react";
import { Button } from "../ui/button";
import { useAutocompletedTags } from "../../../data/hooks/tags/use-autocompleted-tags";
import { MainCommandGroup } from "./main-command-group";
import { MainCommandItem } from "./main-command-item";
import { IoIosClose } from "react-icons/io";
import { usePopularTags } from "../../../../../src/app/data/hooks/tags/use-pupular-tags";
import chonos from "../../../core/lib/utils/chonos";
import { TagChip } from "../tag-chip";
import { MainCommandContext } from "../../contexts/main-command-context";

type MainCommandPostTagSearchProps = {
  onSearch?: () => void;
};

export function MainCommandPostTagSearch({ onSearch }: MainCommandPostTagSearchProps) {

  const { query, setQuery, tagSearch, addTag, removeTag, metatags, handleTagSearch, setFocusOnInput } = useContext(MainCommandContext);

  const { data, isLoading } = useAutocompletedTags({ query, limit: 12 });
  const { data: popularTags } = usePopularTags({ date: chonos().format("YYYY-MM-DD"), limit: 20 });

  const formatedPopulartTags = popularTags?.map(tag => ({ label: tag.name.split("_").join(" "), value: tag.name, category: tag.category }));

  return (
    <Fragment>

      { tagSearch.length? (
        <MainCommandGroup title="Selected Tags" contentClassName="flex gap-1 flex-wrap" className="mb-3">
          { tagSearch.map(tag => (
            <TagChip key={Math.random()} className="flex items-center gap-1 pr-1.5">
              {tag.label}
              <IoIosClose className="text-xl hover:text-red-500" onClick={() => removeTag(tag.value)} />
            </TagChip>
          ))}
        </MainCommandGroup>
      ) : "" }

      { !query? (
        <MainCommandGroup title="Metatags" contentClassName="flex gap-1 flex-wrap overflow-hidden lg:max-h-16" className="mb-3">
          { metatags.map(metatag => (
            <TagChip command={() => { setQuery(`${metatag}:`); setFocusOnInput() }} key={Math.random()} variant="metatag">{metatag}</TagChip>
          ))}
        </MainCommandGroup>
      ) : "" }

      { !query && popularTags? (
        <MainCommandGroup title="Popular Tags" contentClassName="flex gap-1 flex-wrap overflow-hidden lg:max-h-16" className="mb-3">
          { formatedPopulartTags.map(tag => (
            <TagChip command={() => addTag(tag.label, tag.value)} key={Math.random()} variant={tag.category}>{tag.label}</TagChip>
          ))}
        </MainCommandGroup>
      ) : "" }
      
      { query && data && !isLoading? (
        <MainCommandGroup title="Search Results" contentClassName="flex flex-col gap-1" className="mb-3">
          { data.map(tag => (
            <MainCommandItem command={() => !query.includes(":")? addTag(tag.label, tag.value) : addTag(`${query.split(":")[0]}: ${tag.label}`, tag.value)} key={Math.random()} className="flex gap-2 items-center">
              <TagChip className="w-2 h-2 p-0" variant={tag.category} />
              { tag?.antecedent? `${tag?.antecedent} => ` : "" } {tag.label}
            </MainCommandItem>
          ))}
        </MainCommandGroup>
      ) : "" }

      <div className="flex justify-end">
        <Button onClick={() => { handleTagSearch(); onSearch() }}>Search</Button>
      </div>

    </Fragment>
  );

}