import {createBrowserRouter,RouterProvider  } from "react-router-dom";
import First from "./Pages/First";
import Home from "./Pages/Home";


const router =createBrowserRouter([
  {
    path:"/",
    element:<First/>,
    children:[
      {
        index:true,
        element:<Home/>
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router}/>
}
export default App;