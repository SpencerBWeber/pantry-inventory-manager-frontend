import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { getInventory } from "../../actions/inventory";
import PropTypes from "prop-types";
import { Dot } from "react-animated-dots";

class Recipes extends Component {
  constructor() {
    super();
    this.state = {
      ingredients: "",
      recipes: []
    };
  }

  static propTypes = {
    inventory: PropTypes.array.isRequired,
    getInventory: PropTypes.func.isRequired
  };

  componentDidMount() {
    let API_KEY = `${process.env.REACT_APP_API_KEY}`;
    this.props.getInventory();
    setTimeout(() => {
      this.props.inventory.map(item => {
        this.setState({
          ingredients: this.state.ingredients.concat(item.name, ",")
        });
      });
    }, 1000);

    setTimeout(() => {
      axios
        .get(
          `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${this.state.ingredients}&number=99`,
          {
            params: {
              apiKey: API_KEY,
              "Content-Type": "application/json"
            }
          }
        )
        .then(res => {
          this.setState({ recipes: res.data });
        })
        .catch(err => {
          console.log("get recipe error", err);
        });
    }, 1000);
  }

  renderRecipes = () => {
    return this.state.recipes.map(recipe => {
      return (
        <div
          key={recipe.id}
          className="card border-light mb-3"
          style={{ maxWidth: "22rem" }}
        >
          <div className="card-header">{recipe.title}</div>
          <div className="card-body">
            <img
              src={recipe.image}
              alt="recipe-img"
              style={{ maxWidth: "22rem" }}
            />
            <ul className="missed">
              <h4 className="card-title">You're missing:</h4>
              {recipe.missedIngredients.map(direction => (
                <li key={direction.id} className="card-text">
                  {direction.original}
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    });
  };

  render() {
    return (
      <div className="row" id="top">
        {this.state.recipes.length < 1 ? (
          <div className="d-inline-flex p-2">
            <h1 className="pl-2">
              Loading<Dot>.</Dot>
              <Dot>.</Dot>
              <Dot>.</Dot>
            </h1>
          </div>
        ) : (
          this.renderRecipes()
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  inventory: state.inventory.inventory
});

export default connect(
  mapStateToProps,
  { getInventory }
)(Recipes);
