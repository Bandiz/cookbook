import Loading from "../Shared/Loading";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context";
import "./RecipeList.scss";

export default function RecipeList() {
  const { recipes, loading } = useGlobalContext();

  if (loading) {
    return <Loading />;
  }
  if (recipes.length < 1) {
    return (
      <h2 className="section-title">no recipes matched your search criteria</h2>
    );
  }
  return (
    <section className="recipes-section">
      <h2 className="section-title">Recipes</h2>
      <div className="recipes">
        {recipes.map((recipe: any) => {
          const { title, id, imageUrl, categories, totalTimeMinutes } = recipe;
          return (
            <article key={id} className="recipe-item">
              <h4 className="item-title">{title}</h4>
              <img src={imageUrl} alt={title} className="item-photo" />
              <div className="item-info">
                <div className="item-container">
                  <h4 className="category">
                    {categories.map((category: any, index: number) => {
                      return (
                        <Link
                          key={index}
                          to={`/category/${category}`}
                          className="category-link"
                        >
                          {category}
                        </Link>
                      );
                    })}
                  </h4>
                  <p className="text">Total time: {totalTimeMinutes}</p>
                </div>
                <Link to={`/recipe/${id}`} className="btn btn-primary">
                  read more
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
