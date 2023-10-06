import { Link } from "react-router-dom";
import Skeleton from "./Skeleton";
import TimerLogic from "./TimerLogic";
import { useState } from "react";
import { useEffect } from "react";

function NftCard({
  title,
  authorId,
  authorImage,
  expiryDate,
  nftId,
  nftImage,
  price,
  likes,
  isLoaded,
  isSlide,
  style,
}) {
  const [likeState, setlikeState] = useState(false);
  const [likeColor, setlikeColor] = useState("");
  const [likeCount, setlikeCount] = useState(0);

  useEffect(() => {
    setlikeCount(likes);
  }, [likes]);

  function handleLike() {
    if (!likeState) {
      setlikeCount(likeCount + 1);
      setlikeState(true);
      setlikeColor("#ec7498");
    } else if (likeState) {
      setlikeCount(likeCount - 1);
      setlikeState(false);
      setlikeColor("");
    }
  }
  return (
    <div
      className={`col-lg-3 col-md-6 col-sm-6 col-xs-12 ${
        isSlide ? "keen-slider__slide" : ""
      }`}
      style={style}
    >
      <div className="nft__item">
        <div className="author_list_pp">
          {isLoaded ? (
            <Link
              to={`/author/${authorId}`}
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Creator: Monica Lucas"
            >
              <img className="lazy" src={authorImage} alt="" />
              <i className="fa fa-check"></i>
            </Link>
          ) : (
            <Link
              to=""
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
          )}
        </div>
        {expiryDate ? (
          <div className="de_countdown">
            <TimerLogic time={expiryDate} />
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
          {isLoaded ? (
            <Link to={`/item-details/${nftId}`}>
              <img src={nftImage} className="lazy nft__item_preview" alt="" />
            </Link>
          ) : (
            <Link to="">
              <Skeleton width={"100%"} height={"14rem"} borderRadius={"12px"} />
            </Link>
          )}
        </div>
        <div className="nft__item_info">
          {isLoaded ? (
            <Link to={`/item-details/${nftId}`}>
              <h4>{title}</h4>
            </Link>
          ) : (
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
          )}

          <div className="nft__item_price">
            {isLoaded ? (
              `${price} ETH`
            ) : (
              <Skeleton width={"4rem"} height={"1rem"} borderRadius={"12px"} />
            )}
          </div>
          <div
            className="nft__item_like"
            onClick={() => {
              handleLike();
            }}
          >
            <i className="fa fa-heart" style={{ color: `${likeColor}` }}></i>
            <span>
              {isLoaded ? (
                `${likeCount}`
              ) : (
                <Skeleton
                  width={"2rem"}
                  height={"1rem"}
                  borderRadius={"12px"}
                />
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NftCard;