import React, { Component } from "react";
import axios from "axios";
import axiosInstance from "./axios.js";
import jwtDecode from "jwt-decode";

const AppContext = React.createContext();

export class AppContextProvider extends Component {

    constructor() {
        super()
        this.state = {
            posts: [],
            user_id: JSON.parse(localStorage.getItem("user_id")) || "",
            user: JSON.parse(localStorage.getItem("user")) || {},
            access_token: localStorage.getItem("access_token") || "",
            refresh_token: localStorage.getItem("refresh_token") || "",
        }
    }

    componentDidMount() {
        this.getPosts()
    }

    getUser = () => {
        try {
            axiosInstance.get(`/auth/user/${this.state.user_id}/`)
                .then(response => {
                    const user = response.data
                    localStorage.setItem("user", JSON.stringify(user));
                    this.setState({ user })
                })
        } catch (err) {
            console.log(err)
        }
    }
    
    getPosts = () => {
        return axiosInstance.get("/blog/")
            .then(response => {
                const userPosts = response.data.filter(blog => blog.author === this.state.user_id)
                this.setState({ posts: userPosts })
                return response
            })
    }

    addPost = (newPost) => {
        return axiosInstance.post("/blog/posts/", newPost)
            .then(response => {
                this.setState(prevState => {
                    return { posts: [...prevState.posts, response.data]}
                })
                return response
            })
    }

    editPost = (postID, newPost) => {
        return axiosInstance.patch(`/blog/posts/${postID}/`, newPost)
            .then((response) => {
                console.log(newPost.image)
                axiosInstance.post(`/blog/posts/${postID}/image/`, newPost.image, {
                    'content-type': 'image/jpeg'
                })
                    .then(res => {
                        console.log(res)
                    })
                return response
            })
            .then(response => {
                axiosInstance.get(`/blog/posts/${postID}/`)
                    .then(response => {
                        this.setState(prevState => {
                            const updatedPosts = prevState.posts.map(post => {
                                return post.id === response.data.id ? response.data : post
                            })
                            return { posts: updatedPosts }
                        })
                    })
                return response
            })
    }

    deletePost = (id) => {
        return axiosInstance.delete(`/blog/posts/${id}/`)
            .then(response => {
                this.setState(prevState => {
                    const updatedPosts = prevState.posts.filter(post => {
                        return post.id !== id
                    })
                    return { posts: updatedPosts }
                })
                return response
            })
    }

    isAuthenticated = () => {
        if (this.state.access_token && this.state.access_token !== "" ) {
            var decodedToken = jwtDecode(this.state.access_token)
            if (Date.now() < decodedToken.exp * 1000) {
                return true
            } else {
                axios.post(process.env.REACT_APP_API_BASE_URL + '/auth/token/refresh/', { refresh: this.state.refresh_token })
                    .then(response => {
                        const { access, refresh } = response.data
                        const user_id = jwtDecode(access).user_id

                        localStorage.setItem("access_token", access)
                        localStorage.setItem("refresh_token", refresh)
                        localStorage.setItem("user_id", user_id)

                        this.setState({
                            access_token: access,
                            refresh_token: refresh,
                            user_id
                        })
                        
                        this.getUser()
                        this.getPosts()
                        return response
                    })
                return true
            }
        }

        return false
    }

    signup = (userInfo) => {
        return axiosInstance.post('/auth/user/', userInfo)
            .then(response => {
                const { access, refresh } = response.data
                const user_id = jwtDecode(access).user_id

                localStorage.setItem("access_token", access)
                localStorage.setItem("refresh_token", refresh)
                localStorage.setItem("user_id", user_id)

                this.setState({
                    access_token: access,
                    refresh_token: refresh,
                    user_id
                })
        
                this.getUser()
                return response
            })
    }

    login = (credentials) => {
        return axiosInstance.post('/auth/token/obtain/', credentials)
            .then(response => {
                const { access, refresh } = response.data
                const user_id = jwtDecode(access).user_id

                localStorage.setItem("access_token", access)
                localStorage.setItem("refresh_token", refresh)
                localStorage.setItem("user_id", user_id)

                this.setState({
                    access_token: access,
                    refresh_token: refresh,
                    user_id
                })
        
                this.getUser()
                this.getPosts()
                return response
            })
    }

    logout = () => {
        localStorage.removeItem("user_id")
        localStorage.removeItem("user")
        localStorage.removeItem("access_token")
        localStorage.removeItem("refresh_token")
        this.setState({
            posts: [],
            user_id: "",
            user: {},
            access_token: "",
            refresh_token: ""
        })
    }
    
    render() {
        return (
            <AppContext.Provider
                value={{
                    signup: this.signup,
                    login: this.login,
                    logout: this.logout,
                    isAuthenticated: this.isAuthenticated,
                    getPosts: this.getPosts,
                    editPost: this.editPost,
                    addPost: this.addPost,
                    deletePost: this.deletePost,
                    uploadImage: this.uploadImage,
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