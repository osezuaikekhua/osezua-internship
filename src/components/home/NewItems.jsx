import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Skeleton from "../UI/Skeleton";


const NewItems = () => {
  const [responseList, setresponseList] = useState([]);

  useEffect(() => {
    fetchApiData(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
    );
  }, []);


  async function fetchApiData(api) {
    let response = await axios.get(api);
    let responseData = await response.data;
    setresponseList(responseData);
  }

  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    loop: true,
    mode: "snap",
    slides: {
      perView: 4,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
    breakpoints: {
      "(max-width: 1200px)": {
        slides: { perView: 3 },
      },
      "(max-width: 840px)": {
        slides: { perView: 2 },
      },
      "(max-width: 440px)": {
        slides: { perView: 1 },
      },
    },
  });

  function timerLogic(time) {
    const now = Date.now();

    const difference = time - now;

    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    let outputString = "";

    if (hours > 0) outputString += hours + "h" + " ";
    if (minutes % 60 > 0) outputString += (minutes % 60) + "m" + " ";
    outputString += seconds + "s";
    return outputString;
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setresponseList((prev) => {
        return prev.map((item) => item);
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="navigation-wrapper">
            <div ref={sliderRef} className="keen-slider">
              {responseList.length
                ? responseList.map((item, index) => (
                    <div
                      className="col-lg-3 col-md-6 col-sm-6 col-xs-12 keen-slider__slide"
                      key={index}
                    >
                      <div className="nft__item">
                        <div className="author_list_pp">
                          <Link
                            to={`/author/${item.authorId}`}
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Creator: Monica Lucas"
                          >
                            <img
                              className="lazy"
                              src={item.authorImage}
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        {item.expiryDate ? (
                          <div className="de_countdown">
                            {timerLogic(item.expiryDate)}
                          </div>
                        ) : null}
                        <div className="nft__item_wrap">
                          <div className="nft__item_extra">
                            <div className="nft__item_buttons">
                              <button>Buy Now</button>
                              <div className="nft__item_share">
                                <h4>Share</h4>
                                <a href="" target="_blank" rel="noreferrer">
                                  <i className="fa fa-facebook fa-lg"></i>
                                </a>
                                <a href="" target="_blank" rel="noreferrer">
                                  <i className="fa fa-twitter fa-lg"></i>
                                </a>
                                <a href="">
                                  <i className="fa fa-envelope fa-lg"></i>
                                </a>
                              </div>
                            </div>
                          </div>

                          <Link to={`/item-details/${item.nftId}`}>
                            <img
                              src={item.nftImage}
                              className="lazy nft__item_preview"
                              alt=""
                            />
                          </Link>
                        </div>
                        <div className="nft__item_info">
                          <Link to={`/item-details/${item.nftId}`}>
                            <h4>{item.title}</h4>
                          </Link>
                          <div className="nft__item_price">{`${item.price} ETH`}</div>
                          <div className="nft__item_like">
                            <i className="fa fa-heart"></i>
                            <span>{item.likes}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                : new Array(6).fill(0).map((_, index) => (
                    <div
                      key={index}
                      className="col-lg-3 col-md-6 col-sm-6 col-xs-12 keen-slider__slide"
                    >
                      <div className="nft__item">
                        <div className="author_list_pp">
                          <Link
                            to="/author"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Creator: Monica Lucas"
                          >
                            <Skeleton
                              width={"3rem"}
                              height={"3rem"}
                              borderRadius={"9999px"}
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>

                        <div className="nft__item_wrap">
                          <div className="nft__item_extra">
                            <div className="nft__item_buttons">
                              <button>Buy Now</button>
                              <div className="nft__item_share">
                                <h4>Share</h4>
                                <a href="" target="_blank" rel="noreferrer">
                                  <i className="fa fa-facebook fa-lg"></i>
                                </a>
                                <a href="" target="_blank" rel="noreferrer">
                                  <i className="fa fa-twitter fa-lg"></i>
                                </a>
                                <a href="">
                                  <i className="fa fa-envelope fa-lg"></i>
                                </a>
                              </div>
                            </div>
                          </div>

                          <Link to="">
                            <Skeleton
                              width={"100%"}
                              height={"14rem"}
                              borderRadius={"12px"}
                            />
                          </Link>
                        </div>
                        <div className="nft__item_info">
                          <Link to="">
                            <h4>
                              {" "}
                              <Skeleton
                                width={"6rem"}
                                height={"1rem"}
                                borderRadius={"12px"}
                              />
                            </h4>
                          </Link>
                          <div className="nft__item_price">
                            {" "}
                            <Skeleton
                              width={"4rem"}
                              height={"1rem"}
                              borderRadius={"12px"}
                            />
                          </div>
                          <div className="nft__item_like">
                            <i className="fa fa-heart"></i>
                            <span>
                              {" "}
                              <Skeleton
                                width={"2rem"}
                                height={"1rem"}
                                borderRadius={"12px"}
                              />
                            </span>
                          </div>
                        </div>


                      </div>
                    </div>
                ))}
            </div>
            {loaded && instanceRef.current && (
              <>
                <Arrow
                  left
                  onClick={(e) =>
                    e.stopPropagation() || instanceRef.current?.prev()
                  }
                  disabled={currentSlide === 0}
                />

                <Arrow
                  onClick={(e) =>
                    e.stopPropagation() || instanceRef.current?.next()
                  }
                  disabled={
                    currentSlide ===
                    instanceRef.current.track.details.slides.length - 1
                  }
                />
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

function Arrow(props) {
  const disabeld = props.disabled ? " arrow--disabled" : "";
  return (
    <svg
      onClick={props.onClick}
      className={`arrow ${
        props.left ? "arrow--left" : "arrow--right"
      } ${disabeld}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {props.left && (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      )}
      {!props.left && (
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      )}
    </svg>
  );
}

export default NewItems;
