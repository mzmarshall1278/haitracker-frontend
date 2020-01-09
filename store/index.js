import vuex from 'vuex'
import axios from 'axios'
import Cookie from 'js-cookie'

const createStore = () => {
    return new vuex.Store({
        state : {
            name : "Muhammad",
            members : [
                {_id : '0987ytrdfghjuy',name : "MZ Marshall", relationship : "Boss",},
                {_id : '0982hjbjgghjuy',name : "Rizqat Marshall", relationship : "Bosser",},
                {_id : '0987ytrdfghjuy',name : "Harris Abubakar", relationship : "Father",},
                {_id : 'jhgvufytgbfufb',name : "Ahmad Haruna", relationship : "Brother",},
                {_id : 'njiohiuofefewe',name : "Bilqees Sani", relationship : "Sister-in-law",},
                {_id : 'uibyfvytfbuyfb',name : "Max Payne", relationship : "Neighbour",},
            ],
            user : '',
            token : null,
            error : null,
            loading : false,
            sentRequests : ''
        },
        mutations : {
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
                context.user = "";

            },
            //get all the recieved requests
            getSentRequests(context){
                context.commit('setLoading', true);
                context.commit('clearError');
                return axios.get(`http://localhost:4000/team/getSentRequests/${context.state.user}`).then(res => {   
                    console.log(res.data)
                    context.commit('setLoading', false);   
                    commit('sentRequests', res.data)
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
                context.commit('setLoading', true);
                context.commit('clearError');
                return axios.put(`http://localhost:4000/auth/signup`, payload).then(res => {
                    context.commit('setLoading', false);
                    console.log(res);
                }).catch(err => {
                    context.commit('setLoading', false);
                    context.commit('setError', err.response.data.message);
                });
            },
        

            login(context, payload){
                context.commit('setLoading', true);
                context.commit('clearError');
                return axios.put(`http://localhost:4000/auth/login`, payload).then(res => {
                    
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
                return axios.put(`http://localhost:4000/team/sendRequest?userId=${context.state.user}`, payload).then(res => {
                    context.commit('setLoading', false);
                    console.log(res.data)
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
            }
        }
    })
}

export default createStore  