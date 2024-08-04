import { Fragment, useContext, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { MainCommandSearch } from "./main-command-search";
import { MainCommandDialog } from "./main-command-dialog";
import { MainCommandPostTagSearch } from "./main-command-post-tag-search";
import { MainCommandContext } from "../../contexts/main-command-context";

export function MainCommand() {

  const [ open, setOpen ] = useState(false);
  const { query, setQuery, inputRef } = useContext(MainCommandContext);

  const handleToggleModalState = () => {
    setOpen(!open);
    setQuery("");
  };

  return (
    <Fragment>
      <MainCommandSearch 
        className="w-full hidden sm:flex"
        inputProps={{ className: "bg-slate-100 rounded-l-full", onFocus: handleToggleModalState, placeholder: "Search by posts, pools, artists..." }} 
        buttonProps={{ variant: "slate", onClick: handleToggleModalState, className: "rounded-r-full" }} 
      />
      <MainCommandDialog open={open} onOpenChange={handleToggleModalState}>
        <div className="flex flex-col gap-2">
          <MainCommandSearch inputProps={{ value: query, onChange: (e) => setQuery(e.target.value) }} inputRef={inputRef} />
          <Tabs defaultValue="posts">
            <TabsList>
              <TabsTrigger value="posts">Posts</TabsTrigger>
              <TabsTrigger value="artists">Artists</TabsTrigger>
              <TabsTrigger value="collections">Collections</TabsTrigger>
            </TabsList>
            <TabsContent value="posts">
              <MainCommandPostTagSearch onSearch={handleToggleModalState} />
            </TabsContent>
          </Tabs>
        </div>
      </MainCommandDialog>
    </Fragment>
  )
}
