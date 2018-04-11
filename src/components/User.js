import React, { Component } from "react";
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
    render() {
      const { username } = this.props.match.params;
      const [user] = this.props.users.filter(
        user => user.username === username
      );
      return (
        <div className="w-75 mx-auto p-3">
          <User.Details user={user} />
          {/* <Article.List /> */}
          {/* <Comment.List /> */}
        </div>
      );
    }
  },

  Details: ({ user }) => {
    if (!user) return null;
    return <h1>{`${user.name}`}</h1>;
  }
};

export default User;
