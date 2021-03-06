import React from 'react';
import { Link } from "gatsby"

// Components
import {
    Col
} from 'reactstrap';


interface Props {
    links: Array<Link>,
    title: string,
    content: string,
    company: string,
    location: string
}

const FooterContact: React.FunctionComponent<Props> = ({ title, content, company, location, children }) => (
    <Col md={{ size: 6 }} className="footer__column text-left" style={{color: "white"}}>
        <h4 style={{color: "white"}} className="text-left">{title}</h4>
        <p>
            {content}
        </p>
        <p></p>
        <p>
            {company}
        </p>
        <p></p>
        <p>
            {location}
        </p>
    </Col>
);

export default FooterContact;
