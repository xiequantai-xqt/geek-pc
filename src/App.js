import AuthRoute from "components/AuthRoute";
import Layout from "pages/MyLayout";
import { Route, Router, Switch } from "react-router-dom";
import history from "utils/history";
import Login from "./pages/Login";
function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/login" component={Login} />
        <AuthRoute path="*" component={Layout}></AuthRoute>
      </Switch>
    </Router>
  );
}

export default App;
