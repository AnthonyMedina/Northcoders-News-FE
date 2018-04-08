import React, { Component, Fragment } from "react";
// import PT from "prop-types";
import { Route, Link } from "react-router-dom";
import API from "./utils/API";
import Comment from "./Comment";
import Icon from "./utils/Icon";

const Article = {
  Container: class Container extends Component {
    state = {
      articles: []
    };
    componentDidMount() {
      API.fetchArticles().then(articles => {
        this.setState({
          articles
        });
      });
    }
    render() {
      const { match } = this.props;
      return (
        <main className="container">
          <Route
            exact
            path={`${match.url}`}
            render={props => {
              return <Article.List {...props} articles={this.state.articles} />;
            }}
          />
          <Route
            path={`${match.url}/:article_id`}
            render={props => (
              <Article.Complete {...props} articles={this.state.articles} />
            )}
          />
        </main>
      );
    }
    static propTypes = {};
  },

  List: ({ articles }) => {
    return articles.map((article, i) => (
      <Article.Card key={i} article={article} />
    ));
  },
  Card: ({
    article: { title, created_by: name, belongs_to: topic, votes, comments }
  }) => (
    <div className="row my-4 p-3 shadow">
      <div className="col-4 col-md-1 order-md-1 d-flex flex-column justify-content-around align-items-center">
        <Icon.upVote />
        {`${votes}`}
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
        <h4 className="card-title">{`${title}`}</h4>
        <Link to="" className="card-link text-capitalize">
          {`by ${name}`}
        </Link>
        <Link to="" className="card-link text-capitalize">
          {`In ${topic}`}
        </Link>
        <Link to="" className="card-link">
          {`${comments} comments`}
        </Link>
      </div>
    </div>
  ),

  Complete: props => (
    <Fragment>
      <div className="w-75 mx-auto d-flex flex-column p-3">
        <h1 className="my-3">Article Title</h1>
        <img
          className="img-fluid"
          src="https://source.unsplash.com/collection/190727/700x300"
          alt="Random"
        />
        <div className="d-flex justify-content-between align-items-center my-3">
          <div className="d-flex flex-column justify-content-around align-items-center">
            <Icon.upVote />
            Votes
            <Icon.downVote />
          </div>
          <Link to="">by Avatar and Name</Link>
          <Link to="">In Topic</Link>
        </div>
        <p className="text-justify my-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora,
          magni iste. Corrupti, enim excepturi. Velit cum ut, cupiditate at,
          repellendus itaque nesciunt, reiciendis dolores accusamus recusandae
          suscipit voluptate rerum quaerat.
        </p>
        <Comment.Input />
        <Comment.Card />
      </div>
    </Fragment>
  )
};

export default Article;
