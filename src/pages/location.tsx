import React from 'react';
import Helmet from 'react-helmet';

const axios = require('axios');
// Constants

import Footer from '../components/footer';
import Extra from '../components/extra';
import ProductsHero from '../components/hero/productsHero';
import '../styles/components/products.scss';
// Constants
import {
    SEO_DESCRIPTION,
    SEO_KEYWORDS
} from '../settings';

import {DEFAULT_TAG, LOCATIONS_URL} from "../constants";

import {ICountries, ILocationsResponse} from "../interfaces";
import requestHandler from "../utils/request";
import {setLocationsData} from "../actions";
import {connect} from "react-redux";

interface Props {
    doSetLocationsData(data: object): void,

    hide(): void,

    show(any): void,

    countries: ICountries,
    allAvailableTags: Array<string>

}

interface State {

}

interface countryInfo {

}


class LocationPage extends React.Component<Props, State, countryInfo> {
    constructor(props: Props) {
        super(props);
        this.countryInfo = {};
        this.state = {
            text: "",

        };
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

                            self.countryInfo = countries[e];
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

    }

    componentDidMount() {
        const {doSetLocationsData} = this.props;

        requestHandler(LOCATIONS_URL)
            .then(({data, error}) => {
                if (error) {
                    console.error(error);
                    return;
                }



            })
            .catch(console.error);
    }


    changeMyVariable(value = '0sds'){
        return value;
    }

    render() {

        const search = this.props.location.search; // could be '?foo=bar'
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

        var cityCount = 0;
        var citiesString = '';
        var citiesStringNames = '';
        var cityPural = 'city';


        const dat = this;
        setTimeout(function () {


            cityCount = dat.countryInfo.states.length;

            if (cityCount > 1) {
                cityPural = 'cities';
            }
            for (let e = 0; e < cityCount; e++) {
                if (e == 0) {
                    citiesString += dat.countryInfo.states[e]['name'];
                } else {
                    citiesString += ', ' + dat.countryInfo.states[e]['name'];
                    //dat.state.text.update =  cityCount+' '+cityPural+' in total: '+citiesString;


                }
            }
            dat.setState({text: cityCount+' '+cityPural+' in total: '+citiesString});

        }, 2000);



        const text = '';
        const canonical = this.props.location.href;
        return (
            <React.Fragment>
                <Helmet>
                    <title>Http proxies</title>
                    <meta name="description" content={SEO_DESCRIPTION}/>
                    <meta name="keywords" content={SEO_KEYWORDS}/>
                    <link rel="canonical" href={canonical} />
                </Helmet>

                <ProductsHero title={pageTitle} btnText={btnTitle}>
                    Buy {productNameHuman} from {locationName} !
                    If you're looking to purchase {productNameHuman} from {locationName} look no further because we have
                    them
                    available in our
                    stock. {locationName} {productNameHuman} locations
                    include <span>{this.state.text}.</span>

                </ProductsHero>


                <Extra/>

                <Footer/>
            </React.Fragment>
        );
    }
}


export default LocationPage;
