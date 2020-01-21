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
import {DEFAULT_TAG} from "../constants";

interface Props {

}

interface State {

}

class LocationPage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);


        const search = this.props.location.search; // could be '?foo=bar'
        const params = new URLSearchParams(search);
        const locationName = params.get('location'); // location
        const productName = params.get('product'); // location


        this.productNameHuman = 'Proxy';
        switch (productName) {
            case 'shared_proxy':
                this.productNameHuman = 'shared proxy';
                break;
            case 'shared_socks':
                this.productNameHuman = 'shared SOCKS5';
                break;
            case 'socks':
                this.productNameHuman = 'dedicated SOCKS5';
                break;
            case 'proxy':
                this.productNameHuman = 'dedicated proxy';
                break;

        }
        this.pageTitle = locationName + ' ' + this.productNameHuman;
        this.btnTitle = 'Buy ' + locationName + ' ' + this.productNameHuman;
        console.log(this);
    }
    render() {
        return (
            <React.Fragment>
                <Helmet>
                    <title>Http proxies</title>
                    <meta name="description" content={SEO_DESCRIPTION}/>
                    <meta name="keywords" content={SEO_KEYWORDS}/>
                </Helmet>

                <ProductsHero title={this.pageTitle} btnText={this.btnTitle}>
                    Buy {this.productNameHuman} from {this.locationName} !
                    If you're looking to purchase {this.productNameHuman} from {this.locationName} look no further because we have them
                    available in our
                    stock. {this.locationName} {this.productName} locations include <LocationText/>
                </ProductsHero>



                <Extra/>

                <Footer/>
            </React.Fragment>
        );
    }
}

export default LocationPage;
