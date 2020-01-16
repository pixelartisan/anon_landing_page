import React, { Component } from 'react';
import requestHandler from '../../utils/request';
import {LOCATIONS_URL} from '../../constants';

import data from "../../locations.json";

const contintentsList = data.continents;



class Contintents extends Component {

	console.log(contintentsList);
}
export default Contintents;
