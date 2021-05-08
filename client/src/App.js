import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Navbar } from "./components/layouts/Navbar";
import { Home } from "./components/pages/Home";
import { About } from "./components/pages/About";
import { ContactState } from "./context/contact/ContactState";
import { AuthState } from "./context/auth/AuthState";
import "./App.css";
import { Register } from "./components/Auth/Register";
import { Login } from "./components/Auth/Login";

const App = () => {
  return (
    <AuthState>
      <ContactState>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/about" component={About} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </div>
        </BrowserRouter>
      </ContactState>
    </AuthState>
  );
};

export default App;
