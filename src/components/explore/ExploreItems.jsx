import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NftCard from "../UI/NftCard";

const ExploreItems = () => {
  const [responseList, setresponseList] = useState([]);
  const [renderlimit, setrenderlimit] = useState(8);
  const exploreApiLink = process.env.REACT_APP_FES_API;

  useEffect(() => {
    fetchApiData(`${exploreApiLink}/explore`);
  }, []);

  async function fetchApiData(api) {
    let response = await axios.get(api);
    let responseData = await response.data;
    setresponseList(responseData);
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setresponseList((prev) => [...prev]);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  function handleValueChange(event) {
    const FilterValue = event.target.value;
    fetchApiData(`${exploreApiLink}/explore?filter=${FilterValue}`);
    setrenderlimit(8);
  }



 
  return (
    <>
      <div>
      <select id="filter-items" defaultValue="" onChange={handleValueChange}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {responseList.slice(0, renderlimit).map((item, index) => (
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
          style={{ display: "block", backgroundSize: "cover" }}
        />
      ))}
        {renderlimit < responseList.length ? (
        <div className="col-md-12 text-center">
          <Link
            to=""
            id="loadmore"
            onClick={() => {
              setrenderlimit(renderlimit + 4);
            }}
            className="btn-main lead"
          >
            Load more
          </Link>
        </div>
      ) : null}
    </>
  );
};

export default ExploreItems;
