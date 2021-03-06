import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import { connect } from "react-redux";
import * as actionCreators from "../../../../src/store/actions/";
class logIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      erremail: "",
      password: "",
      errpassword: "",
      loginflag: false,
      loginType: "manual",
      firstname: "",
      lastname: "",
      logo: "",
      token: "",
      isToken: localStorage.getItem("urbandtoken") ? true : false
    };
    // this.goBack = this.goBack.bind(this)
  }

  handleChange(state, errState, evt) {
    let _state = this.state;
    _state[state] = evt.target.value;
    _state[errState] = "";
    this.setState({
      ..._state
    });
  }

  gotoLogin = () => {
    const { email, password } = this.state;
    let flag = 0;
    if (email.length < 1) {
      flag = 1;
      this.setState({
        erremail: "Please enter email address"
      });
    } else if (
      !new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(email)
    ) {
      flag = 1;
      this.setState({ erremail: "Please enter valid email address" });
    }

    if (password.length < 1) {
      flag = 1;
      this.setState({
        errpassword: "Please enter password"
      });
    }

    if (flag === 0) {
      this.props
        .login(this.state)
        .then(() => {
          this.setState({
            isToken: true
          });
          if (this.props.isLoggedIn) {
            if (this.props.location.state && this.props.location.state.from) {
              window.location.href = this.props.location.state.from;
            } else {
              window.location.href = "/";
            }
          }
        })
        .catch(error => {
          if (error.error === "Unauthorised") {
            this.setState({
              errpassword: "Invalid credential check username or passsord"
            });
          }
        });
    }
  };

  responseFacebook = response => {
    var res = response;
    if (res.email) {
      this.setState({
        loginType: "facebook",
        email: res.email ? res.email : "",
        firstname: res.name ? res.name : "",
        lastname: res.name ? res.name : "",
        logo: res.picture ? res.picture.data.url : "",
        token: ""
      });
      this.props
        .login(this.state)
        .then(() => {
          this.setState({
            isToken: true
          });
          if (this.props.isLoggedIn) {
            if (this.props.location.state && this.props.location.state.from) {
              window.location.href = this.props.location.state.from;
            } else {
              window.location.href = "/";
            }
          }
        })
        .catch(error => {
          if (error.error === "Unauthorised") {
            this.setState({
              errpassword: "Sign in with facebook failed"
            });
          }
        });
    }
  };

  responseGoogle = response => {
    var res = response.profileObj;
    if (res && res.email) {
      this.setState({
        loginType: "gmail",
        email: res.email ? res.email : "",
        firstname: res.givenName ? res.givenName : "",
        lastname: res.familyName ? res.familyName : "",
        logo: res.imageUrl ? res.imageUrl : "",
        token: ""
      });
      this.props
        .login(this.state)
        .then(() => {
          this.setState({
            isToken: true
          });
          if (this.props.isLoggedIn) {
            if (this.props.location.state && this.props.location.state.from) {
              window.location.href = this.props.location.state.from;
            } else {
              window.location.href = "/";
            }
          }
        })
        .catch(error => {
          if (error.error === "Unauthorised") {
            this.setState({
              errpassword: "Sign in with gmail failed"
            });
          }
        });
    }
  };

  render() {
    return (
      <div>
        <section className="header-padd">
          <div className="container">
            <div className="row">
              <div className="col-md-5 col-sm-4 mx-auto hero-acct-wrap">
                <div className="user-content">
                  <div className="mb-7">
                    <h2 className="account-head mb-0">LOG IN</h2>
                    <p className="sec-txt">Login to manage your account.</p>
                  </div>
                  <div className="row">
                    <div className="col-md-12 mb-3">
                      <div className="form-group">
                        <input
                          name="email"
                          value={this.state.email}
                          onChange={this.handleChange.bind(
                            this,
                            "email",
                            "erremail"
                          )}
                          title="Please enter your Email"
                          className="form-control field-control email"
                          placeholder="Email"
                        />
                      </div>
                      {this.state.erremail && (
                        <div class="text-danger">{this.state.erremail}</div>
                      )}
                    </div>
                    <div className="col-md-12 mb-2">
                      <div className="form-group">
                        <input
                          type="password"
                          className="form-control field-control password"
                          name="password"
                          value={this.state.password}
                          onChange={this.handleChange.bind(
                            this,
                            "password",
                            "errpassword"
                          )}
                          title="Please enter your Password"
                          placeholder="Password"
                        />
                      </div>
                      {this.state.errpassword && (
                        <div class="text-danger">{this.state.errpassword}</div>
                      )}
                    </div>
                    <div className="col-md-12 text-right">
                      {/*<div className="forgot-pass">Forgot Password ?</div>*/}
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-md-6">
                      <p className="dont-u">
                        Don’t have an account?{" "}
                        <Link to="/register">Sign up here</Link>
                      </p>
                    </div>
                    <div className="col-md-6">
                      <button
                        className="btn"
                        type="submit"
                        onClick={this.gotoLogin}
                      >
                        Log In
                      </button>
                    </div>
                  </div>
                  <div className="row mt-5 justify-content-between">
                    <div className="social-btn-wrap">
                      <div className="social-btn">
                        <GoogleLogin
                          clientId="46552750327-g8vrae58sm2ti880u9vv88j2na7efsgu.apps.googleusercontent.com"
                          buttonText="LOGIN WITH GOOGLE"
                          onSuccess={this.responseGoogle}
                          onFailure={this.responseGoogle}
                          cookiePolicy={"single_host_origin"}
                        />
                      </div>
                    </div>
                    <div className="social-btn-wrap">
                      <div className="social-btn">
                        <FacebookLogin
                          appId="487607155274158" //APP ID NOT CREATED YET
                          fields="name,email,picture"
                          callback={this.responseFacebook}
                          icon="fa-facebook"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.login.isLoggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: state => dispatch(actionCreators.login(state))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(logIn);
