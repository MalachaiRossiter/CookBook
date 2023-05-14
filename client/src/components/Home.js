import NavBar from './NavBar';

const Home = (props) => {

    const {loggedIn, setLoggedIn} = props;

    return (
        <div>
            <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
            Penis
        </div>
    )
}
export default Home;