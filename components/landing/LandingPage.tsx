import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import Link from "next/link";

const LandingPage = () => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  return (
    <>
      <title>Carepet | Home</title>
      <div>
        <div className="home-container">
          <section className="home-hero">
            <div className="home-main">
              <div className="home-video">
                <video
                  loop
                  muted
                  autoPlay
                  playsInline
                  className="background-video object-contain w-full"
                  src="./hero/heropet.mp4"
                ></video>
              </div>
              <div className="home-content" id="backhome">
                <header data-thq="thq-navbar" className="home-navbar">
                  <img
                    alt="logo"
                    src="./hero/playground_assets/logo.png"
                    className="home-logo"
                  />
                  <div data-thq="thq-burger-menu" className="home-menu">
                    <div className="home-links">
                      <a href="#ccap" className="home-link link">
                        Services Overview
                      </a>
                      <span className="link">
                        <a href="#how-it-works" className="home-link link">
                          How CarePet Works
                        </a>
                      </span>
                      <span className="link text-white">
                        <Link href="/about">About Us</Link>
                      </span>
                      <Link href="/contact" className="home-link01 link">
                        Contact Us
                      </Link>

                      <Link href="./gallery" className="home-link01 link">
                        Gallery
                      </Link>
                    </div>
                    <button
                      onClick={() => setOpenSideMenu(!openSideMenu)}
                      className="home-hamburger bg-[#ffffff]/30 rounded-full border-none"
                    >
                      <RxHamburgerMenu color="#fff" />
                    </button>
                  </div>
                  <div
                    data-thq="thq-mobile-menu"
                    className={`home-mobile-menu ${
                      openSideMenu
                        ? "teleport-show thq-show thq-translate-to-default"
                        : ""
                    }`}
                  >
                    <div data-thq="thq-mobile-menu-nav" className="home-nav">
                      <div className="home-container1">
                        <img
                          alt="image"
                          src="./hero/playground_asset/logo2.png"
                          className="home-image"
                        />
                        <div
                          onClick={() => setOpenSideMenu(!openSideMenu)}
                          data-thq="thq-close-menu"
                          className="home-menu-close cursor-pointer"
                        >
                          <svg viewBox="0 0 1024 1024" className="home-icon02">
                            <path d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"></path>
                          </svg>
                        </div>
                      </div>
                      <nav
                        data-thq="thq-mobile-menu-nav-links"
                        data-role="Nav"
                        className="home-nav1"
                      >
                        <span className="home-text02">
                          <a href="#home-offers">Services Overview</a>
                        </span>
                        <span className="home-text03">About Us</span>
                        <span className="home-text04">
                          How does CarePet work?
                        </span>
                        <span className="home-text05">Contact Us</span>
                        <span className="home-text06">FaQ</span>
                      </nav>
                      <div className="home-container2">
                        <Link
                          href="./login"
                          className="home-login button hover:text-white hover:bg-green-550 hover:border-none"
                        >
                          Login or Sign Up
                        </Link>
                      </div>
                    </div>
                    <div className="home-icon-group">
                      <svg
                        viewBox="0 0 950.8571428571428 1024"
                        className="home-icon04"
                      >
                        <path d="M925.714 233.143c-25.143 36.571-56.571 69.143-92.571 95.429 0.571 8 0.571 16 0.571 24 0 244-185.714 525.143-525.143 525.143-104.571 0-201.714-30.286-283.429-82.857 14.857 1.714 29.143 2.286 44.571 2.286 86.286 0 165.714-29.143 229.143-78.857-81.143-1.714-149.143-54.857-172.571-128 11.429 1.714 22.857 2.857 34.857 2.857 16.571 0 33.143-2.286 48.571-6.286-84.571-17.143-148-91.429-148-181.143v-2.286c24.571 13.714 53.143 22.286 83.429 23.429-49.714-33.143-82.286-89.714-82.286-153.714 0-34.286 9.143-65.714 25.143-93.143 90.857 112 227.429 185.143 380.571 193.143-2.857-13.714-4.571-28-4.571-42.286 0-101.714 82.286-184.571 184.571-184.571 53.143 0 101.143 22.286 134.857 58.286 41.714-8 81.714-23.429 117.143-44.571-13.714 42.857-42.857 78.857-81.143 101.714 37.143-4 73.143-14.286 106.286-28.571z"></path>
                      </svg>
                      <svg
                        viewBox="0 0 877.7142857142857 1024"
                        className="home-icon06"
                      >
                        <path d="M585.143 512c0-80.571-65.714-146.286-146.286-146.286s-146.286 65.714-146.286 146.286 65.714 146.286 146.286 146.286 146.286-65.714 146.286-146.286zM664 512c0 124.571-100.571 225.143-225.143 225.143s-225.143-100.571-225.143-225.143 100.571-225.143 225.143-225.143 225.143 100.571 225.143 225.143zM725.714 277.714c0 29.143-23.429 52.571-52.571 52.571s-52.571-23.429-52.571-52.571 23.429-52.571 52.571-52.571 52.571 23.429 52.571 52.571zM438.857 152c-64 0-201.143-5.143-258.857 17.714-20 8-34.857 17.714-50.286 33.143s-25.143 30.286-33.143 50.286c-22.857 57.714-17.714 194.857-17.714 258.857s-5.143 201.143 17.714 258.857c8 20 17.714 34.857 33.143 50.286s30.286 25.143 50.286 33.143c57.714 22.857 194.857 17.714 258.857 17.714s201.143 5.143 258.857-17.714c20-8 34.857-17.714 50.286-33.143s25.143-30.286 33.143-50.286c22.857-57.714 17.714-194.857 17.714-258.857s5.143-201.143-17.714-258.857c-8-20-17.714-34.857-33.143-50.286s-30.286-25.143-50.286-33.143c-57.714-22.857-194.857-17.714-258.857-17.714zM877.714 512c0 60.571 0.571 120.571-2.857 181.143-3.429 70.286-19.429 132.571-70.857 184s-113.714 67.429-184 70.857c-60.571 3.429-120.571 2.857-181.143 2.857s-120.571 0.571-181.143-2.857c-70.286-3.429-132.571-19.429-184-70.857s-67.429-113.714-70.857-184c-3.429-60.571-2.857-120.571-2.857-181.143s-0.571-120.571 2.857-181.143c3.429-70.286 19.429-132.571 70.857-184s113.714-67.429 184-70.857c60.571-3.429 120.571-2.857 181.143-2.857s120.571-0.571 181.143 2.857c70.286 3.429 132.571 19.429 184 70.857s67.429 113.714 70.857 184c3.429 60.571 2.857 120.571 2.857 181.143z"></path>
                      </svg>
                      <svg
                        viewBox="0 0 602.2582857142856 1024"
                        className="home-icon08"
                      >
                        <path d="M548 6.857v150.857h-89.714c-70.286 0-83.429 33.714-83.429 82.286v108h167.429l-22.286 169.143h-145.143v433.714h-174.857v-433.714h-145.714v-169.143h145.714v-124.571c0-144.571 88.571-223.429 217.714-223.429 61.714 0 114.857 4.571 130.286 6.857z"></path>
                      </svg>
                    </div>
                  </div>
                </header>
                <div className="home-center">
                  <div className="home-heading">
                    <h1 className="home-header">
                      Find Trusted Pet Care Services Near You.
                    </h1>
                    <p className="home-caption">
                      From grooming to boarding and everything in between - all
                      within reach, right in your neighborhood.
                    </p>
                  </div>
                  <div className="home-border"></div>
                </div>
              </div>
            </div>
            <div id="features" className="home-feaures">
              <div className="home-content01">
                <div className="feature-feature">
                  <div className="feature-heading">
                    <img
                      alt="image"
                      src="./hero/playground_assets/thumbs-up.svg"
                      className="feature-icon"
                    />
                    <h3 className="feature-header text-white">
                      <span className="text-white">Pick what you like</span>
                    </h3>
                  </div>
                  <p className="feature-description">
                    <span className="text-white">
                      Specify the traits that you like in a petcare service.
                    </span>
                  </p>
                </div>
                <div className="feature-feature">
                  <div className="feature-heading">
                    <img
                      alt="image"
                      src="./hero/playground_assets/headset.svg"
                      className="feature-icon"
                    />
                    <h3 className="feature-header">
                      <span className="text-white">Need help?</span>
                    </h3>
                  </div>
                  <p className="feature-description">
                    <span className="text-white">
                      Our costumer support is always open for your concerns.
                    </span>
                  </p>
                </div>
                <div className="feature-feature">
                  <div className="feature-heading">
                    <img
                      alt="image"
                      src="./hero/playground_assets/person.svg"
                      className="feature-icon"
                    />
                    <h3 className="feature-header">
                      <span className="text-white">Not sure?</span>
                    </h3>
                  </div>
                  <p className="feature-description">
                    <span className="text-white">
                      Fret not, carepet comes with a systematic review system to
                      ease your doubts.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section id="tours" className="home-quick-view">
            <div className="home-main1" id="ccap">
              <div className="home-heading01">
                <h2 className="home-header01 pt-[6%]">
                  Find the purrfect care.
                </h2>
                <p className="home-caption01">
                  Whatever your pet care needs are, we've got you covered with
                  our diverse range of services.
                </p>
              </div>
            </div>
            <div className="home-offers">
              <a href="index.html">
                <div className="home-offer-container2">
                  <div className="offer-offer">
                    <img
                      alt="image"
                      src="./hero/playground_assets/1.jpg"
                      className="offer-image"
                    />
                    <div className="offer-content">
                      <div className="offer-details">
                        <span className="offer-text">
                          <span>Dog Walking</span>
                        </span>
                      </div>
                      <span className="offer-text2">
                        <span>
                          Need a helping leash?, let your furry friend out for
                          some fresh air, select reliable dog walking services.
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </a>
              <a href="index.html">
                <div className="home-offer-container2">
                  <div className="offer-offer">
                    <img
                      alt="image"
                      src="./hero/playground_assets/2.jpg"
                      className="offer-image"
                    />
                    <div className="offer-content">
                      <div className="offer-details">
                        <span className="offer-text offerko">
                          <span id="offerkoo">Pet Grooming</span>
                        </span>
                      </div>
                      <span className="offer-text2">
                        <span>
                          Treat your pets to a day at the spa, find the best
                          professional grooming services among our service
                          providers today.
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </a>
              <a href="index.html">
                <div className="home-offer-container3">
                  <div className="offer-offer">
                    <img
                      alt="image"
                      src="./hero/playground_assets/3.jpg"
                      className="offer-image"
                    />
                    <div className="offer-content">
                      <div className="offer-details">
                        <span className="offer-text">
                          <span>Pet Transportation</span>
                        </span>
                      </div>
                      <span className="offer-text2">
                        <span>
                          Don't let transportation be a barrier to your pet.
                          Select safe and reliable transportation services.
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </a>
              <a href="index.html">
                <div className="home-offer-container4">
                  <div className="offer-offer">
                    <img
                      alt="image"
                      src="./hero/playground_assets/4.jpg"
                      className="offer-image"
                    />
                    <div className="offer-content">
                      <div className="offer-details">
                        <span className="offer-text">
                          <span>Veterinary Services</span>
                        </span>
                      </div>
                      <span className="offer-text2">
                        <span>
                          Ensure your pet's health and well-being, our platform
                          has a range of comprehensive veterinary service
                          providers.
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </a>
              <a href="index.html">
                <div className="home-offer-container5">
                  <div className="offer-offer">
                    <img
                      alt="image"
                      src="./hero/playground_assets/5.jpg"
                      className="offer-image"
                    />
                    <div className="offer-content">
                      <div className="offer-details">
                        <span className="offer-text">
                          <span>Pet Photography</span>
                        </span>
                      </div>
                      <span className="offer-text2">
                        <span>
                          Capture beautiful moments with your pet, find your
                          preffered professional pet photography services.
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </a>
              <a href="index.html">
                <div className="home-offer-container6">
                  <div className="offer-offer">
                    <img
                      alt="image"
                      src="./hero/playground_assets/6.jpg"
                      className="offer-image"
                    />
                    <div className="offer-content">
                      <div className="offer-details">
                        <span className="offer-text">
                          <span> More Services</span>
                        </span>
                      </div>
                      <span className="offer-text2">
                        <span>
                          Pet birthday? pet training? other pet related issues?
                          let us help, we have more services to offer.
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </section>
          <section className="home-testimonials">
            <div className="home-content02">
              <div className="home-heading02">
                <span className="home-title">Customer testimonial</span>
                <p className="home-quote">
                  "Great website! Found a reliable dog walker for my pup easily.
                  Excellent communication and updates after each walk. Highly
                  recommend!"
                </p>
              </div>
              <div className="home-details">
                <div className="home-author">
                  <img
                    alt="image"
                    src="./hero/playground_assets/quote-200h.png"
                    className="home-avatar"
                  />
                  <span className="home-name">Michael McDonald</span>
                </div>

                <div className="home-controls">
                  <div className="page">
                    <span className="home-text13">&lt;</span>
                  </div>
                  <div className="home-next1 page">
                    <span className="home-text14">&lt;</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section id="how-it-works" className="home-highlights">
            <div className="home-highlight">
              <div className="home-content03 pl-[3%]">
                <div className="home-heading03">
                  <h2 className="home-header02">How does CarePet work?</h2>
                  <p className="home-caption02 text-justify">
                    Carepet is a website that serves as a platform for pet care
                    service providers to market their services and connect with
                    nearby pet owners who are looking for pet services.
                  </p>
                </div>
                <button className="button-arrow button">
                  <span className="home-text15">
                    <a href="#next">Next</a>
                  </span>
                  <span className="home-text16">&gt;</span>
                </button>
              </div>
              <div className="home-image2">
                <img
                  alt="image"
                  src="./hero/playground_assets/7.jpg"
                  className="home-image3"
                />
              </div>
            </div>
            <div className="home-highlight1" id="next">
              <div className="home-image4">
                <img
                  alt="image"
                  src="./hero/playground_assets/8.jpg"
                  className="home-image5"
                />
              </div>
              <div className="home-content04">
                <div className="home-heading04">
                  <h2 className="home-header03">
                    First, create an account then browse.
                  </h2>
                  <p className="home-caption03 text-justify">
                    <span>
                      To browse services, you need to create an account. This
                      involves providing some basic information such as name,
                      email address, and password.
                    </span>
                    <br />
                    <br />
                    <span>
                      Browse through the available services offered by pet care
                      providers, which could include dog walking, pet grooming,
                      pet sitting, and veterinary care. You could filter
                      services based on their location, price, and availability.
                    </span>
                    <br />
                  </p>
                </div>
                <button className="home-find button">
                  <a href="login_form.php">Start Now</a>
                </button>
              </div>
            </div>

            <div className="home-highlight">
              <div className="home-content03 pl-[3%]">
                <div className="home-heading03">
                  <h2 className="home-header02">You make the criteria.</h2>
                  <p className="home-caption02 text-justify">
                    You set the standards you want and if you have found the
                    right service provider for you, select a date and time that
                    works for you to schedule an appointment, it's that easy.
                  </p>
                </div>
                <button className="button-arrow button">
                  <span className="home-text15">Read More</span>
                  <span className="home-text16">&gt;</span>
                </button>
              </div>
              <div className="home-image2">
                <img
                  alt="image"
                  src="./hero/playground_assets/9.jpg"
                  className="home-image3"
                />
              </div>
            </div>

            <div className="home-highlight1">
              <div className="home-image4">
                <img
                  alt="image"
                  src="./hero/playground_assets/10.jpg"
                  className="home-image5"
                />
              </div>
              <div className="home-content04">
                <div className="home-heading04">
                  <h2 className="home-header03">Communication is the key.</h2>
                  <p className="home-caption03 text-justify">
                    <span>
                      Communicate with your selected service provider through
                      the app to confirm details about your appointment, provide
                      additional information, or ask any questions that you may
                      have.
                    </span>
                    <br />
                    <br />
                    <span>
                      Be sure to ask any questions you may have and provide all
                      necessary information to your service provider to ensure
                      that your pet's needs are met.
                    </span>
                    <br />
                  </p>
                </div>
              </div>
            </div>

            <div className="home-highlight">
              <div className="home-content03 pl-[3%]">
                <div className="home-heading03">
                  <h2 className="home-header02">Pay digitally.</h2>
                  <p className="home-caption02 text-justify">
                    Once you have selected a pet care service provider and
                    scheduled an appointment, you will be prompted to enter your
                    payment information. This may include details sufficient
                    enough to make through the digital payment.
                  </p>
                </div>
                <button className="button-arrow button">
                  <span className="home-text15">Read More</span>
                  <span className="home-text16">&gt;</span>
                </button>
              </div>
              <div className="home-image2">
                <img
                  alt="image"
                  src="./hero/playground_assets/11.jpg"
                  className="home-image3"
                />
              </div>
            </div>

            <div className="home-highlight1">
              <div className="home-image4">
                <img
                  alt="image"
                  src="./hero/playground_assets/12.jpg"
                  className="home-image5"
                />
              </div>
              <div className="home-content04">
                <div className="home-heading04">
                  <h2 className="home-header03">Service and Rating</h2>
                  <p className="home-caption03 text-justify">
                    <span>
                      On the scheduled date and time, the service provider will
                      arrive to deliver your requested pet care service.
                    </span>
                    <br />
                    <br />
                    <span>
                      After the service is completed, feel free to rate your
                      experience and provide feedback on the service provider
                      you've encountered. This helps other users make informed
                      decisions when selecting a pet care provider in the
                      future.
                    </span>
                    <br />
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section id="destinations" className="home-destinations">
            <div className="home-video-details">
              <div className="home-heading05">
                <h2 className="home-header04">Why choose CarePet?</h2>
                <p className="home-caption04">
                  Pet owners choose Carepet for a variety of positive reasons,
                  such as the wide range of services offered, the user-friendly
                  platform, the reliability of service providers, affordability,
                  and location convenience.
                </p>
              </div>
              <div className="home-video-wrapper">
                <div className="o-video">
                  <iframe
                    src="https://www.youtube.com/embed/Iym56pOZ3CM"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>

            <button className="home-find1 button">
              <a href="login_form.php">Start With Carepet Today</a>
            </button>
          </section>
          <section id="guides" className="home-guides">
            <div className="home-heading06">
              <h2 className="home-header05">Meet our team.</h2>
              <p className="home-caption06">
                CarePet is conceptualized, recreated and managed by the
                following.
              </p>
            </div>
            <div className="home-list1">
              <a href="index.html">
                <div className="home-guide-wrapper">
                  <div className="guide-guide">
                    <img
                      alt="image"
                      src="./hero/playground_assets/guide-1.jpeg"
                      className="guide-portrait"
                    />
                    <div className="guide-details">
                      <h3 className="guide-name">
                        <span>Joshua Nadado</span>
                      </h3>
                      <span className="guide-location">
                        <span>Creator</span>
                      </span>
                    </div>
                  </div>
                </div>
              </a>
              <a href="index.html">
                <div className="home-guide-wrapper1">
                  <div className="guide-guide guide-root-class-name2">
                    <img
                      alt="image"
                      src="./hero/playground_assets/guide-1.jpeg"
                      className="guide-portrait"
                    />
                    <div className="guide-details">
                      <h3 className="guide-name">
                        <span>Joshua Nadado</span>
                      </h3>
                      <span className="guide-location">
                        <span>Editor</span>
                      </span>
                    </div>
                  </div>
                </div>
              </a>
              <a href="index.html">
                <div className="home-guide-wrapper2">
                  <div className="guide-guide guide-root-class-name">
                    <img
                      alt="image"
                      src="./hero/playground_assets/guide-1.jpeg"
                      className="guide-portrait"
                    />
                    <div className="guide-details">
                      <h3 className="guide-name">
                        <span>Joshua Nadado</span>
                      </h3>
                      <span className="guide-loca'/'tion">
                        <span>Developer</span>
                      </span>
                    </div>
                  </div>
                </div>
              </a>
              <a href="index.html">
                <div className="home-guide-wrapper3">
                  <div className="guide-guide guide-root-class-name1">
                    <img
                      alt="image"
                      src="./hero/playground_assets/guide-1.jpeg"
                      className="guide-portrait"
                    />
                    <div className="guide-details">
                      <h3 className="guide-name">
                        <span>Joshua Nadado</span>
                      </h3>
                      <span className="guide-location">
                        <span>Concept</span>
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </section>
          <section className="home-articles pr-[6%]">
            <div id="articles" className="home-content05">
              <div className="home-heading07 text-center">
                <h2 className="home-header06">
                  Reasons why you'll love CarePet
                </h2>
                <p className="home-caption07 text-center">
                  CarePet can provide pet owners with convenient, accessible,
                  and high-quality pet care services. It offers a wide range of
                  services and a platform for professional service providers,
                  giving users peace of mind and assurance that their pets are
                  in good hands.
                </p>
              </div>
              <div className="home-list2">
                <div className="home-row">
                  <div className="article-article article-root-class-name1">
                    <img
                      alt="image"
                      src="./hero/playground_assets/14.jpg"
                      className="article-image"
                    />
                    <div className="article-content">
                      <div className="article-heading">
                        <h2 className="article-header">
                          <span>Convenience</span>
                        </h2>
                        <p className="article-description">
                          <span>
                            CarePet provides a convenient platform for pet
                            owners to find and book pet care services in their
                            local area, saving them time and effort.
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="article-article article-root-class-name">
                    <img
                      alt="image"
                      src="./hero/playground_assets/16.jpg"
                      className="article-image"
                    />
                    <div className="article-content">
                      <div className="article-heading">
                        <h2 className="article-header">
                          <span>Comprehensive Service</span>
                        </h2>
                        <p className="article-description">
                          <span>
                            The website offers a wide range of pet care
                            services, including dog walking, pet sitting,
                            grooming, and training, which can cater to different
                            needs of pet owners.
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="home-row">
                  <div className="article-article article-root-class-name1">
                    <img
                      alt="image"
                      src="./hero/playground_assets/15.jpg"
                      className="article-image"
                    />
                    <div className="article-content">
                      <div className="article-heading">
                        <h2 className="article-header">
                          <span>Costumizable Preference</span>
                        </h2>
                        <p className="article-description">
                          <span>
                            The platform allows pet owners to select providers
                            based on their specific needs and preferences, such
                            as the size of their pet, the duration of care
                            required, and the type of service needed.
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="article-article article-root-class-name">
                    <img
                      alt="image"
                      src="./hero/playground_assets/17.jpg"
                      className="article-image"
                    />
                    <div className="article-content">
                      <div className="article-heading">
                        <h2 className="article-header">
                          <span>Flexibility</span>
                        </h2>
                        <p className="article-description">
                          <span>
                            CarePet offers flexible scheduling options for pet
                            care services, allowing pet owners to schedule
                            appointments that fit their busy schedules
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="home-row2">
                  <button className="home-read-all button-option button">
                    <a href="#backhome"> Back to Home</a>
                  </button>
                </div>
              </div>
            </div>
          </section>
          <section className="home-faq">
            <div id="faqs" className="home-content06">
              <div className="home-heading08">
                <h2 className="home-header07">Frequently asked questions</h2>
                <p className="home-caption08">
                  Here are some frequently asked questions that CarePet users
                  CarePet might ask, along with possible answers.
                </p>
              </div>
              <div className="home-accordion">
                <div
                  data-role="accordion-container"
                  className="accordion home-element"
                >
                  <div className="home-content07">
                    <span className="home-header08"> What is CarePet? </span>
                    <span
                      data-role="accordion-content"
                      className="home-description"
                    >
                      CarePet is a platform that connects pet care service
                      providers with pet owners who need their services. We
                      offer a wide range of pet care services including dog
                      walking, pet grooming, pet sitting, and more.
                    </span>
                  </div>
                  <div className="home-icon-container">
                    <svg
                      viewBox="0 0 1024 1024"
                      data-role="accordion-icon-closed"
                      className="home-icon15"
                    >
                      <path d="M213.333 554.667h256v256c0 23.552 19.115 42.667 42.667 42.667s42.667-19.115 42.667-42.667v-256h256c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-256v-256c0-23.552-19.115-42.667-42.667-42.667s-42.667 19.115-42.667 42.667v256h-256c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
                    </svg>
                    <svg
                      viewBox="0 0 1024 1024"
                      data-role="accordion-icon-open"
                      className="home-icon17"
                    >
                      <path d="M213.333 554.667h597.333c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-597.333c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
                    </svg>
                  </div>
                </div>
                <div
                  data-role="accordion-container"
                  className="home-element1 accordion"
                >
                  <div className="home-content08">
                    <span className="home-header09">
                      How do I sign up as a pet care service provider?
                    </span>
                    <span
                      data-role="accordion-content"
                      className="home-description1"
                    >
                      To sign up as a pet care service provider, simply visit
                      our website, go to the footer section and click on the
                      "Become Partners". You will be asked to fill out a
                      registration form and provide some basic information about
                      your services.
                    </span>
                  </div>
                  <div className="home-icon-container1">
                    <svg
                      viewBox="0 0 1024 1024"
                      data-role="accordion-icon-closed"
                      className="home-icon19"
                    >
                      <path d="M213.333 554.667h256v256c0 23.552 19.115 42.667 42.667 42.667s42.667-19.115 42.667-42.667v-256h256c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-256v-256c0-23.552-19.115-42.667-42.667-42.667s-42.667 19.115-42.667 42.667v256h-256c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
                    </svg>
                    <svg
                      viewBox="0 0 1024 1024"
                      data-role="accordion-icon-open"
                      className="home-icon21"
                    >
                      <path d="M213.333 554.667h597.333c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-597.333c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
                    </svg>
                  </div>
                </div>
                <div
                  data-role="accordion-container"
                  className="home-element2 accordion"
                >
                  <div className="home-content09">
                    <span className="home-header10">
                      How do I find a pet care service provider near me?
                    </span>
                    <span
                      data-role="accordion-content"
                      className="home-description2"
                    >
                      To find a pet care service provider near you, simply enter
                      your location into our search bar and select the type of
                      service you are looking for. You will be shown a list of
                      pet care providers in your area along with their reviews
                      and ratings.
                    </span>
                  </div>
                  <div className="home-icon-container2">
                    <svg
                      viewBox="0 0 1024 1024"
                      data-role="accordion-icon-closed"
                      className="home-icon23"
                    >
                      <path d="M213.333 554.667h256v256c0 23.552 19.115 42.667 42.667 42.667s42.667-19.115 42.667-42.667v-256h256c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-256v-256c0-23.552-19.115-42.667-42.667-42.667s-42.667 19.115-42.667 42.667v256h-256c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
                    </svg>
                    <svg
                      viewBox="0 0 1024 1024"
                      data-role="accordion-icon-open"
                      className="home-icon25"
                    >
                      <path d="M213.333 554.667h597.333c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-597.333c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
                    </svg>
                  </div>
                </div>
                <div
                  data-role="accordion-container"
                  className="home-element3 accordion"
                >
                  <div className="home-content10">
                    <span className="home-header11">
                      What if I have an issue with a pet care service provider?
                    </span>
                    <span
                      data-role="accordion-content"
                      className="home-description3"
                    >
                      If you have an issue with a pet care service provider,
                      please contact us immediately. We take all complaints
                      seriously and will work with you and the service provider
                      to resolve the issue.
                    </span>
                  </div>
                  <div className="home-icon-container3">
                    <svg
                      viewBox="0 0 1024 1024"
                      data-role="accordion-icon-closed"
                      className="home-icon27"
                    >
                      <path d="M213.333 554.667h256v256c0 23.552 19.115 42.667 42.667 42.667s42.667-19.115 42.667-42.667v-256h256c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-256v-256c0-23.552-19.115-42.667-42.667-42.667s-42.667 19.115-42.667 42.667v256h-256c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
                    </svg>
                    <svg
                      viewBox="0 0 1024 1024"
                      data-role="accordion-icon-open"
                      className="home-icon29"
                    >
                      <path d="M213.333 554.667h597.333c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-597.333c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
                    </svg>
                  </div>
                </div>
                <div
                  data-role="accordion-container"
                  className="home-element4 accordion"
                >
                  <div className="home-content11">
                    <span className="home-header12">
                      How do I cancel or reschedule a pet care appointment?
                    </span>
                    <span
                      data-role="accordion-content"
                      className="home-description4"
                    >
                      To cancel or reschedule a pet care appointment, please
                      contact the service provider and request to CarePet that
                      you will cancel or reschedule the appointment. We will
                      work with you to find a new time that works for both of
                      you or simply abrupt the service.
                    </span>
                  </div>
                  <div className="home-icon-container4">
                    <svg
                      viewBox="0 0 1024 1024"
                      data-role="accordion-icon-closed"
                      className="home-icon31"
                    >
                      <path d="M213.333 554.667h256v256c0 23.552 19.115 42.667 42.667 42.667s42.667-19.115 42.667-42.667v-256h256c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-256v-256c0-23.552-19.115-42.667-42.667-42.667s-42.667 19.115-42.667 42.667v256h-256c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
                    </svg>
                    <svg
                      viewBox="0 0 1024 1024"
                      data-role="accordion-icon-open"
                      className="home-icon33"
                    >
                      <path d="M213.333 554.667h597.333c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-597.333c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section id="find" className="home-find2">
            <div className="home-heading09">
              <h2 className="home-header13">
                Find nearby petcare services now
              </h2>
              <p className="home-caption09">
                Your pet is in safe paws, find the purrfect care for your pets.
              </p>
            </div>
            <button className="home-find3 button">
              <a href="login_form.php">Start Exploring CarePet</a>
            </button>
          </section>
          <section className="home-footer">
            <div className="home-content12">
              <div className="home-main2">
                <div className="home-branding">
                  <div className="home-heading10">
                    <img
                      alt="image"
                      src="./hero/playground_assets/logo.png"
                      className="home-image7"
                    />
                    <p className="home-caption10">
                      Connecting pets with the care they deserve.
                    </p>
                  </div>
                </div>
                <div className="home-links1">
                  <div className="home-items">
                    <button className="home-link02 button button-clean">
                      Find Pet Care Services
                    </button>
                    <a
                      href="#destinations"
                      className="home-link03 button button-clean"
                    >
                      Log In
                    </a>
                    <a
                      href="#destinations"
                      className="home-link04 button button-clean"
                    >
                      Create an account
                    </a>
                    <a
                      href="#destinations"
                      className="home-link05 button button-clean"
                    >
                      Contact Us
                    </a>
                  </div>
                  <div className="home-items1">
                    <a
                      href="#how-it-works"
                      className="home-link06 button button-clean"
                    >
                      Have a Suggestion?
                    </a>
                    <button className="home-link07 button button-clean">
                      Terms and Conditions
                    </button>
                    <button className="home-link08 button button-clean">
                      Report
                    </button>
                    <button className="home-link09 button button-clean">
                      Back to Home
                    </button>
                  </div>
                  <div className="home-items2">
                    <button className="home-link10 button button-clean">
                      About us
                    </button>

                    <button className="home-link12 button button-clean">
                      Become Partners
                    </button>
                    <button className="home-link13 button button-clean">
                      Faqs
                    </button>
                    <button className="home-link14 button button-clean">
                      ServiceHive
                    </button>
                  </div>
                </div>
              </div>
              <span className="home-copyright">
                © 2023 ServiceHive Solutions All Rights Reserved.
              </span>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
