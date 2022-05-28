import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import recipesData from '../Recipes/RecipesData.json';
import './Home.scss';

function Home() {
    const [index, setIndex] = useState(0);
    const { _id, title, image, categories } = recipesData[index];

    const checkNumber = (number: number) => {
        if (number > recipesData.length - 1) {
            return 0;
        }
        if (number < 0) {
            return recipesData.length - 1;
        }
        return number;
    };
    const nextRecipe = () => {
        setIndex((index) => {
            let newIndex = index + 1;
            return checkNumber(newIndex);
        });
    };
    const prevRecipe = () => {
        setIndex((index) => {
            let newIndex = index - 1;
            return checkNumber(newIndex);
        });
    };
    // TEMPORARY COMMENTED
    //
    // useEffect(() => {
    //   let slider = setInterval(() => {
    //     setIndex((index) => {
    //       let newIndex = index + 1;
    //       return checkNumber(newIndex);
    //     });
    //   }, 5000);
    //   return () => clearInterval(slider);
    // }, [index]);

    return (
        <div>
            <section className="slider">
                <div className="img-container">
                    <Link to={`/recipe/${_id}`}>
                        <img src={image} alt={title} className="recipe-img" />
                    </Link>
                    <div className="slider-center">
                        <h4 className="title">{title}</h4>
                        <Link to={`/category/${categories}`}>
                            <p className="category">{categories}</p>
                        </Link>
                        <Link to={`/recipe/${_id}`} className="btn btn-primary">
                            read more
                        </Link>
                    </div>
                    <div className="button-container">
                        <button className="prev" onClick={prevRecipe}>
                            <FiChevronLeft />
                        </button>
                        <button className="next" onClick={nextRecipe}>
                            <FiChevronRight />
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;
