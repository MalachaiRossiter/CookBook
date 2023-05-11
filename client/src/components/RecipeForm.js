import { useState, useEffect} from 'react';

import '../styles/RecipeForm.css';

const RecipeForm = (props) => {
    const [formData, setFormData] = useState({
        id: '',
        title: '',
        description: '',
        ingredients: '',
        instructions: '',
    });

    useEffect(() => {
        if (props) {
            setFormData();
        }
    }, [props]);

    return(
        <div className='row'>
            <div className='container1-2 background'>

            </div>
            <div className='container1-2'>
                
            </div>
        </div>
    )
}
export default RecipeForm;