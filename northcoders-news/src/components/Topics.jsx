import React, { Component } from "react";
import { Link } from "@reach/router";
import * as api from "../api/utils";
import { IconButton, Typography, MenuItem} from "@material-ui/core/";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = theme => ({
  Topic: {
    marginTop: 14,
    color: "inherit"
  },
  progress: {
    margin: theme.spacing.unit * 2
  }
});
class Topics extends Component {
  state = {
    topics: null
  };
  render() {
    const { topics } = this.state;
    const { classes } = this.props;

    return topics ? (
      <>
        {topics.map(topic => {
          return (
            <MenuItem className={classes.Topic} key={topic._id}>
              <Link to={`/articles/${topic.slug}`} key={topic._id}>
                <IconButton color="inherit">
                  <Typography  color="inherit">
                    {topic.slug.toUpperCase()}
                  </Typography>
                </IconButton>
              </Link>
            </MenuItem>
          );
        })}
      </>
    ) : (
      <CircularProgress className={classes.progress} color="secondary" />
    );
  }
  componentDidMount() {
    this.fetchTopics();
  }
  fetchTopics = () => {
    api.getAllTopics().then(topics => {
      this.setState({
        topics
      });
    });
  };
}

export default withStyles(styles)(Topics);
