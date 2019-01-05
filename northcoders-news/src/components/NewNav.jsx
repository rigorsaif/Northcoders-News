import React from "react";
import PropTypes from "prop-types";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  MenuItem,
  Menu,
  Avatar
} from "@material-ui/core/";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { withStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import MoreIcon from "@material-ui/icons/MoreVert";
import { Link } from "@reach/router";
import FullScreenDialog from "./ProfileSlider";
import Topics from "./Topics";

const styles = theme => ({
  root: {
    width: "100%"
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit * 3,
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  bigAvatar: {
    marginLeft: 5,
    width: 50,
    height: 50
  },
  homeIcon: {
    width: 30,
    height: 30
  }
});

class PrimarySearchAppBar extends React.Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
    open: false
  };

  handleClickOpen = () => {
    const { open } = this.state;
    this.setState({ open: !open });
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  render() {
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMobileMenuOpen}
        onClose={this.handleMobileMenuClose}
      >
        <MenuItem>
          <IconButton
            aria-owns={isMenuOpen ? "material-appbar" : undefined}
            aria-haspopup="true"
            onClick={this.handleClickOpen}
            color="inherit"
          >
            <Typography color="inherit">
              {this.props.user.name.toUpperCase()}
            </Typography>
            <Avatar
              alt="user"
              src={this.props.user.avatar_url}
              className={classes.bigAvatar}
            />
          </IconButton>
        </MenuItem>
        <Topics />
      </Menu>
    );

    return (
      <div className={classes.root}>
        <AppBar
          position="static"
          style={{ background: "rgba(0, 0, 0, 0.5)", boxShadow: "none" }}
        >
          <Toolbar>
            <Link to="/">
              <IconButton color="inherit">
                <img
                  src="https://i.imgur.com/JO46Eiu.png"
                  alt="logo"
                  height="40px"
                  width="120px"
                  style={{ marginLeft: "-20px" }}
                />
              </IconButton>
            </Link>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <form
                onSubmit={event => {
                  event.preventDefault();
                  alert("functionality will be added later");
                }}
              >
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                  }}
                />
              </form>
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <FullScreenDialog
                handleClickOpen={this.handleClickOpen}
                user={this.props.user}
                open={this.state.open}
                signOut={this.props.signOut}
              />
              <Topics />
              <IconButton
                aria-owns={isMenuOpen ? "material-appbar" : undefined}
                aria-haspopup="true"
                onClick={this.handleClickOpen}
                color="inherit"
              >
                <Typography color="inherit">
                  {this.props.user.name.toUpperCase()}
                </Typography>
                <Avatar
                  alt="user"
                  src={this.props.user.avatar_url}
                  className={classes.bigAvatar}
                />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-haspopup="true"
                onClick={this.handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
      </div>
    );
  }
}

PrimarySearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PrimarySearchAppBar);
