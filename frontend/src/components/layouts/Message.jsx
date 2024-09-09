import React from "react";

// children is everything that is in between component
/// ex. <Message> {restaurantError} </Message> 
/// here restaurantError is a children
const Message = ({variant, children}) => {
  return (
    <div className={`alert alert-${variant}`}>
      {children}
    </div>
  )
};

export default Message;


/// error will be showed/ displayed using this component
/// to display error on screen