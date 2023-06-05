import React from "react";
import styles from "../styles/gallery.module.css";
import Link from "next/link";

const gallery = () => {
  return (
    <>
      <div className={styles.bodyClass}>
        <div className={styles.title}>
          <div className={styles.titleChild}>
            <h1 className="text-[100px]">CarePet Gallery</h1>
            <p
              className={styles.top}
              style={{ color: "#fff" }}
              id={styles.pStyle}
            >
              Connecting you to the Best Pet Services.
            </p>
          </div>
          <Link href="./">Back to Home</Link>
        </div>

        <div className={styles.gridNav}>
          <div className={styles.image1}></div>
          <div className={styles.image2}></div>
          <div className={styles.image3}></div>
          <div className={styles.image4}></div>
          <div className={styles.image5}></div>
          <div className={styles.image6}></div>
          <div className={styles.image7}></div>
          <div className={styles.image8}></div>
          <div className={styles.image9}></div>
          <div className={styles.image10}></div>
          <div className={styles.image11}></div>
          <div className={styles.image12}></div>
          <div className={styles.image13}></div>
          <div className={styles.image14}></div>
          <div className={styles.image15}></div>
          <div className={styles.image16}></div>
        </div>

        <div className={styles.container}>
          <div className={styles.card0}>
            <h1 className={styles.header}>PAWSITIVELY SINCE 2021</h1>
            <p className={styles.pStyle} id={styles.caption}>
              "From Furry to Fabulous: Our Pet Styling Services on Display"
            </p>
          </div>

          <div className={styles.wrap}>
            <div className={styles.box}>
              <div className={styles.boxTop}>
                <img
                  className={styles.boxImage}
                  src="./hero/playground_assets/box1.jpg"
                />
                <div className={styles.titleFlex}>
                  <h3 className={styles.boxTitle} id={styles.h3Stye}>
                    Breanna
                  </h3>
                  <p className={styles.userFollowInfo}>50 visits</p>
                </div>
                <p className={styles.description} id={styles.pStyle}>
                  Dogs are often referred to as "man's best friend" due to their
                  unwavering loyalty and companionship.Breanna is our top
                  visitor since CarePet Created.
                </p>
              </div>
              <a>CarePet.Com</a>
            </div>
            <div className={styles.box}>
              <div className={styles.boxTop}>
                <img
                  className={styles.boxImage}
                  src="./hero/playground_assets/box2.jfif"
                />
                <div className={styles.titleFlex}>
                  <h3 className={styles.h3Style} id={styles.boxTitle}>
                    Marii
                  </h3>
                  <p className={styles.userFollowInfo} id={styles.pStyle}>
                    48 visits
                  </p>
                </div>
                <p className={styles.description} id={styles.pStyle}>
                  Dogs require regular exercise and mental stimulation to
                  maintain their health and well-being. With 48 visits, Marii is
                  satisfied with the services offered.
                </p>
              </div>
              <a>CarePet.Com</a>
            </div>
            <div className={styles.box}>
              <div className={styles.boxTop}>
                <img
                  className={styles.boxImage}
                  src="./hero/playground_assets/box3.jpg"
                />
                <div className={styles.titleFlex}>
                  <h3 className={styles.boxTitle} id={styles.h3Style}>
                    Taylor
                  </h3>
                  <p className={styles.userFollowInfo} id={styles.pStyle}>
                    40 visits
                  </p>
                </div>
                <p className={styles.description} id={styles.pStyle}>
                  They are known for their ability to provide comfort and
                  emotional support to their owners.
                </p>
              </div>
              <a>CarePet.Com</a>
            </div>
            <div className={styles.box}>
              <div className={styles.boxTop}>
                <img
                  className={styles.boxImage}
                  src="./hero/playground_assets/box4.jpg"
                />
                <div className={styles.titleFlex}>
                  <h3 className={styles.boxTitle} id={styles.h3Stye}>
                    Isaiah
                  </h3>
                  <p className={styles.userFollowInfo}>38 visits</p>
                </div>
                <p className={styles.description} id={styles.pStyle}>
                  Rabbits are gentle, docile animals that make great pets for
                  families with children.{" "}
                </p>
              </div>
              <a>CarePet.Com</a>
            </div>
            <div className={styles.box}>
              <div className={styles.boxTop}>
                <img
                  className={styles.boxImage}
                  src="./hero/playground_assets/box5.jpg"
                />
                <div className={styles.titleFlex}>
                  <h3 className={styles.boxTitle} id={styles.h3Stye}>
                    Kelsie
                  </h3>
                  <p className={styles.userFollowInfo}>35 visits</p>
                </div>
                <p className={styles.description} id={styles.pStyle}>
                  They have a keen sense of smell and are often used for tasks
                  such as search and rescue, hunting, and detecting drugs or
                  explosives.
                </p>
              </div>
              <a>CarePet.Com</a>
            </div>
            <div className={styles.box}>
              <div className={styles.boxTop}>
                <img
                  className={styles.boxImage}
                  src="./hero/playground_assets/box6.jpg"
                />
                <div className={styles.titleFlex}>
                  <h3 className={styles.boxTitle} id={styles.h3Stye}>
                    Mark{" "}
                  </h3>
                  <p className={styles.userFollowInfo}>33 visits</p>
                </div>
                <p className={styles.description} id={styles.pStyle}>
                  Dogs come in a wide variety of breeds, each with their own
                  unique physical characteristics and personality traits.
                </p>
              </div>
              <a>CarePet.Com</a>
            </div>
            <div className={styles.box}>
              <div className={styles.boxTop}>
                <img
                  className={styles.boxImage}
                  src="./hero/playground_assets/box7.jpg"
                />
                <div className={styles.titleFlex}>
                  <h3 className={styles.boxTitle} id={styles.h3Stye}>
                    Royal
                  </h3>
                  <p className={styles.userFollowInfo}>29 visits</p>
                </div>
                <p className={styles.description} id={styles.pStyle}>
                  Cats are clean animals who groom themselves regularly and are
                  generally low-maintenance pets.
                </p>
              </div>
              <a>CarePet.Com</a>
            </div>
            <div className={styles.box}>
              <div className={styles.boxTop}>
                <img
                  className={styles.boxImage}
                  src="./hero/playground_assets/box8.jfif"
                />
                <div className={styles.titleFlex}>
                  <h3 className={styles.boxTitle} id={styles.h3Stye}>
                    Jian
                  </h3>
                  <p className={styles.userFollowInfo}>24 visits</p>
                </div>
                <p className={styles.description} id={styles.pStyle}>
                  They have a natural instinct to protect their owners and their
                  home, making them excellent guard dogs.
                </p>
              </div>
              <a>CarePet.Com</a>
            </div>
            <div className={styles.box}>
              <div className="box-top">
                <img
                  className={styles.boxImage}
                  src="./hero/playground_assets/box9.jpg"
                />
                <div className={styles.titleFlex}>
                  <h3 className={styles.boxTitle} id={styles.h3Stye}>
                    Thanos
                  </h3>
                  <p className={styles.userFollowInfo}>17 Visits</p>
                </div>
                <p className={styles.description} id={styles.pStyle}>
                  Hedgehogs are known for their cute and distinctive appearance,
                  with short legs, pointy ears, and a coat of sharp spines on
                  their back.
                </p>
              </div>
              <a>CarePet.Com</a>
            </div>
            <div className={styles.box}>
              <div className="box-top">
                <img
                  className={styles.boxImage}
                  src="./hero/playground_assets/box10.jfif"
                />
                <div className={styles.titleFlex}>
                  <h3 className={styles.boxTitle} id={styles.h3Stye}>
                    Daisy
                  </h3>
                  <p className={styles.userFollowInfo}>15 visits</p>
                </div>
                <p className={styles.description} id={styles.pStyle}>
                  They are highly trainable and can learn a wide variety of
                  behaviors and commands.
                </p>
              </div>
              <a>CarePet.Com</a>
            </div>
            <div className={styles.box}>
              <div className="box-top">
                <img
                  className={styles.boxImage}
                  src="./hero/playground_assets/box11.png"
                />
                <div className={styles.titleFlex}>
                  <h3 className={styles.boxTitle} id={styles.h3Stye}>
                    Bluey
                  </h3>
                  <p className={styles.userFollowInfo}>13 visits</p>
                </div>
                <p className={styles.description} id={styles.pStyle}>
                  Cats are known for their calming presence and can provide
                  comfort and emotional support to their owners.
                </p>
              </div>
              <a>CarePet.Com</a>
            </div>
            <div className={styles.box}>
              <div className="box-top">
                <img
                  className={styles.boxImage}
                  src="./hero/playground_assets/box12.jpg"
                />
                <div className={styles.titleFlex}>
                  <h3 className={styles.boxTitle} id={styles.h3Stye}>
                    Max
                  </h3>
                  <p className={styles.userFollowInfo}>12 visits</p>
                </div>
                <p className={styles.description} id={styles.pStyle}>
                  Fish are low-maintenance pets that require a balanced diet of
                  fish food and clean water to remain healthy and vibrant.{" "}
                </p>
              </div>
              <a>CarePet.Com</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default gallery;
