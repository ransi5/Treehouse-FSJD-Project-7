import React, { useState, useEffect } from 'react'
import { useSearchParams, useParams } from 'react-router-dom'
import Nav from './Nav';
import Photos from './Photo';
import SearchForm from './SearchForm';
/*
This application is built using react router v6. As such there is no support and only
indirect means for using router in class components and allows use of state and other class
properties with hooks in functional components.
1   set up searchParams to get values from url.
2   get search param value for `filter` variable from url. regardless whether the url is /(filter) or /(filter?search=value)
3   `performSearch` function accepts 3 arguments for making api requests to flickr and updates app state.
4   `handleFilterChange` function to set up app state and run `performSearch` function.
5   `useEffect` from react router v6 works same as 'componentDidMount'. it runs the 'handleFilterChange'
    function on render.
6   conditional statement applies the loading placeholder while results are loading.
*/
const App = (props) => {
  var filter;
  let params = useParams();
  const [ searchParams, setSearchParams ] = useSearchParams(); //1
  
  if ( searchParams.get('search') ){                          //2
    filter = searchParams.get('search');
  } else {
    filter = params.filter;
  }
  let [ filters, setFilters ] = useState(
    [
      {
        id: 1,
        value: 'Rockies'
      },
      {
        id: 2,
        value: 'Himalayas'
      },
      {
        id: 3,
        value: 'Andes'
      }
    ]
  )
  let [ loading, setLoading ] = useState(true);
  let [ currentFilter, setCurrentFilter ] = useState(filter);
  let [ results, setResults ] = useState();
  let [ total, setTotal] = useState();
  let [ page, setPage ] = useState();
  let [ pages, setPages ] = useState();
  let [ perpage, setPerpage ]= useState();

  function performSearch(query = filter, qpage = 1, qperPage = 16) {    //3
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=08805f521d63ed67ed3f2b08c084449b&text=${query}&per_page=${qperPage}&content_type=1&page=${qpage}&format=json&nojsoncallback=1`)
      .then( res => res.json())
      .then( data => {
        setLoading(false);
        setResults(data.photos);
        setTotal(data.photos.total);
        setPage(data.photos.page);
        setPages(data.photos.pages);
        setPerpage(data.photos.perpage);
      } )
      .catch( error => console.log('error fetching and parsing sata', error))
  }

  function handleFilterChange(fil, pge, perPg) {      //4
    setLoading(true);
    performSearch(fil, pge, perPg);
    setCurrentFilter(fil);
  }

  useEffect(() => {                               //5
    let pg = searchParams.get('page');
    let ppg = searchParams.get('perPage');
    if ( !pg ) {
      pg = 1;
    }

    if ( !ppg ) {
      ppg = 16;
    }

    if ( filter != currentFilter || !results ) {
      handleFilterChange(filter, pg, ppg);
    }
  })

  return (

    <div className="container">

      <SearchForm
        searchFilter={filter}
      />

      <Nav
        filters={filters}
        navFilter={currentFilter}
      />

      {
        (loading)                             //6
        ?  <div className='placeholder'></div>
        : <Photos
            searchFilter={filter}
            data={results.photo}
            total={total}
            page={page}
            pages={pages}
            perpage={perpage}
          />
        }
    </div>
  );

}

export default App;
