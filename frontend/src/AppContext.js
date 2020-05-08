import React, { Component } from "react";
import axios from "axios";

const AppContext = React.createContext();

const getUserFromToken = token => {
    if (token) {
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch (error) {
        }
    }
    return null;
}

export class AppContextProvider extends Component {

    constructor() {
        super()
        this.state = {
            user: JSON.parse(localStorage.getItem("user")) || {},
            token: localStorage.getItem("token") || ""
        }
    }

    signup = (userInfo) => {
        return axios.post(process.env.REACT_APP_API_BASE_URL + '/auth/user/', userInfo)
            .then(response => {
                const { token } = response.data
                localStorage.setItem("token", token)
                this.setState({ token })

                const user = getUserFromToken(token)
                return axios.get(process.env.REACT_APP_API_BASE_URL + `/auth/user/${user.id}/`)
            }).then(response => {
                const { user } = response.data
                localStorage.setItem("user", JSON.stringify(user));
                this.setState({ user })
                return response
            })
    }

    // axiosInstance.post('auth/token/obtain/', {
    //     username,
    //     password
    //   }).then(response => {
    //     if (response.data.error !== 1) {
    //       axiosInstance.defaults.headers['Authorization'] = "JWT " + response.data.access;
    //       localStorage.setItem('access_token', response.data.access);
    //       localStorage.setItem('refresh_token', response.data.refresh);
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