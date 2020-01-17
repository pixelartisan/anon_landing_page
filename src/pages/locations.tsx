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

            <Preamble title="Buy Proxies now">
            </Preamble>

            <Element name={SCROLL_DATACENTERS}>
                <section className="extra section section--padding">
                    <Datacenters2/>
                </section>
                <section className="section section--padding">
                    <Preamble light title="Our locations and products">
                    </Preamble>
                </section>
            </Element>
        </main>

        <Extra/>

        <Footer/>
    </React.Fragment>
);

export default Locations;
