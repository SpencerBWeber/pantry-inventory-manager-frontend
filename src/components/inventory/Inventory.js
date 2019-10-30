import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getInventory, deleteItem } from "../../actions/inventory";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

export class Inventory extends Component {
  static propTypes = {
    inventory: PropTypes.array.isRequired,
    getInventory: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getInventory();
  }

  render() {
    return (
      <Fragment>
        <h2>My Pantry</h2>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th />
              <th>Name</th>
              <th>Count</th>
            </tr>
          </thead>

          <tbody>
            {this.props.inventory.map(item => (
              <tr key={item.id}>
                <td>
                  <button
                    onClick={this.props.deleteItem.bind(this, item.id)}
                    className="btn btn-sm btn-danger"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                  <button>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                </td>
                <td>{item.name}</td>
                <td>{item.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  inventory: state.inventory.inventory
});

export default connect(
  mapStateToProps,
  { getInventory, deleteItem }
)(Inventory);
