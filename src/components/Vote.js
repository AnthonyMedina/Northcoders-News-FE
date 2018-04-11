import React, { Component } from "react";
// import PT from 'prop-types';
import API from "./utils/API";
import "./Vote.css";

class Vote extends Component {
  state = {
    voted: "",
    votes: this.props.voteObj.votes
  };

  changeVote = vote => {
    if (this.state.voted !== "") return null;
    if (vote === "up") {
      this.setState({
        voted: vote,
        votes: this.state.votes + 1
      });
      API.vote(this.props.type, this.props.voteObj._id, vote).catch(
        console.log
      );
    } else if (vote === "down") {
      this.setState({
        voted: vote,
        votes: this.state.votes - 1
      });
      API.vote(this.props.type, this.props.voteObj._id, vote).catch(
        console.log
      );
    }
  };

  clickHandler = e => {
    const vote = e.target.id;
    this.changeVote(vote);
  };

  render() {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center">
        <button
          type="button"
          className={`btn btn-light ${
            this.state.voted === "up" ? "upvoted" : ""
          }`}
          onClick={this.clickHandler}
          id="up"
        >
          <i className="fas fa-chevron-up" />
        </button>
        <h6>{`${this.state.votes}`}</h6>
        <button
          type="button"
          className={`btn btn-light ${
            this.state.voted === "down" ? "upvoted" : ""
          }`}
          onClick={e => this.clickHandler(e)}
          id="down"
        >
          <i className="fas fa-chevron-down" />
        </button>
      </div>
    );
  }
}

export default Vote;
