<template>
    <v-container>
        <v-layout class="form-container" row wrap>            
            <v-flex xs12 md8 offset-md2>            
                <div class="form-container-inner elevation-1 text-xs-left">
                    <v-form v-model="settingsValid" ref="settingsForm">
                        <v-layout row wrap>
                            <v-flex xs12 class="mb-4">
                                <h1>Account Settings</h1>
                            </v-flex>
                            <v-flex xs12>
                                <!-- name -->
                                <v-text-field   
                                v-model="name"
                                label="Name"
                                color="teal"
                                multi-line
                                rows="2"
                                no-resize
                                :rules="[rules.required]"
                                validate-on-blur
                                @change="hasEdits.name = true"
                                ></v-text-field>
                            </v-flex>
                            
                            <v-flex xs12>                             
                                <!-- about -->
                                <v-text-field
                                v-model="about"
                                label="About"
                                multi-line
                                no-resize
                                rows="2"
                                counter="255"
                                maxlength="255"
                                color="teal"
                                auto-grow
                                @change="hasEdits.about = true"
                                ></v-text-field>
                            </v-flex>

                            <v-flex xs12>
                                <!-- whatdo -->
                                <v-text-field
                                v-model="whatdo"
                                label="What do you do?"
                                multi-line
                                no-resize
                                rows="2"
                                counter="255"
                                maxlength="255"
                                color="teal"
                                auto-grow
                                @change="hasEdits.whatdo = true"
                                ></v-text-field>
                            </v-flex>

                            <v-flex xs12>
                                <!-- url -->
                                <v-text-field
                                v-model="url"
                                label="Profile URL"
                                counter="32"
                                maxlength="32"
                                color="teal"
                                @change="hasEdits.url = true"
                                ></v-text-field>
                            </v-flex>

                            <v-flex v-if="!profile.socialAuth">
                                <h2>Change Password</h2>
                            </v-flex>

                            <v-flex xs12 v-if="!profile.socialAuth">
                                <!-- old password -->
                                <v-text-field
                                v-model="oldPassword"
                                label="Old Password"
                                counter="32"
                                maxlength="32"
                                color="teal"
                                ></v-text-field>
                            </v-flex>

                            <v-flex xs12 v-if="!profile.socialAuth">
                                <!-- new password -->
                                <v-text-field
                                v-model="newPassword"
                                label="New Password"
                                counter="32"
                                maxlength="32"
                                color="teal"
                                ></v-text-field>
                            </v-flex>
                            <!-- <v-spacer></v-spacer> -->
                            <v-flex xs12 v-if="!profile.socialAuth">
                                <!-- confirm password -->
                                <v-text-field
                                v-model="newPasswordAgain"
                                label="Confirm New Password"
                                counter="32"
                                maxlength="32"
                                color="teal"
                                ></v-text-field>
                            </v-flex>

                            <v-flex xs12 class="text-xs-left">
                                <v-spacer></v-spacer>
                                <!-- <v-btn outline flat @click.native="$root.$emit('settingsModal', false)">Close</v-btn> -->
                                <v-btn outline flat @click.native="saveSettings();" class="ml-0">Save Changes</v-btn>
                            </v-flex>
                        </v-layout>
                
                    </v-form>
                </div>            
            </v-flex>
        </v-layout>
    </v-container>
    
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            config: this.$store.state.config,
            settingsValid: true,
            name: '',
            about: '',
            whatdo: '',
            url: '',
            oldPassword: '',
            newPassword: '',
            newPasswordAgain: '',
            rules: {
                required: (value) => !!value || 'Field is required.',
                email: (value) => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return pattern.test(value) || 'Invalid e-mail.'
                }
            },
            pictureError: {
                error: false,
                msg: '',
            },
            hasEdits: {
                name: false,
                about: false,
                whatdo: false,
                url: false,
            },
            editSuccess: {
                name: false,
                about: false,
                whatdo: false,
                url: false,
            }

        }        
    },
    computed: {
        ...mapGetters({
            isLoggedIn: 'getLoginState',
            socialAuth: 'getSocialAuth',
            profile: 'getUserData',
        }),
    },
    mounted() {
        //assign values to input boxes
        this.modalInit();
        
        //if modal is closed revert changes
        this.$root.$on('settingsModalClosed', (state) => {
            if( state ) {
                this.modalInit();
            }
        });

        //watch editsuccess property
        this.$watch('editSuccess', (succ) => {
           this.reloadSettings();
        },{deep : true})
    },
    methods: {
        reloadSettings() {
            //refresh page if has edits
            for( var edits in this.hasEdits ) {                
                if( this.hasEdits[edits] && this.editSuccess[edits]) {
                    this.$router.go();
                    return;
                }                
            }        
        },
        //assign values to input boxes
        modalInit() {
            setTimeout(() => {
                this.name    = this.profile.name;
                this.about   = this.profile.about;
                this.whatdo  = this.profile.whatdo;
                this.url     = this.profile.url;
            }, 150 );
        },
        //trim inputs
        trimInputs() {
            this.name    = this.name.trim();
            this.about   = this.about.trim();
            this.whatdo  = this.whatdo.trim();
            this.url     = this.url.trim();
        },
        //save settings. 'save changes' button click
        saveSettings() {
            //trim inputs before submitting
            this.trimInputs();
            
            //apply timeout to give time to trim i think xd
            setTimeout( () => {
                if( this.$refs.settingsForm.validate() ) { 

                    switch (true) {
                        case this.hasEdits.name:
                            this.nameEdit();
                        break;

                        case this.hasEdits.about:
                            this.aboutEdit();
                        break;

                        case this.hasEdits.whatdo:
                            this.whatdoEdit();
                        break;

                        case this.hasEdits.url:
                            this.urlEdit();
                        break;

                        case this.hasEdits.picture:
                            this.pictureEdit();
                        break;
                    }

                    this.profile.name = this.name;
                    this.profile.about = this.about;
                    this.profile.whatdo = this.whatdo;
                    this.profile.url = this.url;

                    this.$store.commit( 'updateUserData', this.profile );
                    this.$store.commit( 'updateUserCookie', this.profile );

                    //refresh page
                    // this.reloadSettings();
                }
            }, 0 );
            
        },
        //edit name
        nameEdit() {
            this.editExecute({
                table : 'user_profiles',
                field : 'name',
                where : 'user_id = ' + this.profile.user_id,
                newstr: this.name,
            });
        },
        //edit about
        aboutEdit() {
            this.editExecute({
                table : 'user_profiles',
                field : 'about',
                where : 'user_id = ' + this.profile.user_id,
                newstr: this.about,
            });
        },
        //edit what do
        whatdoEdit() {
            this.editExecute({
                table : 'user_profiles',
                field : 'whatdo',
                where : 'user_id = ' + this.profile.user_id,
                newstr: this.whatdo,
            });
        },
        //edit url
        // url has different backend function
        urlEdit() {
            const body = {
                user_id: this.profile.user_id,
                url: this.url,
            }

            axios.post( this.config.api + '/changeurl.php', body, this.config.axiosHeader )
            .then( function(response) {
                console.log(response);
            } )
            .catch( function(response) {
                console.log(response);
            } );
        },
        //execute edit 
        /* 
            params: 
            'table' database table string
            'field' database table field string
            'where' where clause database query string
            'newstr' short for new string aka the new value
            'id' value to identify row
            'sanitize' sanitize new value input; defaults is false        
        */
        editExecute(params = {}) {        
                var body =  {   
                    'table'     : params.table, 
                    'field'     : params.field, 
                    'where'     : params.where, 
                    'newstr'    : params.newstr, 
                    'id'        : params.id, 
                    'sanitize'  : 'false' 
                }
                //execute edit
                axios.post( this.config.api + '/update.php', body, this.config.axiosHeader )
                .then( function(response) {
                    console.log(response);
                    if( response.data == 'success!' ) {
                        this.$set(this.editSuccess, params.field, true);
                    }
                }.bind(this) )
                .catch( function(response) {                        
                    console.log(response.data);
                } );

                this.$root.$emit('settingsModal', false);
       }
    }

}
</script>

<style lang="sass" scoped>
.container
    margin-top: 56px
.form-container    
    padding: 0px 45px

.form-container-inner
    background-color: #fff
    padding: 40px 35px 15px

@media only screen and (max-width: 600px)
    .form-container  
        padding: 0 

    .form-container-inner
        padding: 40px 18px 15px

.dp-setting
    position: relative
    margin: 0 auto
    height: 98px
    width: 98px
    background:
        size: cover
        position: center
    border-radius: 69%
    cursor: pointer
    font-size: 98px        
    color: black
    text-align: center
    &.picture-error::after
        position: absolute
        content: "\00d7"
        height: 98px
        width: 98px
        top: 50%
        left: 50%
        background-color: #bce0e0
        transform: translate(-50%, -50%)
        border-radius: 69%
        line-height: 1

</style>
