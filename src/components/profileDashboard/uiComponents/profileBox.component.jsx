import React, { Component } from "react";

import { connect } from "react-redux";
import * as actionCreators from "../../../../src/store/actions/";

class ProfileBox extends Component {

  constructor(props) {
    super(props)
    const { name, email} = props.user;
    this.state = {
      name: name,
      nameErr: "",
      email: email,
      password: "",
      confirmpassword: "",
      passwordErr: "",
      formSucess: ""
    }
  }

  componentDidMount() {
    this.props.getuser();
  }


  handleChange(state, errState, evt) {
    let _state = this.state
    _state[state] = evt.target.value;
    _state[errState] = '';
    this.setState({
      ..._state
    })
  }

  gotoSave = () => {
    const { name, email, password, confirmpassword } = this.state;
    let flag = 0;

    if (name.length < 1) {
      flag = 1;
      this.setState({
        nameErr: 'Please enter firstname'
      })
    }

    if (email.length < 1) {
      flag = 1;
      this.setState({
        errEmail: 'Please enter email'
      })
    }else if (!new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(email)) {
      flag = 1;
      this.setState({ errEmail: 'Please enter valid email address' });
    }

    if (password.length > 1) {
      if (password != confirmpassword) {
        flag = 1;
        this.setState({ errEmail: 'Please confirm password' });
      }
    }

    if (flag == 0) {
      this.props.edituser(this.state)
      .then(() => {
        this.setState({
          formSucess: 'Sucessfully updated'
        })
      })
      .catch((error) => {
          this.setState({
            errpassword: 'Error in registration. try again'
          })
      })
    }
    
  }

  render() {
    console.log(this.state);
    const { name, email } = this.state;
    const userData = this.props.user;
    return (
      <div>
        <div className="AddNewBox101">
          <div>
            <form className="mt-4">
              <div className="row">
                <div className="col-md-4">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control field-control"
                      placeholder={userData.name}
                      value={name}
                      onChange={this.handleChange.bind(this, 'name', 'nameErr')}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control field-control"
                      placeholder={userData.email}
                      value={email}
                      onChange={this.handleChange.bind(this, 'email', 'emailErr')}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control field-control"
                      placeholder="Password"
                      value={email}
                      onChange={this.handleChange.bind(this, 'password', 'passwordErr')}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control field-control"
                      placeholder="Repeate Password"
                      value={email}
                      onChange={this.handleChange.bind(this, 'confirmpassword', 'passwordErr')}
                    />
                  </div>
                </div>

              </div>
              <div>
                <button
                  type="submit"
                  className="tim-btn mt-4 ticket-btn-lg place-order"
                  onClick={this.gotoSave}
                >
                  Save
                      </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

}

const mapDispatchToProps = dispatch => {
  return {
    getuser: () => dispatch(actionCreators.getuser()),
    edituser: (value) => dispatch(actionCreators.edituser(value))
  };
};

const mapStateToProps = state => {
  return {
    user: state.user.user
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileBox);