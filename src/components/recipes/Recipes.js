import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { getInventory } from "../../actions/inventory";
import PropTypes from "prop-types";

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
    }, 50);

    setTimeout(() => {
      axios
        .get(
          `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${this.state.ingredients}&number=20`,
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
    }, 50);
  }

  renderRecipes = () => {
    return this.state.recipes.map(recipe => {
      return (
        <div key={recipe.id}>
          <h1>{recipe.title}</h1>
          <img src={recipe.image} alt="recipe-img" />
          <ul className="missed">
            <h4>You're missing:</h4>
            {recipe.missedIngredients.map(direction => (
              <li key={direction.id}>{direction.original}</li>
            ))}
          </ul>
        </div>
      );
    });
  };

  render() {
    return <div>{this.renderRecipes()}</div>;
  }
}

const mapStateToProps = state => ({
  inventory: state.inventory.inventory
});

export default connect(
  mapStateToProps,
  { getInventory }
)(Recipes);
