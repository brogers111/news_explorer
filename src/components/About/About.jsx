import './About.css';
import headshot from "../../assets/headshot.jpg";

function About() {
    return (
        <section className="about">
            <img src={headshot} alt="headshot" className="about__image" />
            <div className="about__details">
                <h2 className="about__title">About the author</h2>
                <p className="about__desc">
                    Hey, I&apos;m Brandon Rogers, a full-stack software developer participating in the TripleTen Software Engineering Bootcamp.
                </p>
                <p className="about__desc">
                    Right now, I&apos;m an SEO Specialist at Amsive, a full-time robotics major at Metropolitan State University of Denver, and co-founder of an app called Inscription.
                </p>
                <p className="about__desc">
                    I&apos;m currently proficient in development technologies that include HTML, CSS, JavaScript, NodeJS, React, Vue, Express, MongoDB, and more, most of which I have been able to learn throughout the TripleTen Bootcamp.
                </p>
                <p className="about__desc">
                    As the last sprint in the TripleTen Software Engineering Bootcamp, I chose to build this NewsExplorer application, so I hope you enjoy using it!
                </p>
            </div>
        </section>
    );
}

export default About;
