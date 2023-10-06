import React, { useEffect, useState } from "react";
import axios from "axios";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import NftCard from "../UI/NftCard";




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
                    <NftCard
                      key={index}
                      authorId={item.authorId}
                      authorImage={item.authorImage}
                      expiryDate={item.expiryDate}
                      likes={item.likes}
                      nftId={item.nftId}
                      nftImage={item.nftImage}
                      price={item.price}
                      title={item.title}
                      isLoaded={true}
                      isSlide={true}
                    />
                  ))
                  : new Array(6)
                  .fill(0)
                  .map((_, index) => (
                    <NftCard key={index} isLoaded={false} isSlide={true} />
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
