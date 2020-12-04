import React, {useState, useEffect} from 'react';
import './App.css';
import Recipe from './Recipe';

const App = () => {
  const APP_ID = 'f094bab6';
  const APP_KEY = '634ae845483475eb5b7749cd5e6a5941';

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState([]);
  const [query, setQuery] = useState('chicken');
  const [haveFetched, setHaveFetched] = useState(false);

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    setRecipes(data.hits);
    setHaveFetched(true);
  };

  const updateSearch = e => {
    setSearch(e.target.value);
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  };

  const DisplayRecipes = (props) => {
    if (recipes.length === 0 && haveFetched === true) {
      return (
        <p className="nothing-found">
          Sorry, nothing was found. 
          Try searching for something else.
        </p>
      )
    }
    return props.children;
  };

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input
          value={search} 
          onChange={updateSearch} 
          className="search-bar" 
          type="text"
        />
        <button className="search-button" type="submit">Search</button>
      </form>
      <DisplayRecipes>
        <div className="recipes">
          {recipes.map((recipe, i) => (
              <Recipe
                key={Date.now() + i}
                title={recipe.recipe.label}
                calories={recipe.recipe.calories}
                image={recipe.recipe.image}
                ingredients={recipe.recipe.ingredients}
            />
          ))}
        </div>
      </DisplayRecipes>  
    </div>
  );
};

export default App;
