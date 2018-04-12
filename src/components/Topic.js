import React, { Component, Fragment } from "react";
import { Route, Link } from "react-router-dom";
import API from "./utils/API";
import Article from "./Article";
import Search from "./Search";

const Topic = {
  Container: class Container extends Component {
    state = {
      topics: []
    };
    componentDidMount() {
      API.fetchTopics().then(topics => {
        this.setState({
          topics
        });
      });
    }
    render() {
      const { match } = this.props;
      return (
        <Fragment>
          <Route
            exact
            path={`${match.url}`}
            render={props => (
              <Topic.List {...props} topics={this.state.topics} />
            )}
          />
          <Route
            path={`${match.url}/:topic_title`}
            render={props => <Topic.Articles {...props} />}
          />
        </Fragment>
      );
    }
  },

  List: ({ topics }) => (
    <div className="container">
      <div className="row">
        {topics.map((topic, i) => {
          return <Topic.Card key={i} topic={topic} />;
        })}
      </div>
    </div>
  ),
  Articles: class Articles extends Component {
    state = {
      articles: [],
      searchTerm: ""
    };

    componentDidMount() {
      const { topic_title } = this.props.match.params;
      API.fetchArticlesByTopic(topic_title).then(articles => {
        this.setState({
          articles
        });
      });
    }

    doSearch = searchTerm => {
      this.setState({
        searchTerm: searchTerm.toLowerCase().trim()
      });
    };

    render() {
      if (!this.state.articles) return null;
      const { topic_title } = this.props.match.params;
      return (
        <div className="container">
          <h1 className="my-5 text-capitalize">{`${topic_title}`}</h1>
          <Search doSearch={this.doSearch} type="articles" />
          {this.state.articles.reduce((acc, article, i) => {
            if (article.title.toLowerCase().includes(this.state.searchTerm)) {
              acc.push(<Article.Card key={i} article={article} />);
            }
            return acc;
          }, [])}
        </div>
      );
    }
  },

  Card: ({ topic }) => (
    <div className="col-12 col-md-3 shadow m-3 p-3 ">
      <Link to={`/topics/${topic.slug}`}>
        <img
          className="card-img-top"
          src="https://source.unsplash.com/collection/190727/300x300"
          alt="Article"
        />
        <div className="">{`${topic.title}`}</div>
      </Link>
    </div>
  )
};

export default Topic;
