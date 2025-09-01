import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

const RequireAuth = ({allowedRoles}) => {

 

    const {isLoggedIn, role} = useSelector((state) => state.auth);

     console.log("isLoggedIn:", isLoggedIn, "role:", role);

  return isLoggedIn && allowedRoles.find((myrole) => myrole == role) ? (
    // if user is loggedIn as ADMIN
    <Outlet />
    // Outlet Component done; is this requireAuth component will be taking some child route component now if the requireAuth parameter is good if these conditions are good and we render the outlet means that corresponding route will be properly shown   
  ) : isLoggedIn ? 
  // if user is loggedIn as USER
    (<Navigate to="denied"/>) : 
    // if user is not loggedIn 
    (<Navigate to="/signin" />)
}

export default RequireAuth

// RequireAuth is going to kind of like allow or disallow like bunch of pages or bunch of routes for a user if the user  isLoggedIn and the role of the user is available in the allowed role then we are going to allow the user to access the page , render this outlet component and if the user isLoggedIn and the allowed role is not present then we are going to check 
    //  user isLoggedIn or not LoggedIn if the user was LoggedIn but there roles were not there thats why the statement was false then we are going to show them the denied page otherwise we are going to render the login page 
