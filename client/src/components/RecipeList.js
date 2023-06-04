import {Link} from 'react-router-dom';
import recipeList from '../styles/recipeList.css';

const RecipeList = (props) => {

    const {recipeList} = props;

    return (
        <div className='recipes-container'>
        {recipeList && recipeList.map((recipe, index) => (
            <div key={index} className='recipe-card'>
                <Link to={`/recipe/${recipe.id}`} className='recipe-link'>
                    <img className='card-image' src={recipe.image} alt='Recipe' />
                    <div className='card-text-container'>
                        <h2>{recipe.title}</h2>
                        <p>{recipe.description}</p>
                        <p>{recipe.user.username}</p>
                    </div>
                </Link>
            </div>
        ))}
    </div>
    )
}
export default RecipeList;