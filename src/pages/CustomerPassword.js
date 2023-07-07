import React, { useState, useEffect } from 'react'
import { Button, Grid } from '@material-ui/core';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Loading from 'components/Loading/Loading'
import { getUserLogin, logout, updatePassword } from 'actions/services/UserActions';
import useTimeout from 'hooks/useTimeout';
import AccountNavbar from 'components/AccountNavbar/AccountNavbar.';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

function CustomerPassword(props) {

    const dispatch = useDispatch();
    const token = localStorage.getItem("token");
    const [user, setUser] = useState({
        id: '',
        password: "",
        passwordNew: "",
        passwordNewConfirm: "",
    })
    const [loading, setLoading] = useState(true);
    const getUser = () => {
        getUserLogin()
            .then(res => {
                setUser(res.data);
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        document.title = "Tài khoản của tôi | Tiki"
        if (token) {
            getUser();
        } else {
            props.history.push('/login');
        }
    }, [props.history, token])

    const handleInputChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleLogout = () => dispatch(logout())

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        const data = {
            password: user?.password,
            passwordNew: user?.passwordNew
        }
        if (user?.passwordNew !== user?.passwordNewConfirm) {
            toast.info("Mật khẩu xác nhận không khớp!", {
                position: "bottom-center",
                theme: 'dark',
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            updatePassword(data)
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
                    handleLogout();
                })
                .catch((err) => {
                    if (err) {
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
                    }
                })
        }
    }

    useTimeout(() => setLoading(false), loading ? 1000 : null);

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
                                                <h4 className="heading">Đổi mật khẩu</h4>
                                            </div>
                                        </Grid>
                                        <ValidatorForm onSubmit={handleSubmit}>
                                            <Grid className="" container spacing={2}>
                                                <Grid item sm={12} xs={12}>
                                                    <TextValidator
                                                        className="input-text"
                                                        type="password"
                                                        name="password"
                                                        value={user?.password}
                                                        defaultValue={user.password}
                                                        onChange={handleInputChange}
                                                        label={
                                                            <span>
                                                                <span style={{ color: "red" }}>*</span>
                                                                Mật khẩu cũ
                                                            </span>
                                                        }
                                                        validators={["required"]}
                                                        errorMessages={["Trường này không được để trống"]}
                                                    />
                                                </Grid>
                                                <Grid item sm={12} xs={12}>
                                                    <TextValidator
                                                        className="input-text"
                                                        type="password"
                                                        name="passwordNew"
                                                        value={user?.passwordNew}
                                                        onChange={handleInputChange}
                                                        label={
                                                            <span>
                                                                <span style={{ color: "red" }}>*</span>
                                                                Mật khẩu mới
                                                            </span>
                                                        }
                                                        validators={["required"]}
                                                        errorMessages={["Trường này không được để trống"]}
                                                    />
                                                </Grid>
                                                <Grid item sm={12} xs={12}>
                                                    <TextValidator
                                                        className="input-text"
                                                        type="password"
                                                        name="passwordNewConfirm"
                                                        value={user?.passwordNewConfirm}
                                                        onChange={handleInputChange}
                                                        label={
                                                            <span>
                                                                <span style={{ color: "red" }}>*</span>
                                                                Xác nhận mật khẩu mới
                                                            </span>
                                                        }
                                                        validators={["required"]}
                                                        errorMessages={["Trường này không được để trống"]}
                                                    />
                                                </Grid>
                                                <Grid item sm={12} xs={12}>
                                                    <Button
                                                        variant="outlined" color="secondary"
                                                        style={{ margin: '10px 0', width: '100%' }}
                                                        className="btn btn--e-transparent-brand-b-2"
                                                        type="submit"
                                                    >Đổi mật khẩu</Button>
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

export default CustomerPassword;