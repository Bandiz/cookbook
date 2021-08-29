import Search from "../../components/Shared/Search";
import RecipeList from "../../components/RecipeList";
import "./Recipes.scss";

export default function Recipes() {
  return (
    <div className="recipes-page">
      <Search />
      <RecipeList />
    </div>
  );
}
