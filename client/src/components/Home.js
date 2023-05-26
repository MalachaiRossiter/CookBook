import NavBar from './NavBar';
import home from '../styles/home.css';

const Home = (props) => {

    const {loggedIn, setLoggedIn} = props;

    return (
        <div className='container'>
            <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
            <div className='hero'>
                <form>
                    <input type='text' className='searchbar'/>
                    <input type="submit" className='search-btn'/>
                </form>
            </div>
        </div>
    )
}
export default Home;