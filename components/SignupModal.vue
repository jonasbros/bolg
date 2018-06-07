<template>
  <div>
      <v-card-title>
        <span class="headline">Sign up</span>
    </v-card-title>
    <v-container>
        <v-card-text>
            <v-form v-model="valid" @keydown.enter="signup()" ref="signupForm">
                <v-layout wrap>           
                    <!-- email field -->
                    <v-flex xs12>
                        <v-text-field
                        label="Email"
                        v-model="ee"
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
                        v-model="ep"
                        min="8"
                        max="32"
                        maxlength="32"
                        counter="32"                
                        :rules="passwordRules"        
                        :append-icon="epv ? 'visibility' : 'visibility_off'"
                        :append-icon-cb="() => (epv = !epv)"
                        :type="epv ? 'password' : 'text'"
                        :error-messages="errors.password"
                        required
                        color="teal">
                        </v-text-field>
                    </v-flex> <!-- password field -->    
                     <!-- password again field -->
                    <v-flex xs12>
                        <v-text-field
                        label="Confirm password"
                        hint="At least 8 characters"
                        v-model="epa"
                        min="8"
                        max="32"
                        maxlength="32"
                        counter="32"                
                        :rules="passwordAgainRules"        
                        :append-icon="epav ? 'visibility' : 'visibility_off'"
                        :append-icon-cb="() => (epav = !epav)"
                        :type="epav ? 'password' : 'text'"
                        :error-messages="errors.passwordAgain"
                        required
                        color="teal">
                        </v-text-field>
                    </v-flex> <!-- password again field -->            
                </v-layout>

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
            </v-form>
        </v-card-text>
    </v-container>

    <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn outline flat @click.native="close">Close</v-btn>
            <v-btn outline flat @click.native="signup" :disabled="loading" :loading="loading">Signup</v-btn>
    </v-card-actions>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    watch: {
        ee(email) {
            //clear errors on keydown
            if( this.errors.email.length > 0 ) {
                this.errors.email = [];
            }            
        }
    },
    data() {
        return{
            config: this.$store.state.config,
            loader: null,
            loading: false,
            epv: true,
            epav: true,
            signupdialog: false,
            valid: true,
            ee: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
            ],
            ep: '',
            passwordRules: [
                v => !!v || 'Password is required',
                v => v.length >= 8 || 'Password must be at least 8 characters'
            ],
            epa: '',
            passwordAgainRules: [
                v => !!v || 'Please confirm password',
                v => v.length >= 8 || 'Password must be at least 8 characters',
                v => v === this.ep || 'Passwords must match'
            ],
            errors: {
                email: [],
                password: [],
                passwordAgain: [],

            },
            isLoading: false,
        }
    },
    methods: {
        FBLogin() {
            this.$store.commit( 'FBLogin' );
        },
        reset() {
            this.$refs.signupForm.reset();
        },
        close() {
            //emit event on button click
            this.$root.$emit('signupdialog', false);
            //clear validation errors
            // this.$refs.signupForm.reset();
        },
        signup() {           

            const body = {
                email: this.ee,
                password: this.ep,
                password_again: this.epa,
            }            

            this.errors = {
                email: [],
                password: [],
                passwordAgain: []
            }
            //validate form            
            if( this.$refs.signupForm.validate() ) { 
                this.loader = 'loading';
                const l = this.loader;
                this[l] = !this[l];
                             
                axios.post( this.config.api + 'register.php', body, this.config.axiosHeader )
                .then( function(response) {
                    //loader button
                    this[l] = false;                        
                    this.loader = null;
                    console.log(response);
                    if( !response.data.hasOwnProperty('error') ) {
                        //close modal
                        this.close();
                        //display loading screen while getting user data and login      
                        this.$store.commit( 'setLoadingScreen', true );           
                        setTimeout(function() {
                            this.login(response.data.uid);                  
                        }.bind(this), 750);       
                    }
                    
                    if( response.data.hasOwnProperty('email') ) {
                        //filter used == capitalize first letter
                        this.errors.email.push(this.$options.filters.ucfirst(response.data.email));
                        return;
                    }
                    
                }.bind(this) );
            }
            // this.close();
        },
        login(uid) {
            const payload = {
                session: {
                    session_id: uid
                },
                remember: [],
            }
            console.log(payload);
            this.$store.dispatch( 'userLogin', payload );
        }
    }
  
}
</script>
