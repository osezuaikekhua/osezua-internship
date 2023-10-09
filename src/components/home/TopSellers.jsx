import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import axios from "axios";
import Skeleton from "../UI/Skeleton";

const TopSellers = () => {
  const [responseList, setresponseList] = useState([]);
  const topsellersApiLink = process.env.REACT_APP_FES_API;

  useEffect(() => {
    fetchApiData(`${topsellersApiLink}/topSellers`);
  }, []);

  async function fetchApiData(api) {
    let response = await axios.get(api);
    let responseData = await response.data;
    setresponseList(responseData);
  }


  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
            {responseList.length
                ? responseList.map((item, index) => (
                    <li key={index}>
                      <div className="author_list_pp">
                        <Link to={`/author/${item.authorId}`}>
                          <img
                            className="lazy pp-author"
                            src={item.authorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to={`/author/${item.authorId}`}>
                          {item.authorName}
                        </Link>
                        <span>{item.price} ETH</span>
                      </div>
                    </li>
                  ))
                : Array(12)
                    .fill(0)
                    .map((_, index) => (
                      <li key={index}>
                        <div className="author_list_pp">
                          <Link to="">
                            <Skeleton
                              width={"3rem"}
                              height={"3rem"}
                              borderRadius={"9999px"}
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to="">
                            <Skeleton
                              width={"6rem"}
                              height={"1rem"}
                              borderRadius={"9999px"}
                            />
                          </Link>
                          <span>
                            <Skeleton
                              width={"3rem"}
                              height={"1rem"}
                              borderRadius={"9999px"}
                            />
                          </span>
                        </div>
                      </li>
                    ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
