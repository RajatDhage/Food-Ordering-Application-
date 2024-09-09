import axios from "axios"
import { CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CREATE_PAYMENT_REQUEST,
 MY_ORDER_FAIL, MY_ORDER_REQUEST, MY_ORDER_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, CLEAR_ERRORS, ORDER_DETAILS_SUCCESS, CREATE_PAYMENT_FAIL} from "../constants/orderConstant"


export const createOrder = (session_id) => async(dispatch)=>{
    try {
        dispatch({
            type:CREATE_ORDER_REQUEST,
        })

        const config = {
            headers: {
                "Content-Type" : "application/json"
            }
        }

        const {data} = await axios.post("/api/v1/eats/orders/new", {session_id}, config);

        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.response.data.message,
        })
    }
};


export const payment = (items, restaurant) => async(dispatch)=>{
    try {
        dispatch({
            type: CREATE_PAYMENT_REQUEST
        })

        const config = {
            headers: {
                "Content-Type" : "application/json"
            },
        }

        const {data} = await axios.post("/api/v1/payment/process", {items, restaurant}, config);

        if(data.url){
            window.location.href = data.url;   //wherever user currently is on(on any page), he will redirected to stripe url
        }

    } catch (error) {
        dispatch({
            type: CREATE_PAYMENT_FAIL,
            payload: error.response.data.message,
        })
    }
};


export const myOrder = () => async(dispatch)=>{
    try {
        dispatch({
            type: MY_ORDER_REQUEST,
        })

        const {data} = await axios.get("/api/v1/eats/orders/me/myOrders");
        
        dispatch({
            type: MY_ORDER_SUCCESS,
            payload: data.orders,
        })
    } catch (error) {
        dispatch({
            type: MY_ORDER_FAIL,
            payload: error.response.data.message,
        })
    }
};

export const getOrderDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST
        });

        const { data } = await axios.get(`/api/v1/eats/orders/${id}`);

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data.order
        });
    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    }
};


export const clearErrors = () => async(dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    })
}