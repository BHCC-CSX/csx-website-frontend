import React, { Component } from "react";
import axios from "axios";

const AppContext = React.createContext();

const decryptToken = token => {
    if (token) {
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch (error) {
            console.log(error)
        }
    }
    return null;
}

export class AppContextProvider extends Component {

    constructor() {
        super()
        this.state = {
            user: JSON.parse(localStorage.getItem("user")) || {},
            access_token: localStorage.getItem("access_token") || "",
            refresh_token: localStorage.getItem("refresh_token") || "",
        }
    }

    signup = (userInfo) => {
        return axios.post(process.env.REACT_APP_API_BASE_URL + '/auth/user/', userInfo)
            .then(response => {
                const { access_token, refresh_token } = response.data
                localStorage.setItem("access_token", access_token)
                localStorage.setItem("refresh_token", refresh_token)
                this.setState({ access_token, refresh_token })

                const tokenData = decryptToken(access_token)
                return axios.get(process.env.REACT_APP_API_BASE_URL + `/auth/user/${tokenData.user_id}/`)
            }).then(response => {
                const user = response.data
                console.log(user)
                localStorage.setItem("user", JSON.stringify(user));
                this.setState({ user })
                return response
            })
    }

    login = (credentials) => {
        return axios.post(process.env.REACT_APP_API_BASE_URL + '/auth/token/obtain/', credentials)
            .then(response => {
                const { access_token, refresh_token } = response.data
                localStorage.setItem("access_token", access_token)
                localStorage.setItem("refresh_token", refresh_token)
                this.setState({ access_token, refresh_token })

                const tokenData = decryptToken(access_token)
                return axios.get(process.env.REACT_APP_API_BASE_URL + `/auth/user/${tokenData.user_id}/`)
            }).then(response => {
                const user = response.data
                console.log(user)
                localStorage.setItem("user", JSON.stringify(user));
                this.setState({ user })
                return response
            })
    }

    logout = () => {
        localStorage.removeItem("user")
        localStorage.removeItem("access_token")
        localStorage.removeItem("refresh_token")
        this.setState({
            user: {},
            access_token: "",
            refresh_token: ""
        })
    }

    // axiosInstance.post('auth/token/obtain/', {
    //     username,
    //     password
    //   }).then(response => {
    //     if (response.data.error !== 1) {
    //       axiosInstance.defaults.headers['Authorization'] = "JWT " + response.data.access_token;
    //       localStorage.setItem('access_token_token', response.data.access_token);
    //       localStorage.setItem('refresh_token_token', response.data.refresh_token);
    //     } else {
    //       Alert.alert(JSON.stringify(response))
    //     }
    //   }).catch(error => {
    //     console.log(error);
    //   });
    
    render() {
        return (
            <AppContext.Provider
                value={{
                    signup: this.signup,
                    login: this.login,
                    logout: this.logout,
                    ...this.state
                }}
            >
                {this.props.children}
            </AppContext.Provider>
        )
    }
}

export const withContext = Component => {
    return props => {
        return (
            <AppContext.Consumer>
                {
                    globalState => {
                        return (
                            <Component
                                {...globalState}
                                {...props}
                            />
                        )
                    }
                }
            </AppContext.Consumer>
        )
    }
}