import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
// import PT from "prop-types";
import moment from "moment";
import Vote from "./Vote";
import DeleteButton from "./DeleteButton";
import API from "./utils/API";
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

    postComment = (article_id, input, username) => {
      API.postComment(article_id, input, username).then(comment => {
        comment.created_by = { username };
        this.setState({
          comments: [comment, ...this.state.comments]
        });
      });
    };

    deleteComment = comment_id => {
      API.deleteComment(comment_id).then(
        this.setState({
          comments: this.state.comments.filter(
            comment => comment._id !== comment_id
          )
        })
      );
    };

    render() {
      return (
        <Fragment>
          <Comment.Input
            article_id={this.props.article_id}
            postComment={this.postComment}
          />
          {this.state.comments.map((comment, i) => {
            return (
              <Comment.Card
                key={i}
                comment={comment}
                deleteComment={this.deleteComment}
              />
            );
          })}
        </Fragment>
      );
    }

    static propTypes = {};
  },

  Input: class Input extends Component {
    state = {
      commentInput: ""
    };

    handleClick = e => {
      if (this.state.commentInput.length > 0) {
        this.props.postComment(
          this.props.article_id,
          this.state.commentInput,
          "northcoder" // hardcode default username for now
        );
        this.setState({
          commentInput: ""
        });
      }
    };

    handleChange = e => {
      this.setState({
        commentInput: e.target.value
      });
    };

    render() {
      return (
        <div className="row shadow p-3 my-3">
          <div className="col-2  d-flex align-items-center justify-content-center">
            <img
              className="img-fluid comment-avatar"
              src="https://avatars3.githubusercontent.com/u/6791502?v=3&s=200"
              alt=""
            />
          </div>
          <div className="col-10  d-flex align-items-center justify-content-between">
            <input
              type="text"
              height="100"
              placeholder="Write a response..."
              onChange={this.handleChange}
              value={this.state.commentInput}
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={this.handleClick}
            >
              Publish
            </button>
          </div>
        </div>
      );
    }
  },

  Card: ({ comment, deleteComment }) => {
    if (!comment) return null;
    return (
      <div className="row shadow p-3 my-3">
        <div className="col-2 d-flex flex-column justify-content-around align-items-center">
          <Vote voteObj={comment} type={"comments"} />
        </div>
        <div className="col-10">
          <div className="w-50 text-capitalize">
            <Link to={`/users/${comment.created_by.username}`}>{`${
              comment.created_by.username
            }`}</Link>
          </div>
          <div className="w-50 text-capitalize">
            <Link to={`/users/${comment.created_by.username}`}>
              {moment(comment.created_at).fromNow()}
            </Link>
          </div>
          <div className="w-100" />
          {`${comment.body}`}
        </div>
        {comment.created_by.username === "northcoder" && (
          <DeleteButton comment={comment} deleteComment={deleteComment} />
        )}
      </div>
    );
  }
};

export default Comment;
