import axios from "axios";

export const getRecipe = items => {
  if (items.length > 1) {
  } else {
    let str = "";
    for (let i = 0; i < items.length; i++) {
      str.concat(items[i]);
    }
    console.log(str);
    // axios
    // .get("https://api.spoonacular.com/recipes/findByIngredients?ingredients=",

    // )
    // .then(res => {

    // })
    // .catch(err =>
    //   console.log(err)
    // );
  }
};
