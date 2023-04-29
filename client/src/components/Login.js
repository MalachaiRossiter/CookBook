import axios from 'axios';
import React, {useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';
const Login = (props) => {

    const {loggedIn, setLoggedIn} = props;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

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
        <div>
            <form onSubmit={onSubmitHandler}>
            {errors.map((err, index) => <p key={index} className="error">{err}</p>)}
            <label>Email</label>
            <input type='text' onChange={(e) => setEmail(e.target.value)}/>
            <label>Password</label>
            <input type='text' onChange={(e) => setPassword(e.target.value)}/>
            <input type="submit" className='submit-btn'/>
            </form>
        </div>
    )
}
export default Login;