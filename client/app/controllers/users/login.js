import Controller from '@ember/controller';
import {inject as service} from '@ember/service';

export default Controller.extend({
    session: service(),
    username: 'mhall',
    password: 'test',

    actions: {
        login() {
            let username = this.get('username')
            let password = this.get('password')
            this.set('errorMessage', null)
            if(username && password) {
                this.get('session').authenticate('authenticator:local', username, password).catch((reason) => {
                    this.set('errorMessage', reason.error || reason);
                });
            } else {
                if(!username && !password) {
                    this.set('errorMessage', 'Please provide a username and password')
                } else if(!username) {
                    this.set('errorMessage', 'Please provide a username')
                } else {
                    this.set('errorMessage', 'Please provide a password')
                }
            }
        }
    }
});
