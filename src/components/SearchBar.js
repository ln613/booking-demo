import React from 'react';
import PropTypes from 'prop-types';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

const SearchBar = ({ style, search, toggleSearch }) =>
  <Toolbar style={style}>
    <ToolbarGroup style={{ width: '100%' }}>
      <TextField hintText="Search" onChange={search} />
      <FlatButton onClick={toggleSearch} label="Cancel" />
    </ToolbarGroup>
  </Toolbar>

export default SearchBar;

SearchBar.propTypes = {
  style: PropTypes.object.isRequired,
  search: PropTypes.func.isRequired,
  toggleSearch: PropTypes.func.isRequired
};