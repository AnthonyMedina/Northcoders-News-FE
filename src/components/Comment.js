import React, { Component, Fragment } from "react";
// import PT from "prop-types";
import "./Comment.css";
import Icon from "./utils/Icon";

const Comment = {
  Container: class Container extends Component {
    render() {
      return (
        <Fragment>
          <Comment.Card />
          <Comment.Input />
        </Fragment>
      );
    }

    static propTypes = {};
  },
  Input: props => {
    return (
      <div className="row shadow p-3 my-3">
        <div className="col-2  d-flex align-items-center justify-content-center">
          Avatar
        </div>
        <div className="col-10  d-flex align-items-center justify-content-between">
          <input type="text" height="100" placeholder="Write a response..." />
          <button type="button" className="btn btn-outline-secondary">
            Publish
          </button>
        </div>
      </div>
    );
  },
  Card: props => {
    return (
      <div className="row shadow p-3 my-3">
        <div className="col-2 d-flex flex-column justify-content-around align-items-center">
          <Icon.upVote />
          Votes
          <Icon.downVote />
        </div>
        <div className="col-10">
          <div className="w-100">Avatar badge and User name</div>
          <div className="w-100" />
          Comment body....
        </div>
      </div>
    );
  }
};

export default Comment;
