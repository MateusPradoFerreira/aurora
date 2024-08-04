import { IconType } from "react-icons";
import { Link, LinkProps, useMatch, useResolvedPath } from "react-router-dom";
import { cn } from "../../core/lib/utils";

type MainSidebarNavLinkProps = {
  icon: IconType,
} & LinkProps;

export function MainNavLink({ icon, ...props }: MainSidebarNavLinkProps) {

  let resolved = useResolvedPath(props.to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <Link {...props}>
      <div className={cn("h-12 w-12 flex items-center justify-center transition-all rounded-lg text-zinc-400 hover:bg-violet-50 hover:text-violet-500 text-2xl", match && "bg-violet-50 text-violet-500")}>
        {icon({})}
      </div>
    </Link>
  )
}