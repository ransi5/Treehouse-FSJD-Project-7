import React, { Component } from 'react';

// `Option` component renders the list of options for the select tag in `StatsForm` component.

const Option = (props) => {
  return(
    <>
    <option value={`${props.perpage}`} >
      {props.perpage}
    </option>
    </>
  )
}

/*
`StatsForm` component renders the stats use in the `Photos` compnent.
1   `query`, `page`, `perpage` variable used to get the value of form tags using 'ref'.
2   'perPage' state set to provide user options to see the number of photos per page.
3   `handleFilterSubmit` function used to submit the stats form to render selected page and per page options.
4   `changePage` function is fired when the value in `page` input field is changed.
    the conditional statement checks if value is within 1 and total pages returned by search.
    if value is less than 1 its set 'page' field value to 1.
    if its more than total pages it set the 'page' page field value to total pages.
    it then submits the form using the `handleFilterSubmit` submit function to render the page requested by user.
5   `handlePageChange` function changes the `page` filed value on click of increment and decrement butttons.
    it then runs the `changePage` function to validate the value and render the page requested by user
6   to render the `StatsForm` component.
7   the map statements loops through the `perPage` sate variable to display the options for `perPage` select field.
8   button not displayed as form submits on every value change of individual fields. less complexity and confusion for user.
*/

class StatsForm extends Component {

  query = React.createRef();            //1
  page = React.createRef();
  perpage = React.createRef();

  state = {                                       //2
    perPage: [16, 24, 32, 40, 48, 56, 64, 72, 80]
  }

  handleFilterSubmit = (e) => {                   //3
    e.preventDefault();
    document.forms["filterForm"].submit();
  }

  changePage = (e, numb = this.page.value) => {       //4
    e.preventDefault();
    let pageVal = parseInt(numb, 10);
    if ( pageVal > 0 && pageVal < (this.props.pages + 1) ) {
      this.page.value = pageVal;
    } else if ( pageVal < 1)  {
      return this.page.value = 1;
    } else if ( pageVal > this.props.pages ) {
      return this.page.value = this.props.pages;
    }
    this.handleFilterSubmit(e);
  }

  handlePageChange = (delta, e) => {                      //5
    e.preventDefault();
    let pageValue = parseInt(this.page.value, 10) + parseInt(delta, 10);
    this.changePage(e, pageValue)
  }

  render() {                                    //6
    return (
      <form className="result-stats" name="filterForm" method="get" action="/filter">
        <label htmlFor='search'>{this.props.total} results found for</label>
        <input
          type="text"
          name="search"
          defaultValue={this.props.text}
          className="stats-search"
          readOnly={true}
        />

        <label htmlFor="page">Page</label>
        <button
          className="decrement"
          onClick={(e)=>this.handlePageChange(-1, e)}
        >--</button>
        <input
          name="page"
          type='text'
          defaultValue={this.props.page}
          ref={pageno => this.page = pageno}
          onChange={(e) => this.changePage(e)}
        />
        <button
          className="increment"
          onClick={(e)=>this.handlePageChange(1, e)}
        >
        +
        </button> of {this.props.pages} pages.

        <label htmlFor="perPage">photos per page:</label>
            <select
              ref={perPg => this.perpage = perPg}
              defaultValue={this.props.perpage}
              name="perPage"
              onChange={(e) => this.handleFilterSubmit(e)}
            >
              {
                this.state.perPage.map(opt =>     //6
                  <Option
                    key={opt}
                    perpage={opt}
                  />
                )
              }

            </select>

        <button                                                 //8
          type="submit"
          className="search-button"
          onSubmit={e => this.handleFilterSubmit(e)}>Filter</button>
      </form>
    )
  }
}
export default StatsForm
