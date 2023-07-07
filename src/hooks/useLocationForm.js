import axios from "axios";
import { useEffect, useState } from "react";
import {API_URL} from 'actions/constants/constants'
axios.defaults.headers.common['token'] = process.env.REACT_APP_GHN_TOKEN;
const token = localStorage.getItem('token');
async function fetchCityOptions() {
    let url = 'https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province';
    const locations = await (await axios.get(url)).data.data
    return locations.map((item => {
        return {
            value: item.ProvinceID,
            label: item.ProvinceName
        }
    }));
}

async function fetchDistrictOptions(ProvinceID) {
    let url = `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${ProvinceID}`;
    const locations = await (await axios.get(url)).data.data
    return locations.map((item => {
        return {
            value: item.DistrictID,
            label: item.DistrictName
        }
    }));
}

async function fetchWardOptions(DistrictID) {
    let url = `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${DistrictID}`;
    const locations = await (await axios.get(url)).data.data
    return locations.map((item => {
        return {
            value: item.WardCode,
            label: item.WardName
        }
    }));
}



async function fetchInitialData() {
    const { city_id, district_id, ward_id } = (await axios.get(`${API_URL}/api/auth/info`, {
        headers: { Authorization: `Bearer ${token}` },
    })).data;
    const [cities, districts, wards] = await Promise.all([
        fetchCityOptions(),
        fetchDistrictOptions(city_id),
        fetchWardOptions(district_id),
    ]);
    return {
        cityOptions: cities,
        districtOptions: districts,
        wardOptions: wards,
        selectedCity: cities.find((c) => c.value === city_id),
        selectedDistrict: districts.find((d) => d.value === district_id),
        selectedWard: wards.find((w) => w.value === ward_id),
    };
}


function useLocationForm() {
    const [state, setState] = useState({
        cityOptions: [],
        districtOptions: [],
        wardOptions: [],
        selectedCity: null,
        selectedDistrict: null,
        selectedWard: null,
    });
    const [shouldFetchInitialLocation, setShouldFetchInitialLocation] = useState(false);

    const { selectedCity, selectedDistrict } = state;

    useEffect(() => {
        (async function () {
            const initialData = await fetchInitialData();
            if(initialData.selectedCity) {
                setShouldFetchInitialLocation(true);
            } else {
                setShouldFetchInitialLocation(false);
            }
            
        })();
    }, []);

    useEffect(() => {
        (async function () {
            if (shouldFetchInitialLocation) {
                const initialData = await fetchInitialData();
                setState(initialData);
            } else {
                const options = await (await axios.get('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province')).data.data;
                setState({
                    ...state, cityOptions: options.sort((a, b) => a.ProvinceID - b.ProvinceID).map((item) => {
                        return {
                            value: item.ProvinceID,
                            label: item.ProvinceName
                        }
                    })
                })
            }
        })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shouldFetchInitialLocation]);

    useEffect(() => {
        (async function () {
            if (!selectedCity) return;
            const options = await (await axios.get(`https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${selectedCity.value}`)).data.data
            setState({
                ...state, districtOptions: options.map((item) => {
                    return {
                        value: item.DistrictID,
                        label: item.DistrictName
                    }
                })
            })
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCity]);

    useEffect(() => {
        (async function () {
            if (!selectedDistrict) return;
            const options = await (await axios.get(`https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${selectedDistrict.value}`)).data.data
            setState({
                ...state, wardOptions: options.map((item) => {
                    return {
                        value: item.WardCode,
                        label: item.WardName
                    }
                })
            })
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedDistrict])

    function onCitySelect(option) {
        setState({
            ...state,
            districtOptions: [],
            wardOptions: [],
            selectedCity: option,
            selectedDistrict: null,
            selectedWard: null,
        });
    }

    function onDistrictSelect(option) {
        setState({
            ...state,
            wardOptions: [],
            selectedDistrict: option,
            selectedWard: null,
        });
    }

    function onWardSelect(option) {
        setState({ ...state, selectedWard: option });
    }

    return { state, onCitySelect, onDistrictSelect, onWardSelect };
}

export default useLocationForm;
