import NavBar from './NavBar';

const Home = (props) => {

    const {loggedIn, setLoggedIn} = props;

    const onSubmitHandler => ()

    return (
        <div>
            <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
            <div className='hero'>
                <form>
                    <input type='text' className='searchbar'/>
                    <input type="submit" className='submit-btn'/>
                </form>
            </div>
        </div>
    )
}
export default Home;