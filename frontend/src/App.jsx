// The outlet component will help us to make sure that the component that will mount on the screen in a specific route is the component that we specified in the router (One component each time/ for each route, it can be pages or just one component)
import { Outlet } from "react-router-dom";

function App() {
  return (
    <Outlet />
  )
}

export default App