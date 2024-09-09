//// redux Action part(logical part) will be written here

import { ALL_RESTAURANTS_FAIL, ALL_RESTAURANTS_REQUEST, ALL_RESTAURANTS_SUCCESS, CLEAR_ERROR, SORT_BY_RATINGS, SORT_BY_REVIEWS, TOGGLE_VEG_ONLY } from "../constants/restaurantConstant";
import axios from "axios";

export const getRestaurants = () => { 
    return async (dispatch) => {              //dispatch got from constants,   dispatch === giving order
        try {
            dispatch({ type: ALL_RESTAURANTS_REQUEST });
            let link = "/api/v1/eats/stores";
            const { data } = await axios.get(link);   //if any error happens, goes to catch
            const { restaurants, count } = data;   /// we got all restaurants and their count

            dispatch({
                type: ALL_RESTAURANTS_SUCCESS, 
                payload: { restaurants, count }   //payload dispatched
            });
        } catch (err) {
            dispatch({
                type: ALL_RESTAURANTS_FAIL,
                payload: err.response.data.message,       // coming from axios(if api fetch errors)
            })
        }
    };
};

export const sortByRatings = ()=>{
    return{
        // dispatch is not written as it is used for data transfer or updation
        type: SORT_BY_RATINGS,
    };
};

export const sortByReviews = () =>{
    return{
        type: SORT_BY_REVIEWS,
    }
};

export const toggleVegOnly = () =>{
    return{
        type: TOGGLE_VEG_ONLY,
    };
};

export const clearError = () =>{
    return{
        type: CLEAR_ERROR,
    }
}

// export default {getRestaurants, sortByRatings, sortByReviews, toggleVegOnly, clearError};

// if export default {} is written then differnt way to import
// and if direct export const clearError() .. is written then different



/// this is a Redux action creator function in a React application. The purpose of this code is to fetch a list of restaurants from an API and then dispatch relevant actions based on the result.