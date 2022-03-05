import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
function App() {
  return (
    <Router>
      <Redirect from="/" to="/login" exact />
      <Route path="/login" component={Login} />
      <Route path="/layout" component={Layout} />
    </Router>
  );
}

export default App;
