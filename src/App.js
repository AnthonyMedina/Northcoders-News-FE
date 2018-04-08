import React, { Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Article from "./components/Article";
import "./App.css";

const App = () => (
  <Router>
    <Fragment>
      <Header />
      <Route path="/articles" component={Article.Container} />
    </Fragment>
  </Router>
);

export default App;
