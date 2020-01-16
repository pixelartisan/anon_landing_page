import React from 'react';
import Helmet from 'react-helmet';
import LOCATIONS_URL, {SCROLL_DATACENTERS} from '../constants';
// Components
import NavBar from '../components/navbar';
import MenuItem from '../components/navbar/secondaryMenuItem';
import Footer from '../components/footer';
import Extra from '../components/extra';
import Preamble from '../components/generic/preamble';


// Constants
import {
    TOS_SITE_NAME,
    TOS_LAST_UPDATE,
    SEO_KEYWORDS,
    SEO_DESCRIPTION
} from '../settings';

import Datacenters from "../components/datacenters";
import data from "../locations.json";
import {Element} from "react-scroll";

const contintentsList = data.continents;

console.log(contintentsList);

const Locations = () => (
    <React.Fragment>
        <Helmet>
            <title>Our proxies locations</title>
            <meta name="description" content={SEO_DESCRIPTION}/>
            <meta name="keywords" content={SEO_KEYWORDS}/>
        </Helmet>


        <main className="policy-hero">
            <NavBar MenuItem={MenuItem}/>
            <Element name={SCROLL_DATACENTERS}>
                <Datacenters />
            </Element>

            <section className="section section--padding">
                <Preamble light title="Our locations and products">

                </Preamble>
            </section>
        </main>

        <Extra/>

        <Footer/>
    </React.Fragment>
);

export default Locations;
