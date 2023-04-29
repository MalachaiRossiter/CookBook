import axios from 'axios';
import React, {useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';

const SignUp = (props) => {
    const {loggedIn, setLoggedIn} = props;
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const newAccount = ({username, email, password, confirmPassword})
        console.log(newAccount);
        axios.post('http://localhost:8000/api/user', newAccount)
        .then(res => {
            console.log(res.data);
            setLoggedIn(true);
            navigate('/dashboard');
        })
        .catch((err) => {
            console.log(err)
            const errorResponse = err.response.data.errors;
            const errorArr = [];
            for (const key of Object.keys(errorResponse)) {
                errorArr.push(errorResponse[key].message)
            }
            setErrors(errorArr);
        });
    }

    return(
        <form onSubmit={onSubmitHandler}>
            {errors.map((err, index) => <p key={index} className="error">{err}</p>)}
            <label>Username</label>
            <input type='text' onChange={(e) => setUsername(e.target.value)}/>
            <label>Email</label>
            <input type='text' onChange={(e) => setEmail(e.target.value)}/>
            <label>Password</label>
            <input type='text' onChange={(e) => setPassword(e.target.value)}/>
            <label>confirmPassword</label>
            <input type='text' onChange={(e) => setConfirmPassword(e.target.value)}/>
            <input type="submit" className='submit-btn'/>
        </form>
    )
}
export default SignUp;