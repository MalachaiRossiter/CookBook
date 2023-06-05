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
        axios.post('http://localhost:8000/api/user', newAccount, {withCredentials: true})
        .then(res => {
            console.log(res.data);
            setLoggedIn(true);
            navigate('/');
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
        <div className='container-login'>
        <div className='row'>
            <div className='column1-4'>
                <div className='form-container'>
                        <form onSubmit={onSubmitHandler}>
                            <h1>Sign Up!</h1>
                            {errors.map((err, index) => <p key={index} className="error">{err}</p>)}
                            <div className='input-section'>
                                <label className='label'>Username</label>
                                <input type='text' onChange={(e) => setUsername(e.target.value)} className='form-input' placeholder={"Super Noodle Squad"}/>
                            </div>
                            <div className='input-section'>
                                <label className='label'>Email</label>
                                <input type='text' onChange={(e) => setEmail(e.target.value)} className='form-input' placeholder={"ramen@email.com"}/>
                            </div>
                            <div className='input-section'>
                                <label className='label'>Password</label>
                                <input type='password' onChange={(e) => setPassword(e.target.value)} className='form-input' placeholder={"********"}/>
                            </div>
                            <div className='input-section'>
                                <label className='label'>confirmPassword</label>
                                <input type='password' onChange={(e) => setConfirmPassword(e.target.value)} className='form-input' placeholder={"********"}/>
                            </div>
                            <input type="submit" className='submit-btn'/>
                            <Link to={"/login"} className='link'>Already a Master Chef?</Link>
                        </form>
                    </div>
                </div>
            <div className='column3-4 sign-up'>
            </div>
        </div>
    </div>
    )
}
export default SignUp;