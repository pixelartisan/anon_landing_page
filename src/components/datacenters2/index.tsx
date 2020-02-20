import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from "react-redux";

// Map utils
import getCountryISO3 from 'country-iso-2-to-3';
import {ComposableMap, ZoomableGroup, Geographies, Geography} from 'react-simple-maps';
import {Tooltip, actions as ttActions} from '@tsiry/redux-tooltip';

const {show, hide} = ttActions;

// Request
import requestHandler from '../../utils/request';

// Utils
import shadeColor from '../../utils/shadeColor';
import WorldMap from "../../utils/world-50m.json";
import get from 'lodash/get';

// Components
import {
    Col,
    Container,
    Row
} from 'reactstrap';
import Preamble from '../generic/preamble';
import Switch from '../generic/switch';
import Select from '../generic/select';

// Actions
import {setLocationsData} from '../../actions';

// Scss
import '../../styles/components/datacenters.scss';

// Constants
import {DEFAULT_TAG, LOCATIONS_URL, LOCATION_ROUTE} from '../../constants';

// Interfaces
import {ILocationsResponse, ICountries} from '../../interfaces';

const products = [{
    value: 'proxy',
    label: 'proxy'
}, {
    value: 'socks',
    label: 'socksv5'
}];

const productTypes = [{
    value: 'dedicated',
    label: 'dedicated'
}, {
    value: 'shared',
    label: 'shared'
}];


interface Props {
    doSetLocationsData(data: object): void,

    hide(): void,

    show(any): void,

    countries: ICountries,
    allAvailableTags: Array<string>
}

interface State {
    selectedProduct: string,
    selectedProductType: string,
    selectedTag: {
        value: string,
        label: string
    }
}

const mapBaseColor = shadeColor('#00b4ff', 0.2);

class Datacenters2 extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            selectedProduct: 'proxy',
            selectedProductType: 'dedicated',
            selectedTag: DEFAULT_TAG
        };

        this.mapContainer = React.createRef();

        this.handleMove = this.handleMove.bind(this);
        this.handleLeave = this.handleLeave.bind(this);
    }

    componentDidMount() {
        const {doSetLocationsData} = this.props;

        requestHandler(LOCATIONS_URL)
            .then(({data, error}) => {
                if (error) {
                    console.error(error);
                    return;
                }


                doSetLocationsData(data);
            })
            .catch(console.error);
    }

    countryHasSelectedProducts(iso3) {
        const {countries} = this.props;
        const {selectedProduct, selectedProductType, selectedTag} = this.state;

        for (let i = 0; i < countries.length; i++) {
            const cty = countries[i];
            const cI3Upper = getCountryISO3(cty.iso.toUpperCase());
            if (cI3Upper === iso3) {
                const countryData = this.getCountryData(iso3);

                if (countryData) {
                    const product = selectedProductType === 'shared' ? `shared_${selectedProduct}` : selectedProduct;

                    if (
                        countryData.products.includes(product)
                        &&
                        (
                            !selectedTag
                            ||
                            selectedTag.value === DEFAULT_TAG.value
                            ||
                            countryData.tags.includes(selectedTag.value)
                        )
                    ) {
                        return true;
                    }
                }

            }
        }

        return false;
    }

    getCountryData(iso3) {
        const {countries} = this.props;

        for (let i = 0; i < countries.length; i++) {
            const cty = countries[i];

            if (getCountryISO3(cty.iso.toUpperCase()) === iso3) {
                return cty;
            }
        }

        return null;
    }

    countryColor(v) {
        return this.countryHasSelectedProducts(v.properties.ISO_A3) ? shadeColor(mapBaseColor, 0.3) : shadeColor("#CFD8DC", 0.9);
    }

    handleChange(field, value) {
        this.setState({
            [field]: value,
            selectedTag: DEFAULT_TAG
        });
    }

    handleTagChange(field, value) {
        const {selectedTag} = this.state;
        const {allAvailableTags} = this.props;
        const tagOptions = allAvailableTags.map((tag) => ({
            value: tag,
            label: tag
        }));
        const newSelectedTag = tagOptions.filter(tag => tag.value === value)[0];
        if (selectedTag.value === newSelectedTag.value) {
            this.setState({
                [field]: DEFAULT_TAG
            });
        } else {
            this.setState({
                [field]: newSelectedTag
            });
        }
    }

    handleMove(geography, evt) {
        if (!this.countryHasSelectedProducts(geography.properties.ISO_A3)) return;

        const mapContainer = ReactDOM.findDOMNode(this.mapContainer.current);
        const x = evt.pageX - mapContainer.parentNode.offsetLeft;
        const y = evt.pageY - mapContainer.parentNode.offsetTop;

        this.props.show({
            origin: {x, y},
            content: geography.properties.NAME
        });
    }

    handleLeave() {
        this.props.hide();
    }

    render() {
        const {selectedProduct, selectedProductType, selectedTag} = this.state;


        const {allAvailableTags} = this.props;
        const self = this;
        const tagOptions = allAvailableTags.map((tag) => ({
            value: tag,
            label: tag
        }));

        const selectedTagsWithoutDefault = tagOptions ? [...tagOptions] : [];
        selectedTagsWithoutDefault.shift();

        return (
            <section className="datacenters section ">
                <Container>
                    <Preamble title="Our available locations and services">
                    </Preamble>


                    <table className="table table-striped w-100">
                        <thead>
                        <tr>
                            <th scope="col">ISO</th>
                            <th scope="col">Country</th>
                            <th scope="col">Products</th>
                            <th scope="col">Tags</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.props.countries.map((item, key) =>
                            <tr key={key}>
                                <th scope="row">{item.iso}</th>
                                <td>{item.name}</td>

                                <td>{item.products.map((product, i) => {
                                        const countryName = item.name;
                                        const productName = product;

                                        const productLink = LOCATION_ROUTE+'?location='+item.name+'&product='+productName;

                                        switch (productName) {
                                            case 'shared_proxy':
                                                return <a href={productLink} className={'btn red'} key={i} >[ Shared Proxy ] </a>
                                            case 'shared_socks':
                                                return <a href={productLink} className={'btn green'} key={i} >[ Shared SOCKS5 ] </a>
                                            case 'socks':
                                                return <a href={productLink} className={'btn blue'} key={i} >[ Dedicated SOCKS5 ] </a>
                                            case 'proxy':
                                                return <a href={productLink} className={'btn purple'} key={i} >[ Dedicated Proxy ] </a>

                                        }

                                    }
                                )}</td>

                                <td><span className="text-black-50">{item.tags[1]}</span></td>

                            </tr>
                        )}

                        </tbody>
                    </table>
                </Container>
            </section>
        );
    }
}

const mapStateToProps = (state) => ({
    countries: get(state, 'core.countries', {}),
    allAvailableTags: get(state, 'core.allAvailableTags', [])
});

const mapDispatchToProps = (dispatch) => ({
    doSetLocationsData: (data: ILocationsResponse) => dispatch(setLocationsData(data)),
    show: (props) => dispatch(show(props)),
    hide: () => dispatch(hide())
});

export default connect(mapStateToProps, mapDispatchToProps)(Datacenters2);
