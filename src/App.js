import React, { Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Article from "./components/Article";
import Topic from "./components/Topic";
import User from "./components/User";
import "./App.css";

const App = () => (
  <Router>
    <Fragment>
      <Header />
      <Route path="/" component={Article.Container} />
      <Route path="/topics" component={Topic.Container} />
      <Route path="/users" component={User.Container} />
    </Fragment>
  </Router>
);

export default App;
