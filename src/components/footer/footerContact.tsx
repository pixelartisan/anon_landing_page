import React from 'react';
import { Link } from "gatsby"

// Components
import {
    Col
} from 'reactstrap';

interface Link {
    label: string,
    url: string,
    children: any,
    native: boolean
}

interface Props {
    links: Array<Link>,
    title: string,
    content: string,
    company: string,
    location: string
}

const FooterContact: React.FunctionComponent<Props> = ({ title, content, company, location, links, children }) => (
    <Col md={{ size: 6 }} className="footer__column">
        <h5>{title}</h5>
        <br>
        <p>
            {content}
        </p>
            <br>
                <p>
                    {company}
                </p>
                <p>{location}</p>

    </Col>
);

export default FooterContact;
