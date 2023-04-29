import {Link} from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Home = (props) => {

    const {loggedIn, setLoggedIn} = props;
    const navigate = useNavigate();

    const onClickHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/user/logout', {}, {withCredentials: true})
        .then (res => {
            console.log(res);
            setLoggedIn(false);
            navigate('/login');
        })
        .catch((err) => {console.log(err)});
    }

    return (
        <div>
            Penis
            <Link onClick={onClickHandler}>Click my mom</Link>
        </div>
    )
}
export default Home;