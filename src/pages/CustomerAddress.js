import { Button, Grid, makeStyles, TextField } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react'
import { getUserLogin } from 'actions/services/UserActions';
import AccountNavbar from 'components/AccountNavbar/AccountNavbar.';
import Loading from 'components/Loading/Loading'
import Select from 'react-select'
import { updateAddressUser } from 'actions/services/AddressActions'
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import useTimeout from 'hooks/useTimeout';
import useLocationForm from 'hooks/useLocationForm';
toast.configure({
    autoClose: 2000,
    draggable: false,
    limit: 3,
});

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 120,
    },
    input: {
        display: 'none',
    },
    button: {
        padding: '12px 24px',
        fontWeight: 600,
        fontSize: '1.3rem',
        marginRight: 15
    },
    image: {
        marginTop: 10,
        width: 200,
        height: 200,
        objectFit: 'cover',
        marginRight: 10
    },
    textInput: {
        fontSize: '1.3rem'
    }
}))

const CustomerAddress = (props) => {

    const classes = useStyles();

    const [user, setUser] = useState({
        id: '',
        fullName: '',
        username: '',
        city: '',
        district: '',
        ward: '',
        house: '',
        city_id: null,
        district_id: null,
        ward_id: '',
    })
    const [loading, setLoading] = useState(true);
    const { state, onCitySelect, onDistrictSelect, onWardSelect } = useLocationForm(user?.city_id !== null ? true : false);

    // console.log(user?.city_id !== null ? true : false)

    const {
        cityOptions,
        districtOptions,
        wardOptions,
        selectedCity,
        selectedDistrict,
        selectedWard,
    } = state;

    const handleChange = (e) => {
        const value = e.target.value;
        setUser({
            ...user,
            [e.target.name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { ...user };
        data.city = state.selectedCity.label;
        data.district = state.selectedDistrict.label;
        data.ward = state.selectedWard.label;
        data.house = user.house;
        data.city_id = state.selectedCity.value;
        data.district_id = state.selectedDistrict.value;
        data.ward_id = state.selectedWard.value;
        updateAddressUser(data)
            .then((res) => {
                toast.success("Cập nhật thông tin thành công.")
                getUser();
            })
            .catch(err => console.log(err))
    }

    const getUser = useCallback(() => {
        getUserLogin()
            .then(res => {
                setUser(res.data);
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        document.title = "Số địa chỉ "
        getUser();
    }, [getUser])

    useTimeout(() => setLoading(false), loading ? 1000 : null);

    return (
        <>
            {
                loading ? <Loading /> : (
                    <div className="row sm-gutter section__content">
                        <div className="col l-12 m-12 c-12">
                            <div className="home-product">
                                <div className="row sm-gutter section__item">
                                    <div className="col l-2-4 m-3 c-3">
                                        <AccountNavbar name={user?.fullName} />
                                    </div>
                                    <div className="col l-9-4 m-9 c-9">
                                        <Grid container>
                                            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                                                <Grid item sm={12} xs={12}>
                                                    <div className="input-group">
                                                        <Select
                                                            name="ProvinceID"
                                                            key={`ProvinceID_${selectedCity?.value}`}
                                                            isDisabled={cityOptions.length === 0}
                                                            options={cityOptions}
                                                            onChange={(option) => onCitySelect(option)}
                                                            placeholder="Tỉnh/Thành"
                                                            defaultValue={selectedCity}
                                                        />
                                                    </div>
                                                </Grid>
                                                <Grid item sm={12} xs={12}>
                                                    <div className="input-group">
                                                        <Select
                                                            name="DistrictID"
                                                            key={`DistrictID_${selectedDistrict?.value}`}
                                                            isDisabled={districtOptions.length === 0}
                                                            options={districtOptions}
                                                            onChange={(option) => onDistrictSelect(option)}
                                                            placeholder="Quận/Huyện"
                                                            defaultValue={selectedDistrict}
                                                        />
                                                    </div>
                                                </Grid>
                                                <Grid item sm={12} xs={12}>
                                                    <div className="input-group">
                                                        <Select
                                                            name="WardCode"
                                                            key={`WardCode_${selectedWard?.value}`}
                                                            isDisabled={wardOptions.length === 0}
                                                            options={wardOptions}
                                                            placeholder="Phường/Xã"
                                                            onChange={(option) => onWardSelect(option)}
                                                            defaultValue={selectedWard}
                                                        />
                                                    </div>
                                                </Grid>

                                                <Grid item sm={12} xs={12}>
                                                    <TextField
                                                        type="text"
                                                        name="house"
                                                        value={user?.house}
                                                        fullWidth
                                                        className={classes.textInput}
                                                        onChange={handleChange}
                                                        label='Địa chỉ nhà'
                                                    />
                                                </Grid>
                                                <Grid item sm={12} xs={12}>
                                                    <Button
                                                        type="submit"
                                                        variant="outlined" color="secondary"
                                                        style={{ margin: '10px 0', width: '100%' }}
                                                        className="btn btn--e-transparent-brand-b-2"
                                                    >Cập nhật địa chỉ</Button>
                                                </Grid>
                                            </form>
                                        </Grid>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default CustomerAddress;