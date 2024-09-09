// import { act } from "react";
import { ALL_RESTAURANTS_FAIL, ALL_RESTAURANTS_REQUEST, ALL_RESTAURANTS_SUCCESS, CLEAR_ERROR, SORT_BY_RATINGS, SORT_BY_REVIEWS, TOGGLE_VEG_ONLY } from "../constants/restaurantConstant";

//step1: intialState defination
const initialState = {         /// it is nothing but intial store
    restaurants : [],            // this is the state we are talking about and will be stored in STORE
};


// step2 : reducer function
//arguments: current state and action object descriving what happened
export const restaurantReducer = (state = initialState, action)=>{
    switch(action.type){
        case ALL_RESTAURANTS_REQUEST:
            return{
                ...state,                 /// here we are returning all from state i.e restaurants array
                loading: true,
                error: null
            };
        
        case ALL_RESTAURANTS_SUCCESS:
            return{
                ...state,
                loading: false,
                count : action.payload.count,   // payload is like sending the data, pay the load 
                restaurants: action.payload.restaurants,  //all restaurants are here, so we are using this restaurant here after cases
            };

        case ALL_RESTAURANTS_FAIL:
            return{
                ...state,
                loading: false,
                error: action.error,
            };

        case SORT_BY_RATINGS:
            return{
                ...state,
                restaurants : [...state.restaurants].sort(
                    (a, b) =>  b.ratings - a.ratings
                ),
            };

        case SORT_BY_REVIEWS:
            return{
                ...state,
                restaurants: [...state.restaurants].sort(
                    (a, b) => b.numOfReviews - a.numOfReviews
                ),
            };

        case TOGGLE_VEG_ONLY:
            return{
                ...state,
                //1. so here, showVegOnly is used as toggle, when Pure Veg is showing on screen it is true and when the button is pressed it make it false as we are further going to change it to show all
                //2. it is basically used for toggle, when pressed false, again pressed true and on the basis of this result we will further show the results as
                //3. in case of showVegOnly: true, it will show all button and when we press it, it will show all the pure veg restaurants only making it false
                // 4. calculatePureVegCount is middleware(nothing just used another function so technical terminology for these type of functions is middleware fun), it calculates the no. of restaurants and will be helpful to showing no. of resta.
                showVegOnly: !state.showVegOnly,  
                pureVegRestaurantsCount : calculatePureVegCount( 
                    state.restaurants,
                    !state.showVegOnly
                )
            }

        case CLEAR_ERROR : 
            return{
                ...state,
                error: null,  // it is just clearing the error i.e making them null
            }

        default:
            return state;
    };
};


/// defination of middleware fun calculateP....
const calculatePureVegCount = (restaurants, showVegOnly) =>{
    if(!showVegOnly){ //so when all restaurants are showing
        return restaurants.length;
    }else{
        return restaurants.filter((restaurant)=> restaurant.isVeg).length;
    }
}