import React from 'react';
import Helmet from 'react-helmet';

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
import LocationText from "../components/locationtext";
import {DEFAULT_TAG, LOCATIONS_URL} from "../constants";
import requestHandler from "../utils/request";

interface Props {

}

interface State {

}

class LocationPage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);


    }
    render() {
        const search = this.props.location.search; // could be '?foo=bar'
        const params = new URLSearchParams(search);
        const locationName = params.get('location'); // location
        const productName = params.get('product'); // location

        requestHandler(LOCATIONS_URL)
            .then(({data, error}) => {
                if (error) {
                    console.error(error);
                    return;
                }

                this.continents = data.continents;
                for (let i = 0; i < data.continents.length; i++) {
                    const {countries} = data.continents[i];
                    for (let e = 0; e < countries.length; e++) {
                        if (countries[e]['name'] == locationName) {
                            this.countryData = countries[e];
                        }

                    }
                }


            })
            .catch(console.error);

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
        if (this.countryData) {
            cityCount = this.countryData['states'].length;


            for (let e = 0; e < this.countryData['states'].length; e++) {
                if(e == 0){
                    citiesString += this.countryData['states'][e]['name'];
                } else{
                    citiesString += ', '+this.countryData['states'][e]['name'];
                }

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
                    If you're looking to purchase {productNameHuman} from {locationName} look no further because we have them
                    available in our
                    stock. {locationName} {productName} locations include   <span>{cityCount} cities in total: {citiesString}.</span>
                </ProductsHero>



                <Extra/>

                <Footer/>
            </React.Fragment>
        );
    }
}

export default LocationPage;
