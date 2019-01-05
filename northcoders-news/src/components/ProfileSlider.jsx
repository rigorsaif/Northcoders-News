import {
  Button,
  Dialog,
  ListItemText,
  ListItem,
  List,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide,
  Grid,
  Avatar,
  Paper,
  ListSubheader
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import "bootstrap/dist/css/bootstrap.css";
import * as api from "../api/utils";
import { Link } from "@reach/router";
const styles = theme => ({
  appBar: {
    position: "relative"
  },
  flex: {
    flex: 1
  },
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  root2: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    maxHeight: 500
  },
  listSection: {
    backgroundColor: "inherit"
  },
  ul: {
    backgroundColor: "inherit",
    padding: 0,
    width: "100%"
  }
});

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class FullScreenDialog extends React.Component {
  state = {
    close: false,
    articles: [],
    comments: []
  };

  handleClose = () => {
    const { handleClickOpen } = this.props;
    handleClickOpen();
  };

  render() {
    const { classes, signOut, user } = this.props;
    return <div>
        <Dialog fullScreen open={this.props.open} onClose={this.handleClose} TransitionComponent={Transition}>
          <AppBar className={classes.appBar} style={{ background: "#1B2737", boxShadow: "none", border: "yellow" }}>
            <Toolbar>
              <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.flex}>
                Close
              </Typography>
              <Avatar alt="user" src={user.avatar_url} className={classes.avatar} />
              <Button color="inherit" onClick={signOut}>
                SignOut
              </Button>
            </Toolbar>
          </AppBar>
          <div style={{ border: "10 black solid", height: 10 }}>
          </div>
          <div className={classes.root}>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <img src={user.avatar_url} width="200" height="200" alt="jsj" />
                  <br />
                  <button onClick={() => alert("Will Add the functionality later")} className="btn btn-outline-primary m-2">
                    Change Picture
                  </button>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper className={classes.paper}>
                  <List className={classes.root2} subheader={<li />}>
                    {[0].map(sectionId => (
                      <li
                        key={`section-${sectionId}`}
                        className={classes.listSection}
                      >
                        <ul className={classes.ul}>
                          <ListSubheader>Articles</ListSubheader>
                          {this.state.articles.length &&
                            this.state.articles.map(article => (
                              <Paper
                                key={`${article._id}`}
                                className={classes.paper}
                              >
                                <ListItem>
                                  <Button className={classes.ul}>
                                    <Link
                                      to={`/articles/${
                                        article.belongs_to
                                      }/${article._id}`}
                                    >
                                      <ListItemText
                                        primary={article.title.toLowerCase()}
                                        onClick={this.handleClose}
                                      />
                                    </Link>
                                  </Button>
                                </ListItem>
                              </Paper>
                            ))}
                        </ul>
                      </li>
                    ))}
                  </List>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper className={classes.paper}>
                  <List className={classes.root2} subheader={<li />}>
                    {[0].map(sectionId => (
                      <li
                        key={`section-${sectionId}`}
                        className={classes.listSection}
                      >
                        <ul className={classes.ul}>
                          <ListSubheader>Activity</ListSubheader>
                          {this.state.comments.length &&
                            this.state.comments.map(comment => (
                              <Paper
                                key={`item-${sectionId}-${comment._id}`}
                              >
                                <ListItem>
                                  <Grid container>
                                    <Typography>Commented on:</Typography>
                                    <Link
                                      to={`/articles/${
                                        comment.belongs_to.belongs_to
                                      }/${comment.belongs_to._id}`}
                                    >
                                      <br />
                                      <ListItemText
                                        className={classes.ul}
                                        primary={comment.belongs_to.title}
                                        onClick={this.handleClose}
                                      />
                                    </Link>
                                  </Grid>
                                </ListItem>
                              </Paper>
                            ))}
                        </ul>
                      </li>
                    ))}
                  </List>
                </Paper>
              </Grid>
            </Grid>
          </div>
        </Dialog>
      </div>;
  }
  componentDidMount() {
    this.fetchUserArticles();
    this.fetchUserComments();
  }
  fetchUserArticles = () => {
    const { user } = this.props;
    api.getUserArticles(user._id).then(articles => {
      this.setState({ articles });
    });
  };

  fetchUserComments = () => {
    const { user } = this.props;
    api.getUserComments(user._id).then(comments => {
      this.setState({ comments });
    });
  };
}

FullScreenDialog.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FullScreenDialog);
