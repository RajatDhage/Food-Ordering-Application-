import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addItemToCart, removeItemFromCart, updateCartQuantity } from "../../actions/cartAction";

const FoodItem = ({fooditem, restaurant}) => {
  const alert = useAlert();

  const [quantity, setQuantity] = useState(1);
  const [showButtons, setShowButtons] = useState(false);

  const {isAuthenticated, user} = useSelector((state)=>state.auth);
  // how this(destructuring) actually looks like

  // const authentication = useSelector(state => state.auth.isAuthenticated);  
  // const user2 = useSelector(state => state.auth.user);  

        //-->useSelector() is used to access data(state variables) from store
        // state.auth is object and we are getting values from the object
        //state.auth is an object in the Redux store, isAuthenticated: Boolean indicating if the user is logged in.
        //user: Contains user details.
        // useDispatch(): This hook returns the dispatch function, which is used to send actions to the Redux store.


  //to reduce no. of variables and confusion we do destructuring


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.cartItems);
  //cartItems: Contains all items currently in the user's cart, fetched from the Redux store's state.cart.

  useEffect(()=>{
    const cartItem = cartItems.find(  
      (item) => item.foodItem._id === fooditem._id
    );

    if(cartItem){
      setQuantity(cartItem.quantity);
      setShowButtons(true);
    }else{
      setQuantity(1);
      setShowButtons(false);
    }
  }, [cartItems, fooditem])


  const increaseQty = () => {
    if(quantity < fooditem.stock){
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);

      dispatch(updateCartQuantity(fooditem._id, newQuantity, alert));
    }else{
      alert.error("Exceed stock limit");
    }
  }

  const decreaseQty = ()=>{
    if(quantity > 1){
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);

      dispatch(updateCartQuantity(fooditem._id, newQuantity, alert));
    }else{
      setQuantity(0);
      setShowButtons(false);

      dispatch(removeItemFromCart(fooditem._id));  ///dispatch is the action what we want to do
      // like we are calling removeItemFromCart here 
    }
  };

  const addToCartHandler = () =>{
    if(!isAuthenticated && !user){
      return navigate("/users/login");
    }

    if(fooditem && fooditem._id){
      dispatch(addItemToCart(fooditem._id, restaurant, quantity, alert));
      setShowButtons(true);
    }else{
      console.error("Food item id is not defined");
    }
  }

  return (
    <div className="col-sm-12 col-md-6 col-lg-3 my-3">
        <div className="card p-3 rounded">
          <img
            src={fooditem.images[0].url}
            alt={fooditem.name}
            className="card-img-top mx-auto"
          />

          {/* Heading and descriptin */}
          <div className="card-body d-flex flex-column">
            <h5 className="card-title">{fooditem.name}</h5>
            <p className="fooditem_des">
              {fooditem.description}
            </p>

            <p className="card-text">
              <FaIndianRupeeSign /> {fooditem.price}
              <br />
            </p>

            

            {
              !showButtons ? (
                <button type="button"  id="cart_btn" className="btn btn-primary d-inline ml-4" onClick={addToCartHandler} disabled={fooditem.stock === 0}>Add To Cart</button>
              ) : (
                <div className="stockCounter d-inline">
                  <span className="btn btn-danger minus" onClick={decreaseQty}>
                    -
                  </span> 

                  <input type="number" className="form-control count d-inline" value={quantity} readOnly/>

                  <span className="btn btn-primary plus" onClick={increaseQty}>
                    +
                  </span> 
                </div>
              )
            }

            <br />

            <p>Status: 
                <span id="stock_status" className={fooditem.stock ? "greenColor" : "redColor"}>
                    {fooditem.stock ? "In Stock" : "Out of Stock"}
                </span>
            </p>

          </div>
        </div>
      </div>
  );
};

export default FoodItem;
