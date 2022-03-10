import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./pages/MyLayout";
function App() {
  return (
    <Router>
      <Redirect from="/" to="/layout" exact />
      <Route path="/login" component={Login} />
      <Route path="/layout" component={Layout} />
    </Router>
  );
}

export default App;
