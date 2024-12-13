import About from '../About/About';
import NewsCard from '../NewsCard/NewsCard';
import Preloader from '../Preloader/Preloader';

import './Main.css';

function Main() {
    return (
        <main>
            <Preloader />
            <section className="cards">
                <h2 className="cards__header">Search results</h2>
                <ul className="cards__list">
                    <NewsCard />
                    <NewsCard />
                    <NewsCard />
                </ul>
                <button className="cards__show-more-button">Show more</button>
            </section>
            <About />
        </main>
    )
}

export default Main;