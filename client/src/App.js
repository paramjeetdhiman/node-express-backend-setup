import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Navbar } from "./components/layouts/Navbar";
import { Home } from "./components/pages/Home";
import { About } from "./components/pages/About";
import { ContactState } from "./context/contact/ContactState";
import "./App.css";

const App = () => {
  return (
    <ContactState>
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
          </Switch>
        </div>
      </BrowserRouter>
    </ContactState>
  );
};

export default App;
