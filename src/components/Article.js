import React, { Component } from "react";
// import PT from "prop-types";
import { Route, Link } from "react-router-dom";
import Icon from "./utils/Icon";

const Article = {
  Container: class Container extends Component {
    state = {
      articles: [1, 2]
    };
    render() {
      const { match } = this.props;
      return (
        <main className="container">
          <Route
            exact
            path={`${match.url}`}
            render={props => (
              <Article.List {...props} articles={this.state.articles} />
            )}
          />
        </main>
      );
    }
    static propTypes = {};
  },

  List: ({ articles }) => {
    return articles.map((article, i) => <Article.Card key={i} />);
  },

  Card: props => (
    <div className="row my-4 p-3 shadow">
      <div className="col-4 col-md-1 order-md-1 d-flex flex-column justify-content-around align-items-center">
        <Icon.upVote />
        Votes
        <Icon.downVote />
      </div>
      <div className="col-8 col-md-2 order-md-2">
        <img
          className="img-fluid"
          src="https://source.unsplash.com/collection/190727/300x300"
          alt="Random"
        />
      </div>
      <div className="col-12 col-md-9 order-md-3">
        <h4 className="card-title">Article title</h4>
        <Link to="" className="card-link">
          by Ant Medina
        </Link>
        <Link to="" className="card-link">
          In Topic
        </Link>
        <Link to="" className="card-link">
          324 Comments
        </Link>
      </div>
    </div>
  )
};

export default Article;
