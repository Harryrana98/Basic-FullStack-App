import {createBrowserRouter,RouterProvider  } from "react-router-dom";
import First from "./Pages/First";
import Home from "./Pages/Home";
import DataTable from "./Pages/DataTable";
import EditData from "./Pages/EditData";


const router =createBrowserRouter([
  {
    path:"/",
    element:<First/>,
    children:[
      {
        index:true,
        element:<Home/>
      },{
        path:"/Data",
        element:<DataTable/>
      } 
      ,{
        path: "/edit/:id",
        element: <EditData />,
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router}/>
}
export default App;