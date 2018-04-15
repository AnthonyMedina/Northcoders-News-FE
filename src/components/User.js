import React, { Component, Fragment } from "react";
// import PT from "prop-types";
import { Route, Link } from "react-router-dom";
import API from "./utils/API";
import Article from "./Article";
import Comment from "./Comment";

const User = {
  Container: class Container extends Component {
    state = {
      users: []
    };

    componentDidMount() {
      API.fetchAllUsers().then(users => {
        this.setState({
          users
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
            render={props => <User.List {...props} users={this.state.users} />}
          />
          <Route
            path={`${match.url}/:username`}
            render={props => <User.Page {...props} users={this.state.users} />}
          />
        </main>
      );
    }
  },

  List: ({ users }) => (
    <div className="d-flex flex-wrap align-content-between">
      {users.map((user, i) => <User.Card user={user} key={i} />)}
    </div>
  ),

  Card: ({ user }) => (
    <div className="col-6 col-md-4">
      <div className="shadow w-100 h-100 m-3">
        <Link to={`/users/${user.username}/`} className="card-text">
          <h3>{`${user.name}`}</h3>
          <img
            src={`${user.avatar_url}`}
            alt="user avatar"
            className="rounded-circle w-100"
          />
        </Link>
      </div>
    </div>
  ),

  Page: class Page extends Component {
    state = {
      articles: [],
      comments: []
    };

    componentDidMount() {
      const { username } = this.props.match.params;
      API.fetchUserArticles(username).then(articles => {
        this.setState({
          articles
        });
      });
      API.fetchUserComments(username).then(({ comments }) => {
        this.setState({ comments });
      });
    }

    render() {
      const { username } = this.props.match.params;
      const [user] = this.props.users.filter(
        user => user.username === username
      );
      return (
        <Fragment>
          <User.Details user={user} />
          <Article.List articles={this.state.articles} />
          <h3>Comments</h3>
          {this.state.comments.map((comment, i) => {
            return <Comment.Card comment={comment} key={i} />;
          })}
        </Fragment>
      );
    }
  },

  Details: ({ user }) => {
    if (!user) return null;
    return <h1 className="my-3">{`${user.name}`}</h1>;
  }
};

export default User;
