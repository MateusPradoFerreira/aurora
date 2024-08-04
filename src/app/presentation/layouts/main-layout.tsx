import { Outlet } from "react-router-dom";
import { MainHeader } from "../components/main-header";
import { Fragment } from "react/jsx-runtime";
import { MainSidebar } from "../components/main-sidebar";

export function MainLayout() {
  return (
    <Fragment>
      <MainHeader />
      <MainSidebar />
      <main className="px-6 py-2 mt-16 sm:ml-16">
        <Outlet />
      </main>
    </Fragment>
  )
}