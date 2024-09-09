import axios from "axios"
import { ADD_TO_CART, FETCH_CART, REMOVE_ITEM_CART, UPDATE_CART_ITEM } from "../constants/cartConstant";
import FoodItem from "../components/layouts/FoodItem";
import Restaurant from "../components/layouts/Restaurant";

export const fetchCartItems = (alert) => async(dispatch) => {
    try {
        const response = await axios.get("/api/v1/eats/cart/get-cart");  
        dispatch({
            type: FETCH_CART,
            payload: response.data.data,
        });
    } catch (error) {
        console.error("Fetch cart error:" ,error);
        if(alert){
            alert.info("Cart is hungry");
        }
    }
}


//ADD To cart

//what happend when we click ADD to kart, 
// we take everything foodItemID, restaurant, quantity and give it to backend via API
export const addItemToCart = (foodItemId, restaurant, quantity, alert) => async(dispatch, getState) => {
    try {
        const { user } = getState().auth;  //getState() return the current state tree of application
        // so we are obtaining the user from authentication(this is obtained by auth tree)

        const response = await axios.post("/api/v1/eats/cart/add-to-cart", {
            userId : user._id,  
            foodItemId,
            restaurantId: restaurant,
            quantity,
        });

        alert.success("Item added to cart!", response.data.cart);
        dispatch({
            type: ADD_TO_CART,
            payload: response.data.cart,
        })

    } catch (error) {   
        alert.error(error.response ? error.response.data.message : error.message);
    }
};

//update cart item quantity
// updating the cart items an all
export const updateCartQuantity = (foodItemId, quantity, alert) => async(dispatch, getState)=>{
    try {
        const {user} = getState().auth;

        if(typeof(foodItemId) === "object"){
            foodItemId = foodItemId._id;  //converting object into normal id
        }

        const response = await axios.post("/api/v1/eats/cart/update-cart-item", {
            userId : user._id,  
            foodItemId,
            quantity,
        });

        dispatch({
            type: UPDATE_CART_ITEM,
            payload: response.data.cart,
        })

    } catch (error) {
        alert.error(error.response ? error.response.data.message : error.message);        
    }
}


//remove items from cart
// data removed from mongodb
export const removeItemFromCart = (foodItemId) => async(dispatch, getState) =>{
    try {
        const {user} = getState().auth;

        if(typeof(foodItemId) === "object"){
            foodItemId = foodItemId._id;  //converting object into normal id
        }

        const response = await axios.delete("/api/v1/eats/cart/delete-cart-item", {
            data: {userId: user._id, foodItemId},
        });

        dispatch({
            type: REMOVE_ITEM_CART,
            payload: response.data,
        })
        
    } catch (error) {
        alert.error(error.response ? error.response.data.message : error.message);
    }
}