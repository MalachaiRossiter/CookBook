import axios from 'axios';
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';
const Login = (props) => {

    const {setLoggedIn} = props;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors,] = useState([]);

    const navigate = useNavigate();

    const onSubmitHandler = (e) => {
        //Takes login cridentials and sends axios call to login, returns to dashboard if sucessful. Prints errors if not
        e.preventDefault();
        const loginDetails = ({email, password})
        console.log(loginDetails);
        axios.post('http://localhost:8000/api/user/login', loginDetails, {withCredentials: true})
        .then(res => {
            console.log(res);
            setLoggedIn(true);
            navigate('/');
        })
        .catch(err => {
            const errorResponse = err.response.data.errors;
            console.log(errorResponse);
            const errorArr = [];
            for (const key of Object.keys(errorResponse)){
                errorArr.push(errorResponse[key].message)
            }
            console.log(errors);
        })
    }

    return(
        <div className='container'>
            <div className='row'>
                <div className='column1-4'>
                    <div className='form-container'>
                        <form onSubmit={onSubmitHandler}>
                            <div className='form-container'>
                                {errors.map((err, index) => <p key={index} className="error">{err}</p>)}
                                <input type='text' onChange={(e) => setEmail(e.target.value)} className='form-input'/>
                                <input type='text' onChange={(e) => setPassword(e.target.value)} className='form-input'/>
                                <input type="submit" className='submit-btn' value={'Get Cookin!'}/>
                            </div>
                        </form>
                    </div>
                </div>
                <div className='column3-4'>
                    <div>Banana</div>
                </div>
            </div>
        </div>
    )
}
export default Login;