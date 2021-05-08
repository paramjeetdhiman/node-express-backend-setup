import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Navbar } from "./components/layouts/Navbar";
import { Home } from "./components/pages/Home";
import { About } from "./components/pages/About";
import { ContactState } from "./context/contact/ContactState";
import { AuthState } from "./context/auth/AuthState";
import "./App.css";
import { Register } from "./components/Auth/Register";
import { Login } from "./components/Auth/Login";
import { AlertState } from "./context/alert/AlertState";
import { Alerts } from "./components/layouts/Alerts";

const App = () => {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <BrowserRouter>
            <Navbar />
            <div className="container">
              <Alerts />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
              </Switch>
            </div>
          </BrowserRouter>
        </AlertState>
      </ContactState>
    </AuthState>
  );
};

export default App;
