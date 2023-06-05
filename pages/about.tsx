import React from "react";
import Link from "next/link";

const about = () => {
  return (
    <>
      <header>
        <nav className="navbar w-full">
          <div className="logo">
            <img
              src="./hero/playground_assets/logo.png"
              width="300"
              height="auto"
            />
          </div>
          <ul className="nav-links">
            <div className="home">
              <Link className="font-bold" href="/">
                Home
              </Link>
            </div>
          </ul>
        </nav>
      </header>
      <video
        className="object-cover top-0 left-0 h-full w-full bg-center opacity-40"
        id="videoBG"
        src="./hero/playground_assets/vidaboutus.mp4"
        autoPlay
        muted
        loop
      />

      <section className="relative z-0 h-[50vh] m-0">
        <div className="text-5xl text-center text-blue-900 mt-0 pt-[5%]">
          <center>
            <img
              src="./hero/playground_assets/logocircle.png"
              className="img-responsive h-[300px] w-[300px]"
            />

            <div className="card0">
              <p className="text-[30px] text-white">
                The Philippines-based pet firm CarePet offers an all-in-one
                platform for pet care. For pet owners, pet lovers, companies,
                and members of the public, we offer a consolidated platform that
                will transform the pet care industry. We are reluctant to see
                the nation's pet ecosystem fall behind in the use of technology
                since we love and care for our pets so much. No matter how we
                feel about it, technology is a vital aspect of our life. We
                developed CarePet, an all-in-one platform for pet care, for this
                reason.
              </p>
            </div>
            <div className="card1">
              <p className="text-[70px] text-[#6A515E]">
                "Caring for Your Furry Friends"{" "}
              </p>
            </div>
          </center>
        </div>
        <ul className="cards">
          <li>
            <a href="" className="card">
              <img
                src="./hero/playground_assets/card1.jpg"
                className="card__image"
                alt=""
              />
              <div className="card__overlay">
                <div className="card__header">
                  <svg className="card__arc" xmlns="http://www.w3.org/2000/svg">
                    <path />
                  </svg>
                  <img
                    className="card__thumb"
                    src="./hero/playground_assets/logocircle.png"
                    alt=""
                  />
                  <div className="card__header-text">
                    <h3 className="card__title">2021 </h3>
                    <span className="card__status">2 years ago</span>
                  </div>
                </div>
                <p className="card__description">
                  CarePet was established in year 2021 and by creating a pet
                  service, CarePet are able to combine the love of &nbsp;
                  animals with the desire to help others.{" "}
                </p>
              </div>
            </a>
          </li>
          <li>
            <a href="" className="card">
              <img
                src="./hero/playground_assets/card2.jpg"
                className="card__image"
                alt=""
              />
              <div className="card__overlay">
                <div className="card__header">
                  <svg className="card__arc" xmlns="http://www.w3.org/2000/svg">
                    <path />
                  </svg>
                  <img
                    className="card__thumb"
                    src="./hero/playground_assets/logocircle.png"
                    alt=""
                  />
                  <div className="card__header-text">
                    <h3 className="card__title">2022</h3>
                    <span className="card__status">1 year ago</span>
                  </div>
                </div>
                <p className="card__description">
                  As 1 year pet service provider have gained experience and
                  knowledge in the pet industry, and made &nbsp; adjustments to
                  the services based on feedback.{" "}
                </p>
              </div>
            </a>
          </li>
          <li>
            <a href="" className="card">
              <img
                src="./hero/playground_assets/card3.jpg"
                className="card__image"
                alt=""
              />
              <div className="card__overlay">
                <div className="card__header">
                  <svg className="card__arc" xmlns="http://www.w3.org/2000/svg">
                    <path />
                  </svg>
                  <img
                    className="card__thumb"
                    src="./hero/playground_assets/logocircle.png"
                    alt=""
                  />
                  <div className="card__header-text">
                    <h3 className="card__title">2023(Present)</h3>
                    <span className="card__status">Present Time</span>
                  </div>
                </div>
                <p className="card__description">
                  a 2 years pet service provider website would aim to provide a
                  user-friendly and informative experience for potential
                  clients.
                </p>
              </div>
            </a>
          </li>
          <li>
            <a href="" className="card">
              <img
                src="./hero/playground_assets/card4.jpg"
                className="card__image"
                alt=""
              />
              <div className="card__overlay">
                <div className="card__header">
                  <svg className="card__arc" xmlns="http://www.w3.org/2000/svg">
                    <path />
                  </svg>
                  <img
                    className="card__thumb"
                    src="./hero/playground_assets/logocircle.png"
                    alt=""
                  />
                  <div className="card__header-text">
                    <h3 className="card__title">Future Plans</h3>
                    <span className="card__status">
                      {" "}
                      Future plans of CarePet
                    </span>
                  </div>
                </div>
                <p className="card__description">
                  Enhancing the website design: An updated website design can
                  provide a more modern and professional look.{" "}
                </p>
              </div>
            </a>
          </li>
        </ul>
      </section>
    </>
  );
};

export default about;
