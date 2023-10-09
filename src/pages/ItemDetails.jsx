import React, { useEffect } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";


const ItemDetails = () => {
  const [likeState, setlikeState] = useState(false);
  const [likeColor, setlikeColor] = useState("");
  const [likeCount, setlikeCount] = useState(0);
  const [responseList, setresponseList] = useState([]);
  let itemDetailsApiLink = process.env.REACT_APP_FES_API;
  const { nftID } = useParams();



  useEffect(() => {
    window.scrollTo(0, 0);

    fetchApiData(`${itemDetailsApiLink}/itemDetails?nftId=${nftID}`);
  }, []);

  useEffect(() => {
    setlikeCount(responseList.likes);
  }, [responseList.likes]);

  async function fetchApiData(api) {
    let response = await axios.get(api);
    let responseData = await response.data;
    setresponseList(responseData);
    
  }

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
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
              {responseList.title && responseList.tag ? (
                  <img
                    src={responseList.nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt=""
                  />
                ) : (
                  <Skeleton
                    width={"100%"}
                    height={"100%"}
                    borderRadius={"1rem"}
                  />
                )}
              </div>
              <div className="col-md-6">
                <div className="item_info">
                {responseList.title && responseList.tag ? (
                    <h2>
                      {responseList.title} #{responseList.tag}
                    </h2>
                  ) : (
                    <Skeleton
                      width={"18rem"}
                      height={"2rem"}
                      borderRadius={"0.5rem"}
                    />
                  )}

                  <div className="item_info_counts">
                  {responseList.views ? (
                      <div className="item_info_views">
                        <i className="fa fa-eye"></i>
                        <span>{responseList.views}</span>
                      </div>
                    ) : (
                      <div className="item_info_views">
                        <Skeleton
                          width={"0rem"}
                          height={"0rem"}
                          borderRadius={"9999px"}
                        />
                      </div>
                    )}

                    {responseList.likes ? (
                      <div
                        className="item_info_like"
                        onClick={() => {
                          handleLike();
                        }}
                      >
                        <i
                          className="fa fa-heart"
                          style={{ color: `${likeColor}` }}
                        ></i>
                        <span>{likeCount}</span>
                      </div>
                    ) : (
                      <div className="item_info_like">
                        <Skeleton
                          width={"0rem"}
                          height={"0rem"}
                          borderRadius={"9999px"}
                        />
                      </div>
                    )}
                  </div>
                  {responseList.description ? (
                    <p>{responseList.description}</p>
                  ) : (
                    <Skeleton
                      width={"40rem"}
                      height={"6rem"}
                      borderRadius={"1rem"}
                    />
                  )}
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                        {responseList.ownerId && responseList.ownerImage ? (
                            <Link to={`/author/${responseList.ownerId}`}>
                              <img
                                className="lazy"
                                src={responseList.ownerImage}
                                alt=""
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          ) : (
                            <Skeleton
                              width={"3rem"}
                              height={"3rem"}
                              borderRadius={"9999px"}
                            />
                          )}
                        </div>
                        <div className="author_list_info">
                        {responseList.ownerId && responseList.ownerImage ? (
                            <Link to={`/author/${responseList.ownerId}`}>
                              {responseList.ownerName}
                            </Link>
                          ) : (
                            <Skeleton
                              width={"4rem"}
                              height={"1rem"}
                              borderRadius={"0.25rem"}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                        {responseList.creatorId &&
                          responseList.creatorImage ? (
                            <Link to={`/author/${responseList.creatorId}`}>
                              <img
                                className="lazy"
                                src={responseList.creatorImage}
                                alt=""
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          ) : (
                            <Skeleton
                              width={"3rem"}
                              height={"3rem"}
                              borderRadius={"9999px"}
                            />
                          )}
                        </div>
                        <div className="author_list_info">
                        {responseList.creatorId &&
                          responseList.creatorImage ? (
                            <Link to={`/author/${responseList.creatorId}`}>
                              {responseList.creatorName}
                            </Link>
                          ) : (
                            <Skeleton
                              width={"4rem"}
                              height={"1rem"}
                              borderRadius={"0.25rem"}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    {responseList.price ? (
                      <div className="nft-item-price">
                        <img src={EthImage} alt="" />
                        <span>{responseList.price}</span>
                      </div>
                    ) : (
                      <div className="item_info_like">
                        <Skeleton
                          width={"6rem"}
                          height={"2rem"}
                          borderRadius={"0.5rem"}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
