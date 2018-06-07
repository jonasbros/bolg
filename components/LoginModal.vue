<template>
<div>
    <v-card-title>
        <span class="headline">Login to bolg</span>
    </v-card-title>
    <v-container>
        <v-card-text>
            <v-form v-model="valid" @keydown.enter="login()" ref="loginForm">
                <v-layout wrap>           
                    <!-- email field -->
                    <v-flex xs12>
                        <v-text-field
                        label="Email"
                        v-model="le"
                        :rules="emailRules"
                        :error-messages="errors.email"
                        required
                        color="teal"
                        >                        
                        </v-text-field>
                    </v-flex>
                    <!-- password field -->
                    <v-flex xs12>
                        <v-text-field
                        label="Password"
                        hint="At least 8 characters"
                        v-model="lp"
                        min="8"
                        max="32"
                        maxlength="32"               
                        counter="32"            
                        :rules="passwordRules"        
                        :append-icon="lpv ? 'visibility' : 'visibility_off'"
                        :append-icon-cb="() => (lpv = !lpv)"
                        :type="lpv ? 'password' : 'text'"
                        :error-messages="errors.password"
                        required
                        color="teal"
                        >
                        </v-text-field>
                    </v-flex> <!-- password field -->         

                    <!-- remember me -->
                    <v-flex xs12>
                        <v-checkbox
                        label="Remember me"
                        v-model="remember"
                        color="teal"
                        ></v-checkbox>    
                    </v-flex>
                </v-layout>
            </v-form>

            <v-layout>
                <!-- fb login button -->
                <div class="fb-login-btn" @click="FBLogin();">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="_1pbq" color="#ffffff"><path fill="#ffffff" fill-rule="evenodd" d="M8 14H3.667C2.733 13.9 2 13.167 2 12.233V3.667A1.65 1.65 0 0 1
                    3.667 2h8.666A1.65 1.65 0 0 1 14 3.667v8.566c0 .934-.733
                    1.667-1.667
                    1.767H10v-3.967h1.3l.7-2.066h-2V6.933c0-.466.167-.9.867-.9H12v-1.8c.033
                    0-.933-.266-1.533-.266-1.267 0-2.434.7-2.467
                    2.133v1.867H6v2.066h2V14z"></path>
                    </svg>
                    <span>Login with Facebook</span>                    
                </div>
            </v-layout>
        </v-card-text>
    </v-container>

    <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn outline flat @click.native="close">Close</v-btn>
            <v-btn outline flat @click.native="login" :disabled="loading" :loading="loading">Login</v-btn>
    </v-card-actions>
</div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
      return {
            config: this.$store.state.config,
            loader: null,
            loading: false,
            lpv: true,
            logindialog: false,
            valid: true,
            remember: false,
            le: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
            ],
            lp: '',
            passwordRules: [
                v => !!v || 'Password is required',
                v => v.length >= 8 || 'Password must be at least 8 characters'
            ],
            errors: {
                email: [],
                password: []
            }
      }
  },
  methods: {
    FBLogin() {
        this.$store.commit( 'FBLogin' );
    },
    reset() {
        setTimeout(function() {
            if( !this.$refs.loginForm.validate() ) {
                this.$refs.loginForm.reset();
            }
        }.bind(this), 250);
    },
    close() {          
        this.$root.$emit('logindialog', false);
        // this.$refs.loginForm.reset();
    },
    login() {                    
        const body = {
            email: this.le,
            password: this.lp,
            remember: this.remember,
        }
        // if validation success check api, validate there again ( if user exists, wrong password, etc. )
        if( this.$refs.loginForm.validate() ) {
            //button loading aniomation
            this.loader = 'loading';
            const l = this.loader;
            this[l] = !this[l];
            //login 
            axios.post( this.config.api + 'login.php', body, this.config.axiosHeader )
            .then( function(response) {
                //loader button
                this[l] = false;                        
                this.loader = null;
                if( response.data.error ) {
                    // login error ( wrong credentials )
                    this.errors.email.push(response.data.login);
                    this.errors.password.push(response.data.login);
                }else {
                    //close modal dialog
                    this.close();
                    //loading screen
                    this.$store.commit( 'setLoadingScreen', true );
                    //login success!
                    setTimeout(function() {
                        this.$store.commit( 'setLoadingScreen', false );
                        this.$store.dispatch( 'userLogin', response.data );
                    }.bind(this), 750);
                    
                }
            }.bind(this) );
        }      
    }  
  }
}
</script>

<style lang="sass" scoped>

</style>
