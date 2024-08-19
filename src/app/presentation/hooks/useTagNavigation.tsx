import { useNavigate } from "react-router-dom";

export function useTagNavigation() {

  const navigate = useNavigate();

  const tagNavigation = (tags: string[] | string) => {
    if(typeof tags === "string") {
      navigate(`/search?tags=${tags}`);
    } else {
      navigate(`/search?tags=${tags.join()}`);
    }
  }

  return tagNavigation;

}