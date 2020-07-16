import vuex from 'vuex'
import axios from 'axios'
import Cookie from 'js-cookie'

const createStore = () => {
    return new vuex.Store({
        state : {
            name : "Muhammad",
            members : '',
            user : '',
            token : null,
            error : null,
            loading : false,
            sentRequests : '',
            recievedRequests : '',
            singleUser : '',
            location: ''
        },
        mutations : {
            updateLocation(state, payload){
                state.location = payload
            },
            getUser(state, payload){
                state.singleUser = payload
            },
            setTeam(state, payload){
                state.members = payload.team
            },
            recievedRequests(state, payload){
                state.recievedRequests = payload
            },
            sentRequests(state, payload){
                state.sentRequests = payload
            },
            setUser(state, payload){
                state.user = payload
            },
            setToken(state, payload){
                state.token = payload
            },
            setLoading(state, payload){
                state.loading = payload
            },
            clearToken(state){
                state.token = null
            },
            setError(state, payload){
                state.error = payload
            },
            clearError(state){
                state.error = null
            },

        },

        actions : {

            updateMyLocation(context, payload){
                let pos;
                let user;
                const address = payload;
                if(!navigator.geolocation){
                    return "Sorry, Your Browser does not support location"
                  }
                    context.commit('setLoading', true);
                    context.commit('clearError');

                  navigator.geolocation.getCurrentPosition(poss => {
                    pos = poss;
                    user = context.state.user
                    console.log(poss);
                    return axios.put(`process.env.server/locations/${user}`, {lat : pos.coords.latitude, lon : pos.coords.longitude, address, dateTime : new Date},{
                        headers:{
                            Authorization: `Bearer ${context.state.token}`
                        }
                    }).then(res => {
                        context.commit('setLoading', false);  
                        context.commit('updateLocation', pos.coords);
                    });
                  }, err => {
                    context.commit('setLoading', false);  
                    context.commit('setError', err.message);
                  }, {
                    enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }  
                     )
            },
            getTeam(context){
                context.commit('setLoading', true);
                context.commit('clearError');
                return axios.get(`process.env.server/team/${context.state.user}`, {
                    headers:{
                        Authorization: `Bearer ${context.state.token}`
                    }
                }).then(res => {
                   // console.log(res)
                    context.commit('setLoading', false);  
                    context.commit('setTeam', res.data.user);
                    context.commit('getUser', res.data.user);
                }).catch(err => {
                    context.commit('setLoading', false);
                    context.commit('setError', err.response.data.message);
                })
            },

            logout(context){
                context.commit('clearToken');
                Cookie.remove('jwt');
                Cookie.remove('userId');
                Cookie.remove('tokenExpiration');
                if(process.client){
                    localStorage.removeItem('token');
                    localStorage.removeItem('userId');
                    localStorage.removeItem('tokenExpiration');
                }
                context.state.user = "";

            },
            //get all the recieved requests
            getSentRequests(context){
                // console.log(context)
                context.commit('setLoading', true);
                context.commit('clearError');
                return axios.get(`process.env.server/team/getSentRequests/${context.state.user}`, {
                    headers:{
                        Authorization: `Bearer ${context.state.token}`
                    }
                }).then(res => {   
                    //console.log(res.data)
                    context.commit('setLoading', false);   
                    context.commit('sentRequests', res.data.result);
                }).catch(err => {
                    context.commit('setLoading', false);
                    context.commit('setError', err.response.data.message);
                });
            },

            getRecievedRequests(context){
                context.commit('setLoading', true);
                context.commit('clearError');
                return axios.get(`process.env.server/team/getRecievedRequests/${context.state.user}`, {
                    headers:{
                        Authorization: `Bearer ${context.state.token}`
                    }
                }).then(res => {
                    context.commit('setLoading', false);  
                    context.commit('recievedRequests', res.data.result);
                    
                }).catch(err => {
                    context.commit('setLoading', false);
                    context.commit('setError', err.response.data.message);
                });
            },

            acceptRequest(context, payload){
                context.commit('setLoading', true);
                context.commit('clearError');
                return axios.put(`process.env.server/team/acceptRequest/${context.state.user}`, payload, {
                    headers:{
                        Authorization: `Bearer ${context.state.token}`
                    }
                }).then(res => {
                    context.commit('setLoading', false);  
                    // context.dispatch('recievedRequests', res.data.result);
                    
                }).catch(err => {
                    context.commit('setLoading', false);
                    context.commit('setError', err.response.data.message);
                });
            },

            cancelRequest(context, payload){
                context.commit('setLoading', true);
                context.commit('clearError');
                return axios.put(`process.env.server/team/cancelRequest/${context.state.user}`, payload, {
                    headers:{
                        Authorization: `Bearer ${context.state.token}`
                    }
                }).then(res => {
                    context.commit('setLoading', false);  
                    // context.dispatch('recievedRequests', res.data.result);
                    
                }).catch(err => {
                    context.commit('setLoading', false);
                    context.commit('setError', err.response.data.message);
                });
            },

            declineRequest(context, payload){
                context.commit('setLoading', true);
                context.commit('clearError');
                return axios.put(`process.env.server/team/declineRequest/${context.state.user}`, payload, {
                    headers:{
                        Authorization: `Bearer ${context.state.token}`
                    }
                }).then(res => {
                    context.commit('setLoading', false);  
                    // context.dispatch('recievedRequests', res.data.result);
                    
                }).catch(err => {
                    context.commit('setLoading', false);
                    context.commit('setError', err.response.data.message);
                });
            },

            //auth initialization
            initAuth(context, req){
                let userId;
                let token;
                let exp;

                if(req){
                    if(!req.headers.cookie){
                        return;
                    }
                    const jwtCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('jwt='));
                    const jwtExp = req.headers.cookie.split(';').find(c => c.trim().startsWith('tokenExpiration='));
                    
                    if(!jwtCookie){
                        return;
                    }

                    userId = req.headers.cookie.split(';').find(c => c.trim().startsWith('userId=')).split('=')[1];
                    token = jwtCookie.split('=')[1];  
                    exp = jwtExp.split('=')[1];
                }else{
                    userId = localStorage.getItem('userId');
                    token = localStorage.getItem('token');
                    exp = localStorage.getItem('tokenExpiration');
                }
                if(new Date().getTime() > +exp || !token){
                    context.dispatch('logout');
                   return; 
               }
                context.commit('setUser', userId,);
                context.commit('setToken', token);
                
            },

            signup(context, payload){
                const data = payload;
                let pos;
                let ctx = context
                context.commit('setLoading', true);
                context.commit('clearError');

                if(!navigator.geolocation){
                    return "Sorry, Your Browser does not support location"
                  }

                  navigator.geolocation.getCurrentPosition(poss => {
                   pos = poss;
                   console.log(pos)
                   return axios.put(`process.env.server/auth/signup`, {...data, lat: pos.coords.latitude, lon: pos.coords.longitude, dateTime : new Date()}).then(res => {
                    context.commit('setLoading', false);
                  }).catch(err => {
                    context.commit('setLoading', false);
                      console.log(err)
                  });
                  },err => {
                    context.commit('setLoading', false);  
                    context.commit('setError', err.message);
                  },{enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }   )

            },
        

            login(context, payload){
                context.commit('setLoading', true);
                context.commit('clearError');
                return axios.put(`process.env.server/auth/login`, payload).then(res => {
                    
                    console.log(res);
                    const hours = 60 * 60 * 5;
                    context.commit('setToken', res.data.token);
                    context.commit('setUser', res.data.userId);
                    localStorage.setItem('token', res.data.token); 
                    localStorage.setItem('userId', res.data.userId); 
                    localStorage.setItem('tokenExpiration', new Date().getTime() + hours * 1000);
                    Cookie.set('jwt', res.data.token);
                    Cookie.set('userId', res.data.userId);
                    Cookie.set('tokenExpiration', new Date().getTime() + hours  * 1000);
                    context.commit('setLoading', false);
                }).catch(err => {
                    console.log(err.response.data.message)
                    context.commit('setLoading', false);
                    context.commit('setError', err.response.data.message);
                    
                });
            },
            requestConnection(context, payload){
                context.commit('setLoading', true);
                context.commit('clearError');
                return axios.put(`process.env.server/team/sendRequest?userId=${context.state.user}`, payload, {
                    headers:{
                        Authorization: `Bearer ${context.state.token}`
                    }
                }).then(res => {
                    context.commit('setLoading', false);
                    console.log(res.data);
                }).catch(err=> {
                    console.log(err.response.data)
                    context.commit('setLoading', false);
                    context.commit('setError', err.response.data.message);
                });
            }
        },
        getters :{
            isAuthenticated(state){
                return state.token != null 
            },
            user(state){
                return state.user 
            },
            loading(state){
                return state.loading
            },
            error(state){
                return state.error
            },
            getUser(state){
            return id =>  state.members.find(mem => mem._id === id)
            }
        }
    })
}

export default createStore  