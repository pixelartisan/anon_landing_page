import React from 'react';
import Helmet from 'react-helmet';
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

import Datacenters2 from "../components/datacenters2";
import {Element} from "react-scroll";



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
                <Datacenters2 />
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
