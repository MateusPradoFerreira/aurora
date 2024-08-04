import { createContext, Dispatch, ForwardedRef, ReactNode, SetStateAction, useRef, useState } from "react";
import { useTagSearch } from "../hooks/useTagSearch";
import { TagSearch } from "../../domain/models/tag-search";

export type CreateContextProps = {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  metatags: string[];
  inputRef: ForwardedRef<HTMLInputElement>;
  setFocusOnInput: () => void;
  tagSearch: TagSearch[];
  addTag: (label: string, value: string) => void;
  removeTag: (value: string) => void;
  handleTagSearch: () => void;
};

export const MainCommandContext = createContext<CreateContextProps>(null);

export const METATAGS = ["id", "order", "date", "rating", "score", "user", "date"];

export function MainCommandProvider({ children }: {
  children: ReactNode,
}) {
  
  const [ query, setQuery ] = useState<string>("");
  const { tagSearch, addTag, removeTag, handleTagSearch } = useTagSearch({ initialize: true, onAddTag: () => setQuery("") });

  const inputRef: ForwardedRef<HTMLInputElement> = useRef(null);
  const setFocusOnInput = () => { inputRef.current && inputRef.current.focus() };

  return (
    <MainCommandContext.Provider value={{ query, setQuery, metatags: METATAGS, inputRef, setFocusOnInput, tagSearch, addTag, removeTag, handleTagSearch }}>
      {children}
    </MainCommandContext.Provider>
  );

}