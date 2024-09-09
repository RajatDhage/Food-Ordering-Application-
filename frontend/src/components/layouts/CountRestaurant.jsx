import React, { useEffect } from "react";
import {getRestaurants} from "../../actions/restaurantAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";

const CountRestaurant = () => {
  const dispatch = useDispatch();
  const {loading, error, count, showVegOnly, pureVegRestaurantsCount} = useSelector((state) => state.restaurants);

  // to get the details from redux Store, we can directly get the count by using props, but in order to get it from store we will use this, this is small application but if our app is large scale thhen we have to do this only
  useEffect(()=>{
    dispatch(getRestaurants());
  }, [dispatch]);

  return (
    <div>
      {loading ? (<Loader />) : error ? (<p>Error: {error}</p>) : 
        (
          <p className="NumOfRestro">
          {showVegOnly ? pureVegRestaurantsCount : count} <span className="Restro">
            {
              showVegOnly ? pureVegRestaurantsCount === 1 ? "Restaurant" : "Restaurants" : count === 1 ? "Restaurant" : "Restaurants"
            }
          </span>
        </p>
        )
      }
      
      <hr />
    </div>
  )
};

export default CountRestaurant;















