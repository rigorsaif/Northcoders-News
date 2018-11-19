import React, { Component } from "react";
import "./style/Profile.css";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.css";

class Profile extends Component {
  state = {
    profile: false
  };
  render() {
    const { signOut, user } = this.props;
    return (
      <div className="profile">
        <button
          onClick={this.toggleProfile}
          className="btn btn-outline-primary"
        >
          {user.username.toUpperCase()}
        </button>
        <button onClick={signOut} className="btn btn-outline-danger">
          Sign Out
        </button>
        {this.state.profile && (
          <div className="profileContent">
            <img src={user.avatar_url} alt="profile" className="profile" />
            <h4>
              <span className="name">Name: </span> {user.name}
            </h4>
            <h4>
              <span className="username">Username: </span>
              {user.username}
            </h4>
          </div>
        )}
      </div>
    );
  }
  toggleProfile = () => {
    this.setState({
      profile: !this.state.profile
    });
  };
}
Profile.propTypes = {
  user: PropTypes.object,
  signOut: PropTypes.func.isRequired
};
export default Profile;
