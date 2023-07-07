import React, { useState, useEffect } from 'react'
import { Button, Grid, TextField } from '@material-ui/core';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Loading from 'components/Loading/Loading'
import { getUserLogin, updateInfo } from 'actions/services/UserActions';
import AccountNavbar from 'components/AccountNavbar/AccountNavbar.';
import { toast } from 'react-toastify';

function CustomerProfile(props) {

    const [user, setUser] = useState({
        id: '',
        fullName: '',
        username: '',
        email: '',
        phone: '',
        dateOfBirth: ''
    })
    const [loading, setLoading] = useState(true);
    const getUser = () => {
        getUserLogin()
            .then(res => {
                setUser(res.data);
                setLoading(false)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        document.title = "Tài khoản của tôi | Tiki"
        getUser();
    }, [])


    const handleInputChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        const data = {
            username: user?.username,
            email: user?.email,
            fullName: user?.fullName,
            phone: user?.phone,
            dateOfBirth: user?.dateOfBirth
        }
        updateInfo(data)
            .then((res) => {
                toast.success(res.data.message, {
                    position: "bottom-center",
                    theme: 'dark',
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setLoading(false);
                getUser();
            })
            .catch((err) => {
                toast.error(err.response.data.message, {
                    position: "bottom-center",
                    theme: 'dark',
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                getUser();
            })
    }

    return (
        <div>
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
                                        <Grid item md={12}>
                                            <div className="group">
                                                <h4 className="heading">Thông tin tài khoản</h4>
                                            </div>
                                        </Grid>
                                        <ValidatorForm onSubmit={handleSubmit}>
                                            <Grid className="" container spacing={2}>
                                                <Grid item sm={12} xs={12}>
                                                    <TextValidator
                                                        className="input-text"
                                                        type="text"
                                                        name="fullName"
                                                        value={user?.fullName}
                                                        onChange={handleInputChange}
                                                        label={
                                                            <span>
                                                                <span style={{ color: "red" }}>*</span>
                                                                Họ và tên
                                                            </span>
                                                        }
                                                        validators={["required"]}
                                                        errorMessages={["Trường này không được để trống"]}
                                                    />
                                                </Grid>
                                                <Grid item sm={12} xs={12}>
                                                    <TextValidator
                                                        className="input-text"
                                                        type="number"
                                                        name="phone"
                                                        value={user?.phone}
                                                        onChange={handleInputChange}
                                                        label={
                                                            <span>
                                                                <span style={{ color: "red" }}>*</span>
                                                                Số điện thoại
                                                            </span>
                                                        }
                                                        validators={["required"]}
                                                        errorMessages={["Trường này không được để trống"]}
                                                    />
                                                </Grid>
                                                <Grid item sm={12} xs={12}>
                                                    <TextValidator
                                                        className="input-text"
                                                        type="text"
                                                        name="email"
                                                        value={user?.email}
                                                        onChange={handleInputChange}
                                                        label={
                                                            <span>
                                                                <span style={{ color: "red" }}>*</span>
                                                                Email
                                                            </span>
                                                        }
                                                        validators={["required"]}
                                                        errorMessages={["Trường này không được để trống"]}
                                                    />
                                                </Grid>
                                                <Grid item sm={12} xs={12}>
                                                    <TextValidator
                                                        className="input-text"
                                                        type="text"
                                                        name="username"
                                                        value={user?.username}
                                                        disabled
                                                        inputProps={{
                                                            style: { color: 'blue' },
                                                        }}
                                                        onChange={handleInputChange}
                                                        label={
                                                            <span>
                                                                <span style={{ color: "red" }}>*</span>
                                                                Tên tài khoản
                                                            </span>
                                                        }
                                                        validators={["required"]}
                                                        errorMessages={["Trường này không được để trống"]}
                                                    />
                                                </Grid>

                                                <Grid item sm={12} xs={12}>
                                                    <TextField
                                                        className="input-text"
                                                        style={{ margin: '5px 0' }}
                                                        type="date"
                                                        name="dateOfBirth"
                                                        variant="standard"
                                                        value={user?.dateOfBirth}
                                                        onChange={handleInputChange}
                                                        placeholder="Ngày sinh"
                                                        label={"Ngày sinh"}
                                                    />
                                                </Grid>
                                                <Grid item sm={12} xs={12}>
                                                    <Button
                                                        variant="outlined" color="secondary"
                                                        style={{ margin: '10px 0', width: '100%' }}
                                                        className="btn btn--e-transparent-brand-b-2"
                                                        type="submit"
                                                    >Cập nhật thông tin</Button>
                                                </Grid>
                                            </Grid>
                                        </ValidatorForm>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default CustomerProfile;