import { Link } from 'react-router-dom';
import { useGlobalContext } from '../../RecipesContext';

import { Recipe } from '../../types';

import './RecipeList.scss';

interface RecipeListProps {
    recipes: Recipe[];
    category?: string;
}

export default function RecipeList({ recipes, category }: RecipeListProps) {
    const { userData } = useGlobalContext();

    if (recipes.length < 1) {
        return <h2 className="section-title">No recipes to display</h2>;
    }
    return (
        <section className="recipes-section">
            <h2 className="section-title">{category ? category : 'All Recipes'}</h2>
            <div className="recipes">
                {recipes.map((recipe: Recipe, index) => {
                    const { title, id, imageUrl, categories, totalTimeMinutes } = recipe;
                    return (
                        <article key={index} className="recipe-item">
                            <h4 className="item-title">{title}</h4>
                            <img src={imageUrl} alt={title} className="item-photo" />
                            <div className="item-info">
                                <div className="item-container">
                                    <h4 className="category">
                                        {categories.map((category, index) => {
                                            return (
                                                <Link
                                                    key={index}
                                                    to={`/category/${category.toLowerCase()}`}
                                                    className="category-link"
                                                >
                                                    {category}
                                                </Link>
                                            );
                                        })}
                                    </h4>
                                    <p className="text">Total time: {totalTimeMinutes} min</p>
                                </div>
                                <Link to={`/recipe/${id}`} className="btn btn-primary">
                                    read more
                                </Link>
                                {userData && userData.user.isAdmin && (
                                    <Link to="#" className="btn btn-primary">
                                        edit
                                    </Link>
                                )}
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}
