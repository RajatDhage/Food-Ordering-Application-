/// main file of components

import React, { useEffect } from "react";
import CountRestaurant from "./CountRestaurant";
import Restaurant from "./Restaurant";
import {getRestaurants, sortByRatings, sortByReviews, toggleVegOnly} from "../../actions/restaurantAction";
// import restaurantActions from "../../actions/restaurantAction"; // Import the actions object
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import Message from "./Message";

const Home = () => {
  const dispatch = useDispatch();

  // to extract data from STORE/ we are fetching the data
  // see in restaurant.Reducer, restaurants[] is an array, we are fetching it here
  const {
    loading: restaurantLoading,
    error: restaurantsError,
    restaurants,
    showVegOnly,
  } = useSelector((state) => state.restaurants);   //destructuring, means fetching these values from

  ///to store the restaurants
  useEffect(() => {
    dispatch(getRestaurants());
  }, [dispatch]);

  const handleSortByReview = () => {
    dispatch(sortByReviews());
  }

  const handleSortByRating = () =>{
    dispatch(sortByRatings());
  }

  const handleToggleVegOnly = () => {
    dispatch(toggleVegOnly());  
  }

  return (
    <>
      <CountRestaurant />

      {/* nested if else type */}
      {restaurantLoading ? <Loader /> : restaurantsError ? <Message variant="danger">{restaurantsError}</Message> : (
        <>
          <section>
          <div className="sort">
            <button className="sort_veg p-3" onClick={handleToggleVegOnly}>
              {showVegOnly ? "Show All" : "Pure Veg"}
            </button>
            <button className="sort_rev p-3" onClick={handleSortByReview}>Sort By Review</button>
            <button className="sort_rate p-3" onClick={handleSortByRating}>Sort By Ratings</button>
          </div>

          {/* Displaying Restaurants list */}
          <div className="row mt-4">
              {restaurants ? restaurants.map((restaurant)=>(
                !showVegOnly || (showVegOnly && restaurant.isVeg) ? (
                  <Restaurant key={restaurant._id} restaurant={restaurant} />
                ) : null
              )) : (<Message variant="info">No Restaurant Found</Message>) }
          </div>
          </section>
        </>
      ) }
    </>
  );
};

export default Home;
