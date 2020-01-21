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
import ProductsHero from "../hero/productsHero";

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

class LocationText extends React.Component<Props, State> {
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
        const search = location.search;
        const params = new URLSearchParams(search);
        const locationName = params.get('location'); // location

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
                            doSetLocationsData(countries[e]);
                        }

                    }
                }


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
        const search = location.search; // could be '?foo=bar'
        const params = new URLSearchParams(search);
        const locationName = params.get('location'); // location

        const selectedTagsWithoutDefault = tagOptions ? [...tagOptions] : [];
        selectedTagsWithoutDefault.shift();

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

            <span>{cityCount} cities in total: {citiesString}.</span>
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

export default connect(mapStateToProps, mapDispatchToProps)(LocationText);
