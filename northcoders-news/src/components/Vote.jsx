import React, { Component } from "react";
import * as api from "../api/utils";
class Vote extends Component {
  state = {
    voteChange: 0,
    voted: false
  };
  render() {
    let { voteChange } = this.state;
    return <div>
      <p className="btn btn-outline-warning m-2" disabled>
          {this.props.votes + voteChange}
        </p>
        <button
          onClick={() =>
            voteChange === 0
              ? this.handleVote("up")
              : voteChange === 1
              ? this.handleVote("down")
              : false
          }
        className={voteChange === 0
          ? "btn btn-outline-primary" : "btn btn-outline-danger"}
        >
          {voteChange ? "Dislike" : "Like"}
        </button>
      </div>;
  }

  handleVote = vote => {
    const { section, id } = this.props;
    api.patchVotes(section, id, vote).catch(err => {
      this.setState({
        voteChange: 0,
        voted: true
      });
    });
    this.setState({
      voteChange:
        vote === "up" ? this.state.voteChange + 1 : this.state.voteChange - 1
    });
  };
}

export default Vote;
