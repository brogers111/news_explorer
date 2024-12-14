import Navigation from "../Navigation/Navigation";
import SearchForm from "../SearchForm/SearchForm";
import './Header.css';

function Header({ handleModalOpen }){
    return(
        <header className="header">
            <section className="header__nav">
                <Navigation handleModalOpen={handleModalOpen}/>
            </section>
            <section className="header__search-form">
                <SearchForm/>
            </section>
        </header>
    )
}

export default Header;