// need to import outlet, route and routes from react at some point based on honey rae's project
//Why? So this component can know how to route new data and give the user the proper data based on the url they are sent to...?
import { Outlet, Route, Routes } from "react-router-dom";
import { LocationList } from "../tickets/LocationList";
import { LearnRoutes } from "../tickets/RouteInfo"
import { ProductList } from "../tickets/ProductList.js";

export const ApplicationViews = () => { //this function runs it returns a web page that starts at the root (home page) but has an outlet option for other routes as well. 
  // Outlet, according to chatGPT is "is a special component in React Router that is used to render child routes. It acts as a placeholder where the child routes will be rendered based on the URL path."
  // The <Routes> component will define the route configuration. It is specific to React. It basically is code for "here come the routes file paths I want for each module or component on this web page"
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <h1>Kandy Korner</h1>
              <div>Get Yer Sugar Fix</div>

              <Outlet />
            </>
          }>
          <Route path="locations" element={<LocationList />} />
          <Route path="routes" element={<LearnRoutes />} />
          <Route path="products" element={<ProductList /> } />
          
          {/* //* the above route code could read like this: when the <Route path equals "products", run the ProductList function which will display the list of products  */}

        </Route>
      </Routes>
    </>
  );
};

// this component watches the browser URL and displays the correct components based on the path of that url. //? Example?

// When I click on a button, we are at a new web address/url…but it's the same html document as before, just rendered with updated info. So how do we get to the /new part of the url?

// We are "routed" by the ApplicationViews module which runs functions that update the data we are seeing…whether it's buttons on a web page or data that a user entered, etc.
