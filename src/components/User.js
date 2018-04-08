import React, { Component } from "react";
// import PT from "prop-types";
import { Route } from "react-router-dom";
import Article from "./Article";
import Comment from "./Comment";

const User = {
  Container: class Container extends Component {
    state = {
      users: []
    };
    render() {
      const { match } = this.props;
      return (
        <main className="container">
          <Route
            exact
            path={`${match.url}`}
            render={props => <User.List {...props} />}
          />
          <Route
            path={`${match.url}/:user_id`}
            render={props => <User.Page />}
          />
        </main>
      );
    }
  },
  Details: () => <h1>User details here...</h1>,
  List: () => <User.Card />,
  Card: props => (
    <div className="col-12 col-lg-6 shadow my-3 p-3 d-flex">
      <img src="" alt="Profile" />
      <p className="card-text">Username</p>
    </div>
  ),
  Page: class Page extends Component {
    state = {
      articles: [],
      comments: []
    };
    render() {
      return (
        <div className="w-75 mx-auto p-3">
          <User.Details />
          <Article.List articles={this.state.articles} />
          <Comment.Card />
        </div>
      );
    }
  }
};

export default User;
