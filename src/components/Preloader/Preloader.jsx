import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import "./Preloader.css";

function Preloader() {
    const { isSearching } = useContext(CurrentUserContext);

    return (
        <div className="preloader">
            {isSearching ? (
                <>
                    <div className="preloader__circle"></div>
                    <p className="preloader__text">Searching for news...</p>
                </>
            ) : (
                <>
                    <div className="preloader__not-found"></div>
                    <p className="preloader__text">Sorry, but nothing matched<br/>your search terms.</p>
                </>
            )}
        </div>
    )
}

export default Preloader;