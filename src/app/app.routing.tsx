import { createBrowserRouter, Navigate } from "react-router-dom";
import { HomeView } from "./presentation/views/home-view";
import { MainLayout } from "./presentation/layouts/main-layout";
import { PostView } from "./presentation/views/post-view";
import { SearchView } from "./presentation/views/search-view";
import { ExploreView } from "./presentation/views/explore";

export const router = createBrowserRouter([
  { path: "", element: <Navigate to="home"/> },
  { path: "*", element: "Error 404" },
  { path: "", element: <MainLayout />, children: [
    { path: "home", element: <HomeView /> },
    { path: "search/post/:id", element: <PostView /> },
    { path: "search", element: <SearchView /> },
    { path: "explore", element: <ExploreView /> },
  ]}
])