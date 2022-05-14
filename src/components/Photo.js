import React from 'react';
import NotFound from './NotFound';
import StatsForm from './StatsForm';

// `Line` component renders the list of images in the 'data' prop.

const Line = (props) => {
  return (
      <li>
        <img src={`https://farm${props.farm}.staticflickr.com/${props.server}/${props.photoId}_${props.secret}.jpg`} alt={props.alt} />
      </li>
    )
}

/*
`Photos` component renders Line and other HTML to display photos.
1   The conditional statement checks if results were found. if yes it renders reults or `NotFound`
    component. it does through allocating the component to `gallery` variable.
2   `StatsForm ` component displays search result stats such as total results found, pages and number
    of photos per page. it also allows the user to navigate search results and change the number of
    results per page.
*/

const Photos = (props) => {

  let gallery;                          //1

  if ( props.data.length > 0 ) {        //1
    gallery = props.data.map( photo =>
      <Line
        key={photo.id}
        farm={photo.farm}
        server={photo.server}
        photoId={photo.id}
        secret={photo.secret}
        alt={photo.title}
      />
    )
  } else {
    gallery = <NotFound />
  }
  return (
    <div className="photo-container">
      <h2>{props.searchFilter} Photos</h2>
      <StatsForm                              //2
        text={props.searchFilter}
        total={props.total}
        page={props.page}
        pages={props.pages}
        perpage={props.perpage}
      />
      <ul>
        { gallery }
      </ul>
    </div>
  )
}

export default Photos
