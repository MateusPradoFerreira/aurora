import { QueryClientProvider } from "react-query";
import { queryClient } from "./core/config/query-client.config";
import { router } from "./app.routing";
import { RouterProvider } from "react-router-dom";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App; 
