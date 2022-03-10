import AuthRoute from "components/AuthRoute";
import Layout from "pages/MyLayout";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <AuthRoute path="*" component={Layout}></AuthRoute>
      </Switch>
    </Router>
  );
}

export default App;
