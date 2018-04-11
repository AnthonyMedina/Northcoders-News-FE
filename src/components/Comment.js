import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
// import PT from "prop-types";
import Vote from "./Vote";
import API from "./utils/API";
import Icon from "./utils/Icon";
import "./Comment.css";

const Comment = {
  Container: class Container extends Component {
    state = {
      comments: []
    };
    componentDidMount() {
      API.fetchComments(this.props.article_id).then(comments => {
        this.setState({ comments });
      });
    }
    render() {
      return (
        <Fragment>
          <Comment.Input />
          {this.state.comments.map((comment, i) => {
            return <Comment.Card key={i} comment={comment} />;
          })}
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
  Card: ({ comment }) => {
    if (!comment) return null;
    return (
      <div className="row shadow p-3 my-3">
        <div className="col-2 d-flex flex-column justify-content-around align-items-center">
          <Vote voteObj={comment} type={"comments"} />
        </div>
        <div className="col-10">
          <div className="w-100 text-capitalize">
            <Link to={`/users/${comment.created_by}`}>{`${
              comment.created_by
            }`}</Link>
          </div>
          <div className="w-100" />
          {`${comment.body}`}
        </div>
      </div>
    );
  }
};

export default Comment;
