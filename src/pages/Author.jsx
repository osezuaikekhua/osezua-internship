import { useState, useEffect } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const [responseList, setresponseList] = useState([]);
  const [followState, setfollowState] = useState("Follow");
  const [followCount, setfollowCount] = useState(0);

  let authorsApiLink = process.env.REACT_APP_FES_API;

  const { authorID } = useParams();

  useEffect(() => {
    fetchApiData(`${authorsApiLink}/authors?author=${authorID}`);
  }, []);

  useEffect(() => {
    setfollowCount(responseList.followers);
  }, [responseList]);

  async function fetchApiData(api) {
    let response = await axios.get(api);
    let responseData = await response.data;
    setresponseList(responseData);
  }

  function handleFollow() {
    if (followState === "Follow") {
      setfollowCount(followCount + 1);
      setfollowState("Unfollow");
    } else if (followState === "Unfollow") {
      setfollowCount(followCount - 1);
      setfollowState("Follow");
    }
  }
  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                    {responseList.authorImage ? (
                        <img src={responseList.authorImage} alt="" />
                      ) : (
                        <Skeleton
                          width={"9rem"}
                          height={"9rem"}
                          borderRadius={"9999px"}
                        />
                      )}
                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                        {responseList.authorName ? (
                            `${responseList.authorName}`
                          ) : (
                            <Skeleton
                              width={"12rem"}
                              height={"1.5rem"}
                              borderRadius={"9999px"}
                            />
                          )}

                          <span className="profile_username">
                            {responseList.tag ? (
                              `@${responseList.tag}`
                            ) : (
                              <Skeleton
                                width={"6rem"}
                                height={"1rem"}
                                borderRadius={"9999px"}
                              />
                            )}
                          </span>
                          <span id="wallet" className="profile_wallet">
                          {responseList.address ? (
                              `${responseList.address}`
                            ) : (
                              <Skeleton
                                width={"12rem"}
                                height={"1rem"}
                                borderRadius={"9999px"}
                              />
                            )}
                          </span>
                          <button
                            id="btn_copy"
                            title="Copy Text"
                            onClick={() => {
                              navigator.clipboard.writeText(
                                responseList.address
                              );
                            }}
                          >
                            Copy
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                    <div className="profile_follower">
                        {followCount ? (
                          `${followCount} followers`
                        ) : (
                          <Skeleton
                            width={"6rem"}
                            height={"1rem"}
                            borderRadius={"9999px"}
                          />
                        )}
                      </div>
                      <Link
                        to="#"
                        className="btn-main"
                        onClick={() => {
                          handleFollow();
                        }}
                      >
                        {followState}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                <AuthorItems
                    nftCollection={responseList.nftCollection}
                    authorImage={responseList.authorImage}
                    authorID={authorID}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
