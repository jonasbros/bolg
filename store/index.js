import Vuex from 'vuex';
//momentjs
import moment from 'moment';
import moment_tz from 'moment-timezone';
//cookie and session library
import cookie from 'vue-cookie';
import session from 'vue-session';
//axios
import axios from 'axios';

const store = function() {
    return new Vuex.Store({
        state: {
            // configuration settings
            config: {
                api: 'https://00jonasperez.000webhostapp.com/',
                cookieName: 'f2d3e8d854b5f4f9b0a36faad181f138',
                sessionName: 'ee11cbb19052e40b07aac0ca060c23ee',
                axiosHeader: { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
                perPage: 10,
                sortBy: 'newest',
                excerptLength: 35,
                userTimezone: moment.tz.guess(),
            },
            isLoggedIn: false,
            socialAuth: false,
            userData: {},
            loadingScreen: false,
            fbResponse: null,
        },
        mutations: {
            //update userdata state
            updateUserData(state, payload) {
                this.state.userData = payload;
            },
            //set loading screen state
            setLoadingScreen(state, payload) {
                state.loadingScreen = payload;
            },
            //native bolg login
            setLogin(state, payload) {
                //store userdata in store state, login user
                state.userData = payload;
                state.userData.socialAuth = false;
                state.isLoggedIn = true;          
                state.loadingScreen = false;      
            },
            //logout
            logout(state) {
                //fb logout                
                FB.logout();
                state.fbResponse = null;
                state.isLoggedIn = false;
                state.socialAuth = false;
                state.userData = {};                
                cookie.delete('ud');
            },
            //reset user cookie
            updateUserCookie(state, payload) {
                cookie.delete('ud');
                cookie.set('ud', JSON.stringify(payload));
            },
            //set login cookie
            setUserCookie(state, payload) {
                //session only cookie
                if( payload[0].remember.length == 0 ) {
                    cookie.set('ud', JSON.stringify(payload[1]));
                }
                 //30 day remember cookie
                if(payload[0].remember.cookie != '') {               
                    cookie.set('ud', JSON.stringify(payload[1]), 30);
                }
                
            },
            //get fb login status
            FBGetLoginStatus(state, payload) {
                FB.getLoginStatus(function (response) {
                    state.fbResponse = response;
                });
            },
            //fb login button click
            FBLogin(state, payload) {
                FB.login(function(response) {
                    state.fbResponse = response;
                });
            },
            //on fb sign in success, get user data
            FBSigninSuccess(state, payload) {
                FB.api('/me?fields=id,name,picture.type(large)', function (user) {
                    //store user data in db and get that stored data from db and use it
                    axios.post(state.config.api + 'fbuser.php', user, state.config.axiosHeader)
                    .then(function (response) {
                        //set userData and cookie to response data
                        cookie.set('ud', JSON.stringify(response.data));
                        state.userData = response.data;
                        state.userData.socialAuth = true;
                        state.isLoggedIn = true;
                        state.socialAuth = true;
                        state.loadingScreen = false;                        
                    })
                    .catch(function (response) {
                        //if something goes wrong
                        console.log(response);
                    });
                });  
            }
        },
        actions: {
            //native bolg login
            userLogin( context, payload ) {
                // console.log(payload);
                const body = {
                    id: payload.session.session_id,
                };

                axios.post(context.state.config.api + 'getUser.php', body, context.state.config.axiosHeader)
                .then( function(response) {
                    //set userdata
                    context.commit( 'setLogin', response.data[0] );

                    //set userdata cookie
                    const cookie = [
                        payload,
                        response.data[0]
                    ];        
                    context.commit( 'setUserCookie', cookie );
                    context.commit( 'setLoadingScreen', false );
                }.bind(this));
                
            }
        },
        getters: {
            getUserData(state) {
                return state.userData;
            },
            getLoginState(state) {
                return state.isLoggedIn;
            },
            getSocialAuth(state) {
                return state.socialAuth;
            },
            getFBResponse(state) {
                return state.fbResponse;
            },
            getLoadingScreen(state) {
                return state.loadingScreen;
            },
            getUserID(state) {
                return state.userData.user_id;
            }
        }
    })
}

export default store