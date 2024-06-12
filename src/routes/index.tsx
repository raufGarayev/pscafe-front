import { Routes, Route } from "react-router-dom";
import { routes, RouteType } from "./routes";

const Router = () => {
  return (
    <Routes>
      <Route path="/">
        {routes.map((route: RouteType, index) => (
          <Route key={index} {...route} />
        ))}
      </Route>
    </Routes>
  );
};

export default Router;
