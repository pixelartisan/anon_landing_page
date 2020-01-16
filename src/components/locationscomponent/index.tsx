import React, { Component } from 'react';
import requestHandler from '../../utils/request';
import {LOCATIONS_URL} from '../../constants';

import data from "../../locations.json";

const contintentsList = data.continents;



class Contintents extends Component {

	render() {
		return (
			<ul>
				{contintentsList.map(s => (<li>{s}</li>))}
			</ul>
		);
	}
}
export default Contintents;
