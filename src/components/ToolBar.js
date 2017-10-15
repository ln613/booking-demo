import React from 'react';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import util from '../utils/util';

const color = '#66AAFF';
const hoverColor = '#0065FF';

export default ({ style, pickDate, selectedDate, open, toggleSearch, toggleAdd }) =>
  <Toolbar style={style}>
    <ToolbarGroup firstChild={true}>
      <FlatButton
        onClick={pickDate}
        label={util.getMonthYear(selectedDate)}
        labelPosition="before"
        icon={
          <i className={`fa fa-chevron-${open ? 'up' : 'down'}`}
            style={{ color: hoverColor }}>
          </i>
        }
      />
    </ToolbarGroup>
    
    <ToolbarGroup>
      <FontIcon color={color} hoverColor={hoverColor}>
        <i className="fa fa-search" onClick={toggleSearch}></i>
      </FontIcon>
      <FontIcon color={color} hoverColor={hoverColor}>
        <i className="fa fa-plus" onClick={toggleAdd}></i>
      </FontIcon>
    </ToolbarGroup>
  </Toolbar>
