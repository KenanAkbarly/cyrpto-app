import React from "react";
import { ROUTES } from "./routes/route";
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import { Toaster } from 'react-hot-toast'

const router = createBrowserRouter(ROUTES)
function App() {
  return (
    <>
      <Toaster
  position="bottom-left"
  reverseOrder={false}
/>
    <RouterProvider router={router}/>
    
    </>
  );
}

export default App;
