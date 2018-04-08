import React, { Component } from "react";
import { Route } from "react-router-dom";
import Article from "./Article.js";

const Topic = {
  Container: class Container extends Component {
    state = {
      topics: []
    };
    render() {
      const { match } = this.props;
      return (
        <main className="container">
          <Route
            exact
            path={`${match.url}`}
            render={props => <Topic.List {...props} />}
          />
          <Route
            path={`${match.url}/:topic_id`}
            render={props => <Topic.Articles {...props} />}
          />
        </main>
      );
    }
  },
  List: props => (
    <main className="container">
      <Topic.Card />
    </main>
  ),
  Articles: class Articles extends Component {
    state = {
      articles: []
    };
    render() {
      return (
        <div className="container">
          <Article.Card />
        </div>
      );
    }
  },
  Card: props => (
    <div class="col-12 col-md-4 shadow my-3 p-3">
      <img
        class="card-img-top"
        src="https://source.unsplash.com/collection/190727/300x300"
        alt="Article"
      />
      <div class="card-body">
        <p class="card-text">Topic Title</p>
      </div>
    </div>
  )
};

export default Topic;
