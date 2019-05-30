import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { ToastContainer, toast } from "react-toastify";
import { logout } from "../Login/actions";

class NavHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: true,
      anchorEl: null
    };
  }

  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const {
      isAuthenticated,
      user: { name, email },
      logout
    } = this.props;

    var styles = {
      appBar: {
        flexWrap: "wrap",
        backgroundColor: isAuthenticated ? "#00796b" : "#6B369B"
        // position: "fixed"
      },
      tabs: {
        // width: "100%",
        color: "inherit"
      }
    };

    return (
      <div>
        <AppBar
          showmenuiconbutton="false"
          style={styles.appBar}
          position="static"
        >
          <Tabs style={styles.tabs} textcolor="primary" centered>
            <Tab
              label="Home"
              to="/movies"
              component={Link}
              style={styles.tabs}
            />
            <Tab
              label="Cinemas"
              to="/cinemas"
              component={Link}
              style={styles.tabs}
            />
            <Tab
              label="Movies"
              to="/movies"
              component={Link}
              style={styles.tabs}
            />
            <Tab
              label="Contact"
              to="/contact"
              component={Link}
              style={styles.tabs}
            />
            <Tab label="Help" to="/help" component={Link} style={styles.tabs} />
            {!isAuthenticated && (
              <Tab
                label="Register"
                to="/register"
                component={Link}
                style={styles.tabs}
              />
            )}

            {!isAuthenticated && (
              <Tab
                label="Login"
                to="/login"
                component={Link}
                style={styles.tabs}
              />
            )}

            {isAuthenticated && (
              <div>
                <IconButton
                  aria-owns={
                    Boolean(this.state.anchorEl) ? "menu-appbar" : null
                  }
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <span
                    style={{
                      fontSize: "0.8125rem"
                    }}
                  >
                    Welcome, {name} &nbsp;
                  </span>

                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={this.state.anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  open={Boolean(this.state.anchorEl)}
                  onClose={this.handleClose}
                >
                  <Link to="/profile">
                    <MenuItem onClick={this.handleClose}>My profile</MenuItem>
                  </Link>
                  {/* <Link to="/my-tickets">
                    <MenuItem onClick={this.handleClose}>My tickets</MenuItem>
                  </Link> */}
                  {/* <Link to="/change-password">
                    {" "}
                    <MenuItem onClick={this.handleClose}>
                      Change passsword
                    </MenuItem>
                  </Link> */}
                  <MenuItem
                    onClick={() => {
                      logout();
                      this.handleClose();
                      toast.success("User Logged Out", {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true
                      });
                    }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </div>
            )}
          </Tabs>
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavHeader);
