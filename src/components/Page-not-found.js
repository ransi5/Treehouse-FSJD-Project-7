import React from 'react';
import { NavLink } from "react-router-dom";

const PageNotFound = (props) => {
  return (
    <div>
    <h1> Error code 404</h1>
      <h2>Page Not Found</h2>
      <h3><NavLink to='/' >Click here</NavLink> to return to phtotos search page</h3>
    </div>
  )
}

export default PageNotFound
