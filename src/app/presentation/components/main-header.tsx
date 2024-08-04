import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { MainCommand } from "./main-command";
import { MainCommandProvider } from "../contexts/main-command-context";

export function MainHeader() {

  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY);
    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const offsetStyle = !offset? "shadow-transparent" : "shadow-black/10";

  return (
    <header className={`z-[100] pl-6 sm:pl-[88px] pr-6 fixed top-0 left-0 w-screen h-16 flex items-center justify-between gap-2 shadow-md transition-all bg-white ${offsetStyle}`}>
      <nav className="flex items-center gap-2">
        <Link to="/home">
          <Button>Home Page</Button>
        </Link>
        <Link to="/home">
          <Button variant="ghost">Explore</Button>
        </Link>
      </nav>
      <MainCommandProvider>
        <MainCommand />
      </MainCommandProvider>
      <nav className="flex items-center gap-2">
        <Button variant="ghost">Bookmark</Button>
        <Button>Danbooru</Button>
      </nav>
    </header>
  )

}