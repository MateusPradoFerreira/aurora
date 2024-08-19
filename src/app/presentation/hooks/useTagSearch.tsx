import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useTagNavigation } from "./useTagNavigation";

export type useTagSearchProps = {
  initialize: boolean;
  onSearch?: () => void;
  onAddTag?: () => void;
}

export function useTagSearch({ initialize = false, onSearch = () => {}, onAddTag = () => {} }: useTagSearchProps) {

  const tagNavigation = useTagNavigation();
  const [searchParams] = useSearchParams();
  const INITIAL_SELECTED_TAGS = !initialize? [] : searchParams.get("tags")?.split(",")?.filter(tag => !!tag)?.map(tag => ({ label: tag.replace("_", " "), value: tag })) || [];
  const [tagSearch, setTagSearch] = useState<{ label: string, value: string }[]>(INITIAL_SELECTED_TAGS);

  const addTag = (label: string, value: string) => {
    if(tagSearch.filter(tag => tag.value === value).length) return;
    setTagSearch(prev => [ ...prev, { label, value }]);
    onAddTag();
  };

  const removeTag = (value: string) => setTagSearch(prev => prev.filter(tag => tag.value !== value ));

  const handleTagSearch = () => {
    tagNavigation(tagSearch.map(tag => tag.value));
    onSearch();
  }

  return { tagSearch, setTagSearch, addTag, removeTag, handleTagSearch };

}