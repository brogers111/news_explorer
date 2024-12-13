import './NewsCard.css';
import cardImage from '../../assets/card-image.png';

function NewsCard() {
    return (
        <li className="card">
            <button className="card__save-button"></button>
            <img src={cardImage} alt="test" className="card__image" />
            <div className="card__info">
                <p className="card__date">November 4, 2020</p>
                <h3 className="card__title">Everyone Needs a Special &apos;Sit Spot&apos; in Nature</h3>
                <p className="card__desc">Ever since I read Richard Louv&apos;s influential book, &quot;Last Child in the Woods,&quot; the idea of having a special &quot;sit spot&quot; has stuck with me. This advice, which Louv attributes to nature educator Jon Young, is for both adults and children to find...</p>
                <p className="card__source">TREEHUGGER</p>
            </div>
        </li>
    )
}

export default NewsCard;