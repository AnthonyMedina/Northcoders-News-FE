import React, { Component, Fragment } from "react";
import { Route, Link } from "react-router-dom";
import API from "./utils/API";
import Article from "./Article";

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
    <main className="container">
      {topics.map((topic, i) => {
        return <Topic.Card key={i} topic={topic} />;
      })}
    </main>
  ),
  Articles: class Articles extends Component {
    state = {
      articles: []
    };
    componentDidMount() {
      const { topic_title } = this.props.match.params;
      API.fetchArticlesByTopic(topic_title).then(articles => {
        this.setState({
          articles
        });
      });
    }
    render() {
      if (!this.state.articles) return null;
      const { topic_title } = this.props.match.params;
      return (
        <div className="container">
          <h1 className="my-5 text-capitalize">{`${topic_title}`}</h1>
          {this.state.articles.map((article, i) => (
            <Article.Card key={i} article={article} />
          ))}
        </div>
      );
    }
  },

  Card: ({ topic }) => (
    <div className="col-12 col-md-4 shadow my-3 p-3">
      <img
        className="card-img-top"
        src="https://source.unsplash.com/collection/190727/300x300"
        alt="Article"
      />
      <div className="card-body">
        <Link to={`/topics/${topic.slug}`}>{`${topic.title}`}</Link>
      </div>
    </div>
  )
};

export default Topic;
