import Navigation from "../Navigation/Navigation";
import SearchForm from "../SearchForm/SearchForm";
import './Header.css';

function Header(){
    return(
        <header className="header">
            <section className="header__nav">
                <Navigation/>
            </section>
            <section className="header__search-form">
                <SearchForm/>
            </section>
        </header>
    )
}

export default Header;