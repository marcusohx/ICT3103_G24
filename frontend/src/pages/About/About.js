import React from "react";
import "./About.css";

function About() {
  return (
    <div className="about-container">
      <header className="about-header">
        <h1 className="about-title">About Us</h1>
        <p className="about-subtitle">
          Your Gateway to Freelance Industry Jobs - Discover SIT Gigs
        </p>
      </header>

      <section className="about-content">
        <div className="who-we-are">
          <h2 className="section-title">Who We Are</h2>
          <p>
            We are SIT Gigs, a community built around the
            aspirations of university students. We understand the challenges
            you face—juggling coursework, expenses, and the desire to earn extra
            credits. That's why we're here to help you achieve your goals.
          </p>
        </div>

        <div className="what-we-offer">
          <h2 className="section-title">What We Offer</h2>
          <p>
            Whether you're a talented writer, a coding wizard, a creative
            designer, or possess any other skill, SIT Gigs
            has a world of opportunities waiting for you. Explore a diverse
            range of freelance jobs that match your skills and interests.
          </p>
        </div>

        <div className="our-commitment">
          <h2 className="section-title">Our Commitment</h2>
          <p>
            We are committed to creating a safe and supportive environment for
            freelancers and employers alike. Your security and fair compensation
            are our top priorities. Our user-friendly platform ensures you can
            easily navigate and discover the best opportunities.
          </p>
        </div>

        <div className="get-started">
          <h2 className="section-title">Get Started Today!</h2>
          <p>
            Are you ready to embark on your side hustle journey? Join SIT Gigs today and start earning credits while pursuing
            your academic goals. Your side hustle success story begins here.
          </p>
        </div>

        <div className="stay-connected">
          <h2 className="section-title">Stay Connected</h2>
          <p>
            Stay in the loop with the latest opportunities, success stories, and
            valuable tips for freelancers. Follow us on social media and join
            our thriving community.
          </p>
        </div>

        <div className="contact-us">
          <h2 className="section-title">Contact Us</h2>
          <p>
            Got questions or need assistance? Our support team is here to help
            you. Feel free to reach out at any time.
          </p>
        </div>
      </section>
    </div>
  );
}

export default About;
