import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import Skeleton from "../UI/Skeleton";



const HotCollections = () => {
  const [responseList, setresponseList] = useState(false);

  useEffect(() => {
    fetchApiData(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
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

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="navigation-wrapper">
            <div ref={sliderRef} className="keen-slider">
              {responseList
                ? responseList.map((item, index) => (
                    <div
                      className="col-lg-3 col-md-6 col-sm-6 col-xs-12 keen-slider__slide"
                      key={index}
                    >
                      <div className="nft_coll">
                        <div className="nft_wrap">
                          <Link to={`/${item.nftId}`}>
                            <img
                              src={item.nftImage}
                              className="lazy img-fluid"
                              alt=""
                            />
                          </Link>
                        </div>
                        <div className="nft_coll_pp">
                          <Link to={`/${item.authorId}`}>
                            <img
                              className="lazy pp-coll"
                              src={item.authorImage}
                              alt=""
                            />
                          </Link>
                          <i className="fa fa-check"></i>
                        </div>
                        <div className="nft_coll_info">
                          <Link to={`/test`}>
                            <h4>{item.title}</h4>
                          </Link>
                          <span>{`ERC-${item.code}`}</span>
                        </div>
                      </div>
                    </div>
                  ))
                  : new Array(6).fill(0).map((_, index) => (
                    <div
                      className="col-lg-3 col-md-6 col-sm-6 col-xs-12 keen-slider__slide"
                      key={index}
                    >
                      <div className="nft_coll">
                        <div className="nft_wrap">
                          <Link to="/">
                          <Skeleton width={"100%"} height={"auto"} />
                          </Link>
                        </div>
                        <div className="nft_coll_pp">
                          <Link to="/">
                          <Skeleton
                              width={"3rem"}
                              height={"3rem"}
                              borderRadius={"9999px"}
                            />
                          </Link>
                          <i className="fa fa-check"></i>
                        </div>
                        <div className="nft_coll_info">
                          <Link to="/">
                          <h4>
                              <Skeleton
                                width={"6rem"}
                                height={"1rem"}
                                borderRadius={"12px"}
                              />
                            </h4>
                          </Link>
                          <span>
                            <Skeleton
                              width={"3rem"}
                              height={"1rem"}
                              borderRadius={"12px"}
                            />
                          </span>
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
export default HotCollections;
