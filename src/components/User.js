import React, { Component } from "react";
// import PT from "prop-types";
import { Route } from "react-router-dom";

const User = {
  Container: class Container extends Component {
    state = {
      users: []
    };
    render() {
      const { match } = this.props;
      return (
        <main className="container">
          <Route
            exact
            path={`${match.url}`}
            render={props => <User.List {...props} />}
          />
        </main>
      );
    }
  },
  List: () => <User.Card />,
  Card: props => (
    <div class="col-12 col-lg-6 shadow my-3 p-3 d-flex">
      <img src="" alt="Profile" />
      <p class="card-text">Username</p>
    </div>
  )
};

export default User;
