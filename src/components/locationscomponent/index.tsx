import React, { Component } from 'react';
import requestHandler from '../../utils/request';
import {DEFAULT_TAG, LOCATIONS_URL, PRICES_URL} from '../../constants';

interface Props {
	doSetPrices(data: object): void,
	discounts?: object,
	prices?: object,
	billingCycles: Array<object>
}



class Contintents extends Component {
	constructor(props: Props) {
		super(props);

		this.state = {
			selectedBillingCycle: 1,
			selectedProduct: 'proxy',
			selectedProductType: 'dedicated',
			selectedQuantity: 10,
			selectedTag: DEFAULT_TAG
		};
	}

	render() {
		const { contintentsList } = this.props;

		requestHandler(LOCATIONS_URL)
			.then(({ data, error }) => {
				if (error) {
					console.error(error);
					return;
				}

				contintentsList(data);
			})
			.catch(console.error);
		return (
			<ul>
				{contintentsList.map(s => (<li>{s}</li>))}
			</ul>
		);
	}
}
export default Contintents;
