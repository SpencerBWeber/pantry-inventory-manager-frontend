import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addItem } from "../../actions/inventory";

class Form extends Component {
  state = {
    name: "",
    count: ""
  };

  static propTypes = {
    addItem: PropTypes.func.isRequired
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { name, count } = this.state;
    const item = { name, count };
    this.props.addItem(item);
    this.setState({
      name: "",
      count: ""
    });
  };

  render() {
    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Add Pantry Item</h2>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              className="form-control"
              type="text"
              name="name"
              onChange={this.onChange}
              value={this.state.name}
            />
          </div>
          <div className="form-group">
            <label>Count</label>
            <input
              className="form-control"
              type="text"
              name="count"
              onChange={this.onChange}
              value={this.state.count}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn=primary">
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(
  null,
  { addItem }
)(Form);
