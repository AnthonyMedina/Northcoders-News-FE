import React, { Component } from "react";
// import PT from 'prop-types';

class Search extends Component {
  state = {
    searchTerm: ""
  };

  handleChange = e => {
    this.setState({
      searchTerm: e.target.value
    });
    this.props.doSearch(e.target.value);
  };

  render() {
    return (
      <div className="my-5">
        <input
          type="text"
          name="search"
          placeholder={`Search ${this.props.type}...`}
          onChange={this.handleChange}
          value={this.state.searchTerm}
        />
      </div>
    );
  }

  static propTypes = {};
}

export default Search;
