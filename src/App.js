import MyLayout from "pages/MyLayout";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./pages/Login";
function App() {
  return (
    <Router>
      <Route path="/login" component={Login} />
      <Route path="/" component={MyLayout}></Route>
    </Router>
  );
}

export default App;
