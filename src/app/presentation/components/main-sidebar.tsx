import logo from '../../../assets/images/aurora-logo.png';
import { FaRegCompass } from 'react-icons/fa';
import { BiCategory } from 'react-icons/bi';
import { MainNavLink } from './main-nav-link';
import { MdInfoOutline, MdOutlineSsidChart } from "react-icons/md";
import { LuPencilRuler } from 'react-icons/lu';
import { FiUsers } from "react-icons/fi";

export function MainSidebar() {

  return (
    <aside className="hidden sm:block z-[100] fixed top-0 left-0 h-screen w-16 bg-white border-r border-zinc-100 shadow-md shadow-black-10 overflow-hidden">
      <div className="h-16 flex items-center justify-center">
        <img src={logo} alt="" className="w-10 h-10" />
      </div>
      <nav className="px-2 py-8 flex flex-col gap-1">
        <MainNavLink icon={FaRegCompass} to="/explore" />
        <MainNavLink icon={MdOutlineSsidChart} to="/popular" />
        <MainNavLink icon={LuPencilRuler} to="/artists" />
        <MainNavLink icon={BiCategory} to="/pools" />
        <MainNavLink icon={FiUsers} to="/users" />
        <MainNavLink icon={MdInfoOutline} to="/about" />
      </nav>
    </aside>
  )

}