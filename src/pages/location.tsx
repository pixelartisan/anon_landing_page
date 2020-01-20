import React from 'react';
import Helmet from 'react-helmet';
import {connect} from "react-redux";


interface State {
    selectedProduct: string,
    selectedProductType: string,
    selectedTag: {
        value: string,
        label: string
    }
}


// Components
import Footer from '../components/footer';
import Extra from '../components/extra';
import ProductsHero from '../components/hero/productsHero';

// Scss
import '../styles/components/products.scss';

// Constants
import {
    SEO_DESCRIPTION,
    SEO_KEYWORDS
} from '../settings';
import {ILocationsResponse, ICitiesResponse, ICountries} from '../interfaces';
import {DEFAULT_TAG, LOCATION_ROUTE, LOCATIONS_URL} from "../constants";
import requestHandler from "../utils/request";
import LocationText from "../components/locationtext";


const search = document.location.search; // could be '?foo=bar'
const params = new URLSearchParams(search);
const locationName = params.get('location'); // location
const productName = params.get('product'); // location


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



const LocationPage = () => (
    <React.Fragment>
        <Helmet>
            <title>Http proxies</title>
            <meta name="description" content={SEO_DESCRIPTION}/>
            <meta name="keywords" content={SEO_KEYWORDS}/>
        </Helmet>

        <ProductsHero title={pageTitle} btnText={btnTitle}>
            Buy {productNameHuman} from {locationName} !
            If you're looking to purchase {productNameHuman} from {locationName} look no further because we have them
            available in our
            stock. {locationName} {productName} locations include <LocationText/>
        </ProductsHero>



        <Extra/>

        <Footer/>
    </React.Fragment>
);

export default LocationPage;
