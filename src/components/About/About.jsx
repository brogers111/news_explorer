import './About.css';
import headshot from "../../assets/headshot.jpeg";

function About(){
    return(
        <section className="about">
            <img src={headshot} alt="headshot" className="about__image" />
            <div className="about__details">
                <h2 className="about__title">About the author</h2>
                <p className="about__desc">
                    This block describes the project author. Here you should indicate your name, what you do, and which development technologies you know.<br/><br/>
                    You can also talk about your experience with TripleTen, what you learned there, and how you can help potential customers.
                </p>
            </div>
        </section>
    )
}

export default About;