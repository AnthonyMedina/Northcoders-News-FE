import React, { Component } from "react";
// import PT from "prop-types";
import { Route, Link } from "react-router-dom";
import API from "./utils/API";
import Comment from "./Comment";
import Vote from "./Vote";

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
              <Article.Complete
                {...props}
                articles={this.state.articles}
                changeVote={this.changeVote}
              />
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

  Card: ({ article }) => (
    <div className="row my-4 p-3 shadow">
      <div className="col-4 col-md-1 order-md-1 d-flex flex-column justify-content-around align-items-center">
        <Vote voteObj={article} type={"articles"} />
      </div>
      <div className="col-8 col-md-2 order-md-2">
        <Link to={`/articles/${article._id}`}>
          <img
            className="img-fluid"
            src="https://source.unsplash.com/collection/190727/300x300"
            alt="Random"
          />
        </Link>
      </div>
      <div className="col-12 col-md-9 order-md-3">
        <Link to={`/articles/${article._id}`}>
          <h4 className="card-title">{`${article.title}`}</h4>
        </Link>
        <Link
          to={`/users/${article.created_by}`}
          className="card-link text-capitalize"
        >
          {`By ${article.created_by}`}
        </Link>
        <Link
          to={`/topics/${article.belongs_to}`}
          className="card-link text-capitalize"
        >
          {`In ${article.belongs_to}`}
        </Link>
        <Link
          to={`/articles/${article._id}`}
          className="card-link text-capitalize"
        >
          {`${article.comments} comments`}
        </Link>
      </div>
    </div>
  ),

  Complete: ({ articles, match, changeVote }) => {
    const article_id = match.params.article_id;
    const [article] = articles.filter(article => article._id === article_id);
    if (!article) return null;
    return (
      <div className="w-75 mx-auto d-flex flex-column p-3">
        <h1 className="my-3">{`${article.title}`}</h1>
        <img
          className="img-fluid"
          src="https://source.unsplash.com/collection/190727/700x300"
          alt="Random"
        />
        <div className="d-flex justify-content-between align-items-center my-3">
          <div className="d-flex flex-column justify-content-around align-items-center">
            <Vote voteObj={article} type={"articles"} changeVote={changeVote} />
          </div>
          <Link
            to={`/users/${article.created_by}`}
            className="text-capitalize"
          >{`by ${article.created_by}`}</Link>
          <Link
            to={`/topics/${article.belongs_to}`}
            className="text-capitalize"
          >
            In {`${article.belongs_to}`}
          </Link>
        </div>
        <p className="text-justify my-3">{`${article.body}`}</p>
        <Comment.Container article_id={article_id} />
      </div>
    );
  }
};

export default Article;
