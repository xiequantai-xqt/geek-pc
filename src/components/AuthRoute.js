import { Route, useHistory } from "react-router-dom";
import { getToken } from "./local";

export default function AuthRoute(props) {
  const { path, component: Component, ...rest } = props;
  const history = useHistory();
  return (
    <Route
      {...rest}
      path={path}
      render={(props) => {
        if (!!getToken()) {
          return <Component {...props} />;
        }
        history.push("/login");
      }}
    ></Route>
  );
}
