
import { REGISTER, LOGIN, GETADDRESS, ADDADDRESS, GETEMIRATES, GETEMIRATES1, REMOVEADDRESS, GETUSER, EDITUSER, GETORDEREDLIST } from "./types";

export const register = (params) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            const body = {
                name: params.firstname,
                lastname: params.lastname,
                email: params.email,
                password: params.password
            };
            fetch("https://admin.urbandmusic.com/api/register", {
                method: "POST",
                body: JSON.stringify(body)
            })
                .then(res => res.json())
                .then(res => {
                    if (res.success) {
                        dispatch({
                            type: REGISTER,
                            value: res
                        });
                        resolve()
                    } else {
                        reject(res)
                    }
                })
                .catch(error => {
                    reject(error)
                });
        })
    };
};

export const login = (params) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            const body = {
                email: params.email,
                password: params.password
            };
            fetch("https://admin.urbandmusic.com/api/login", {
                method: "POST",
                body: JSON.stringify(body)
            })
                .then(res => res.json())
                .then(res => {
                    if (res.success) {
                        localStorage.setItem('urbandtoken', JSON.stringify(res.token));
                        dispatch({
                            type: LOGIN,
                            value: res
                        });
                        resolve()
                    } else {
                        reject(res)
                    }
                })
                .catch(error => {
                    reject(error)
                });
        })
    };
};

export const getaddress = (params) => {
    localStorage.removeItem('address');
    return dispatch => {
        return new Promise((resolve, reject) => {
            const body = {
                "token": 1
            };
            fetch("https://admin.urbandmusic.com/api/address", {
                method: "POST",
                body: JSON.stringify(body)
            })
                .then(res => res.json())
                .then(res => {


                    if (res.result) {
                        localStorage.setItem('address', true);
                        dispatch({
                            type: GETADDRESS,
                            value: res.result
                        });
                        resolve()
                    } else {
                        reject(res)
                    }



                })
                .catch(error => {
                });
        })
    };
};
export const getemirates = (id) => {
    return dispatch => {
        const body = {
            id: id
        };
        fetch("https://admin.urbandmusic.com/api/countries", {
            method: "POST",
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(res => {

                dispatch({
                    type: GETEMIRATES,
                    value: res.result
                });
            })
            .catch(error => {
            });
    };
};

export const getemirates1 = (id) => {
    return dispatch => {
        const body = {
            id: id
        };
        fetch("https://admin.urbandmusic.com/api/countries", {
            method: "POST",
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(res => {

                dispatch({
                    type: GETEMIRATES1,
                    value: res.result
                });
            })
            .catch(error => {
            });
    };
};
export const addaddress = (params) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            const body = {
                "token": "1",
                "type": params.type,
                "first_name": params.first_name,
                "last_name": params.last_name,
                "mobile": params.mobile,
                "phone": params.phone,
                "emirate": params.emirate,
                "latitude": "1",
                "longitude": "1",
                "area": params.area,
                "street": params.street
            };

            fetch("https://admin.urbandmusic.com/api/addaddress", {
                method: "POST",
                body: JSON.stringify(body)
            })
                .then(res => res.json())
                .then(res => {
                    if (res.success) {
                        dispatch({
                            type: ADDADDRESS,
                            value: res
                        });
                        resolve()
                    } else {
                        reject(res)
                    }
                })
                .catch(error => {
                });
        })
    };
};

export const deleteaddress = (params) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            const body = {
                "token": "1",
                "addressid": params
            };

            fetch("https://admin.urbandmusic.com/api/removeaddress", {
                method: "POST",
                body: JSON.stringify(body)
            })
                .then(res => res.json())
                .then(res => {
                    if (res.success) {
                        dispatch({
                            type: REMOVEADDRESS,
                            value: res
                        });
                        resolve()
                    } else {
                        reject(res)
                    }
                })
                .catch(error => {
                });
        })
    };
};

export const getuser = () => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            const body = {
                "token": "1"
            };

            fetch("https://admin.urbandmusic.com/api/getuser", {
                method: "POST",
                body: JSON.stringify(body)
            })
                .then(res => res.json())
                .then(res => {
                    if (res.success) {
                        dispatch({
                            type: GETUSER,
                            value: res
                        });
                        resolve()
                    } else {
                        reject(res)
                    }
                })
                .catch(error => {
                });
        })
    };
};
export const edituser = (params) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            const body = {
                "token": "1",
                "name": "ishan",
                "email": "ishan@gmail.com",
                "image": "file.png"
            };

            fetch("https://admin.urbandmusic.com/api/edituser", {
                method: "POST",
                body: JSON.stringify(body)
            })
                .then(res => res.json())
                .then(res => {
                    if (res.success) {
                        dispatch({
                            type: EDITUSER,
                            value: res
                        });
                        resolve()
                    } else {
                        reject(res)
                    }
                })
                .catch(error => {
                });
        })
    };
};

export const getorderedlist = () => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            const body = {
                "token": "1"
            };

            fetch("https://admin.urbandmusic.com/api/getorderedlist", {
                method: "POST",
                body: JSON.stringify(body)
            })
                .then(res => res.json())
                .then(res => {
                    if (res.success) {
                        dispatch({
                            type: GETORDEREDLIST,
                            value: res
                        });
                        resolve()
                    } else {
                        reject(res)
                    }
                })
                .catch(error => {
                });
        })
    };
};
