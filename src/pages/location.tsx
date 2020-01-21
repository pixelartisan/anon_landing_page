import React from 'react';
import Helmet from 'react-helmet';

const axios = require('axios');
// Constants
import NavBar from '../components/navbar';
import MenuItem from '../components/navbar/secondaryMenuItem';
import Footer from '../components/footer';
import Extra from '../components/extra';
import ProductsHero from '../components/hero/productsHero';
import Pricing from '../components/pricing';
import Features from '../components/features';
import Reviews from '../components/reviews';
import '../styles/components/products.scss';
// Constants
import {
    SEO_DESCRIPTION,
    SEO_KEYWORDS
} from '../settings';

import {DEFAULT_TAG, LOCATIONS_URL} from "../constants";
import requestHandler from "../utils/request";
import get from 'lodash/get';
import {setLocationsData} from '../actions';

interface Props {

}

interface State {

}

interface CountryData {

}


class LocationPage extends React.Component<Props, State, CountryData> {
    constructor(props: Props) {
        super(props);


    }

    render() {
        const search = this.props.location.search; // could be '?foo=bar'
        const params = new URLSearchParams(search);
        const locationName = params.get('location'); // location
        const productName = params.get('product'); // location

        var self = this;
        axios.get(LOCATIONS_URL)
            .then(function (response) {
                // handle success
                const continents = response.data.data.continents;
                for (let i = 0; i < continents.length; i++) {
                    const {countries} = continents[i];

                    for (let e = 0; e < countries.length; e++) {

                        if (countries[e].name == locationName) {

                            self.countryData = countries[e];
                        }

                    }
                }
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });


        var productNameHuman = 'Proxy';
        switch (productName) {
            case 'shared_proxy':
                productNameHuman = 'shared proxy';
                break;
            case 'shared_socks':
                productNameHuman = 'shared SOCKS5';
                break;
            case 'socks':
                productNameHuman = 'dedicated SOCKS5';
                break;
            case 'proxy':
                productNameHuman = 'dedicated proxy';
                break;

        }
        const pageTitle = locationName + ' ' + productNameHuman;
        const btnTitle = 'Buy ' + locationName + ' ' + productNameHuman;

        var cityCount = 0;
        var citiesString = '';
        var citiesStringNames = '';

        cityCount = this.countryData['states'].length;

        var cityPural = 'city';
        if(cityCount > 1){
            cityPural = 'cities';
        }
        for (let e = 0; e < self.countryData['states'].length; e++) {
            if (e == 0) {
                citiesString += self.countryData['states'][e]['name'];
            } else {
                citiesString += ', ' + self.countryData['states'][e]['name'];
            }
        }


        return (
            <React.Fragment>
                <Helmet>
                    <title>Http proxies</title>
                    <meta name="description" content={SEO_DESCRIPTION}/>
                    <meta name="keywords" content={SEO_KEYWORDS}/>
                </Helmet>

                <ProductsHero title={pageTitle} btnText={btnTitle}>
                    Buy {productNameHuman} from {locationName} !
                    If you're looking to purchase {productNameHuman} from {locationName} look no further because we have
                    them
                    available in our
                    stock. {locationName} {productNameHuman} locations
                    include <span>{cityCount} {cityPural} in total: {citiesString}.</span>
                </ProductsHero>


                <Extra/>

                <Footer/>
            </React.Fragment>
        );
    }
}

export default LocationPage;
