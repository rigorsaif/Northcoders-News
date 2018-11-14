import React, { Component } from "react";
class Profile extends Component {
  state = {};
  render() {
    const { signOut, user } = this.props;
    return (
      <div>
        <button onClick={signOut}>Sign Out</button>
      </div>
    );
  }
}

export default Profile;
