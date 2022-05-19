import React from 'react';
import { NavLink } from "react-router-dom";

// `FilterLink` component renders the list items in the `filters` prop.

const FilterLink = (props) => {
  return (
      <li><NavLink to={props.link} >{props.filterName}</NavLink></li>
  );
}

/*
`Nav` component renders the links in FilterLink compnent and render navigation bar for quick search.
1   maps 'filters' prop to render the navigation links.
*/

const Nav = (props) => {

  return (
    <nav className="main-nav">
      <ul>
        {
          props.filters.map( filter =>        //1
            <FilterLink key={filter.id} link={'/' + filter.value +'?search=' + filter.value} filterName={filter.value}  />
          )
        }
      </ul>
    </nav>
  );
}

export default Nav
