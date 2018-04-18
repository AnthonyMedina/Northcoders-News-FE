import React, { Component, Fragment } from "react";
// import PT from "prop-types";
import moment from "moment";
import { Route, Link } from "react-router-dom";
import API from "./utils/API";
import Comment from "./Comment";
import Vote from "./Vote";
import Search from "./Search";

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
            path={`/articles/:article_id`}
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

  List: class List extends Component {
    state = {
      searchTerm: ""
    };

    doSearch = searchTerm => {
      this.setState({
        searchTerm: searchTerm.toLowerCase().trim()
      });
    };

    render() {
      return (
        <Fragment>
          <Search type="articles" doSearch={this.doSearch} />
          {this.props.articles.reduce((acc, article, i) => {
            if (article.title.toLowerCase().includes(this.state.searchTerm)) {
              acc.push(<Article.Card key={i} article={article} />);
            }
            return acc;
          }, [])}
        </Fragment>
      );
    }
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
          to={`/users/${article.created_by.username}`}
          className="card-link"
        >
          {`Submitted by ${article.created_by.username}`}
        </Link>
        <Link to={`/topics/${article.topic}`} className="card-link">
          {`in ${article.topic}`}
        </Link>
        <Link to={`/articles/`} className="card-link text-capitalize">
          {moment(article.created_at).fromNow()}
        </Link>
        <Link
          to={`/articles/${article._id}`}
          className="card-link text-capitalize"
        >
          {`${article.comments} comment${article.comments === 1 ? "" : "s"}`}
        </Link>
      </div>
    </div>
  ),

  Complete: ({ articles, match, changeVote }) => {
    const article_id = match.params.article_id;
    const [article] = articles.filter(article => article._id === article_id);
    if (!article) return null;
    return (
      <Fragment>
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
            to={`/users/${article.created_by.username}`}
            className="text-capitalize"
          >{`Submitted by ${article.created_by.username}`}</Link>
          <Link to={`/articles/${article._id}`} className="text-capitalize">
            {moment(article.created_at).fromNow()}
          </Link>
          <Link to={`/topics/${article.topic}`} className="text-capitalize">
            In {`${article.topic}`}
          </Link>
        </div>
        <p className="text-justify my-3">{`${article.body}`}</p>
        <Comment.Container article_id={article_id} />
      </Fragment>
    );
  }
};

export default Article;
