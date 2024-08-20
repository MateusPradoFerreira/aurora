import { useEffect, useState } from "react";
import { Post } from "../../domain/models/post.model";
import ls from "react-secure-storage";

export function useBookmark() {

  const initialBookmarkedData = ls.getItem("bookmarked-posts") as Post[] || [];
  const [data, setData] = useState<Post[]>(initialBookmarkedData);

  useEffect(() => {
    ls.setItem("bookmarked-posts", data);
  }, [data]);

  const addBookmarkedPost = (post: Post) => {
    const updateData = ls.getItem("bookmarked-posts") as Post[] || [];
    setData(() => [ ...updateData, post ].filter((obj, index, self) => index === self.findIndex((t) => t.id === obj.id)));
  };

  const removeBookmarkedPost = (id: number) => {
    const updateData = ls.getItem("bookmarked-posts") as Post[] || [];
    setData(() => updateData.filter(post => post.id !== id));
  };

  const verifyBookmarkedPost = (id: number) => !!data.find(post => post.id === id);

  return { data, addBookmarkedPost, removeBookmarkedPost, verifyBookmarkedPost };

}