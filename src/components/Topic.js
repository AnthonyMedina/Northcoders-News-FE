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
    render() {
      return (
        <div className="container">
          {this.state.articles.map((article, i) => (
            <Article.Card key={i} article={article._id} />
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
        <Link to={`/topics/${topic._id}`}>{`${topic.title}`}</Link>
      </div>
    </div>
  )
};

export default Topic;
