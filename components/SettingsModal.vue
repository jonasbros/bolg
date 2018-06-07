<template>
    <v-layout class="form-container" column nowrap>
        <v-flex>
            <h2>Account Settings</h2>
        </v-flex>
        <v-flex>            
            <div class="form-container-inner">
                <v-form v-model="settingsValid" ref="settingsForm">
                    <v-layout row wrap>
                        <v-flex xs8>
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
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs4 class="dp-container">
                            <!-- dp -->
                            <div class="dp-setting" :style="'background-image: url('+ picture +')'" @click="$refs.dpuploadinput.click()" :class="{'picture-error' : pictureError.error}"></div>
                            <p class="ma-0 text-xs-center" :class="( !pictureError.error ? 'grey--text' : 'deep-orange--text')"><small>{{ ( !pictureError.error ? '*click to change picture' : pictureError.msg )}}</small></p>
                            <input type="file" ref="dpuploadinput" v-show="false" @change="uploadPicture">
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
                            ></v-text-field>
                        </v-flex>

                        <v-flex v-if="!socialAuth">
                            <h3>Change Password</h3>
                        </v-flex>

                        <v-flex xs12 v-if="!socialAuth">
                            <!-- old password -->
                            <v-text-field
                            v-model="oldPassword"
                            label="Old Password"
                            counter="32"
                            maxlength="32"
                            color="teal"
                            ></v-text-field>
                        </v-flex>

                        <v-flex xs12 v-if="!socialAuth">
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
                        <v-flex xs12 v-if="!socialAuth">
                            <!-- confirm password -->
                            <v-text-field
                            v-model="newPasswordAgain"
                            label="Confirm New Password"
                            counter="32"
                            maxlength="32"
                            color="teal"
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
            
                </v-form>
            </div>            
        </v-flex>

        <v-flex class="text-xs-right">
            <v-spacer></v-spacer>
            <v-btn outline flat @click.native="$root.$emit('settingsModal', false)">Close</v-btn>
            <v-btn outline flat @click.native="saveSettings();" class="mr-0">Save Changes</v-btn>
        </v-flex>
    </v-layout>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
    props: [
        'profile',
        'toggle',
    ],
    data() {
        return {
            config: this.$store.state.config,
            settingsValid: true,
            name: '',
            about: '',
            whatdo: '',
            url: '',
            picture: '',
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
            hasEdits: false,
            pictureError: {
                error: false,
                msg: '',
            }

        }        
    },
    computed: {
        ...mapGetters({
            isLoggedIn: 'getLoginState',
            socialAuth: 'getSocialAuth',
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
    },

    methods: {
        //validate picture
        validatePicture() {
            const image = this.$refs.dpuploadinput.files[0];
            const i = image.type.split('/');
            if( i[0] == 'image' ) {
                this.pictureError.error = false;
                this.pictureError.msg = '';
                return true;
            }

            this.pictureError.error = true;
            this.pictureError.msg = 'Image files only.';
            return false;
        },
        //upload picture but not change from database yet
        uploadPicture() {
            //fd = formdata
            const fd = new FormData();
            fd.append('image', this.$refs.dpuploadinput.files[0]);
            fd.append( 'user_id', this.profile.user_id );
            fd.append( 'screen_width', window.screen.width );
            //save in posts or dp folder
            fd.append( 'folder', 'dp' );
            //validate if file is image
            if( this.validatePicture() ) {
                axios.post( this.config.api + 'imageupload.php', fd, this.config.axiosHeader )
                .then( function(response) {
                    console.log(response);
                    if( response.data.success ) {
                        this.picture = response.data.url;
                    }
                }.bind(this) )
                .catch( function(response) {
                    console.log(response);
                } );
            }
            
        },  
        //assign values to input boxes
        modalInit() {
            setTimeout(() => {
                this.name    = this.profile.name;
                this.about   = this.profile.about;
                this.whatdo  = this.profile.whatdo;
                this.url     = this.profile.url;
                this.picture = this.profile.display_picture;
            }, 150 );
        },
        //trim inputs
        trimInputs() {
            this.name    = this.name.trim();
            this.about   = this.about.trim();
            this.whatdo  = this.whatdo.trim();
            this.url     = this.url.trim();
            this.picture = this.picture.trim();
        },
        //save settings. 'save changes' button click
        saveSettings() {
            //trim inputs before submitting
            this.trimInputs();
            
            //apply timeout to give time to trim i think xd
            setTimeout( () => {
                if( this.$refs.settingsForm.validate() ) { 
                    this.nameEdit();
                    this.aboutEdit();
                    this.whatdoEdit();
                    this.urlEdit();
                    this.pictureEdit();

                    this.profile.name = this.name;
                    this.profile.about = this.about;
                    this.profile.whatdo = this.whatdo;
                    this.profile.url = this.url;
                    this.profile.display_picture = this.picture;

                    this.$store.commit( 'updateUserData', this.profile );
                    this.$store.commit( 'updateUserCookie', this.profile );

                    //refresh page
                    this.$router.push('/profile/' + this.url);
                    this.$router.go();
                }
            }, 0 );
            
        },
        //picture save
        pictureEdit() {
            this.editExecute({
                table : 'user_profiles',
                field : 'display_picture',
                where : 'user_id = ' + this.profile.user_id,
                newstr: this.picture,
            });
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
        //edit what do
        urlEdit() {
            this.editExecute({
                table : 'user_profiles',
                field : 'url',
                where : 'user_id = ' + this.profile.user_id,
                newstr: this.url,
            });
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
                console.log(params);
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
                .catch( function(response) {                        
                    console.log(response.data);
                } );

                this.$root.$emit('settingsModal', false);
       }
    }

}
</script>

<style lang="sass" scoped>
/* settings modal styles */
.form-container
    background-color: #fff
    padding: 25px 45px
.form-container-inner
    padding: 40px 0 15px

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
