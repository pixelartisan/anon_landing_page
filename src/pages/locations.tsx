import React from 'react';
import Helmet from 'react-helmet';
// Components
import NavBar from '../components/navbar';
import MenuItem from '../components/navbar/secondaryMenuItem';
import Footer from '../components/footer';
import Extra from '../components/extra';
import Preamble from '../components/generic/preamble';


import {
    SCROLL_DATACENTERS,
} from '../constants';
// Constants
import {
    TOS_SITE_NAME,
    TOS_LAST_UPDATE,
    SEO_KEYWORDS,
    SEO_DESCRIPTION, MEMBERS_URL
} from '../settings';

import Datacenters2 from "../components/datacenters2";
import {Element} from "react-scroll";
import {Container} from "reactstrap";


const Locations = () => (
    <React.Fragment>
        <Helmet>
            <title>Our proxies locations</title>
            <meta name="description" content={SEO_DESCRIPTION}/>
            <meta name="keywords" content={SEO_KEYWORDS}/>
        </Helmet>


        <main className="policy-hero">
            <NavBar MenuItem={MenuItem}/>
            <section className="section section--padding">
                <Preamble light title="Buy Proxies and SOCKS5 now">
                    If you're looking to purchase proxies, socks5 from us look no further because we have them available in our stock.
                </Preamble>
            </section>

        </main>
        <Element name={SCROLL_DATACENTERS}>
            <section className="extra section section--padding">
                <Datacenters2/>
            </section>
        </Element>
        <Extra/>

        <Footer/>
    </React.Fragment>
);

export default Locations;
