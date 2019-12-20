import React, { useEffect, useState } from "react";
import Recipe from "../Recipe/Recipe";
import "./RecipeSearch.scss";

const RecipeSearch = () => {
  const APP_ID = "22f855df";
  const APP_KEY = "f65e4ae1a956bf7d1699647228e12f13";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };

  const updateSearch = e => {
    setSearch(e.target.value);
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  return (
    <>
      <div className="form">
        <form onSubmit={getSearch}>
          <input
            placeholder="What food you want to make today!!"
            className="form__input"
            type="text"
            value={search}
            onChange={updateSearch}
          ></input>
          <button className="form__bstn" type="button">
            Search
          </button>
        </form>
      </div>
      <div className="recipes">
        {recipes.map(recipe => (
          <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </>
  );
};

export default RecipeSearch;
