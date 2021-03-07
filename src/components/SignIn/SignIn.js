import React from 'react';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }
    
    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    }

    onSubmitSignIn = (event) => {
        event.preventDefault()
        fetch('https://vast-citadel-23646.herokuapp.com/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
        .then(response => response.json())
        .then(user => {
            if(user.id) {
                this.props.loadUser(user);
                this.props.onRouteChange('home')
            }
        })
        
    }

    render(){
    const { onRouteChange } = this.props;
    return (
        <article className="br3 ba b--white-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 white-80">
                <form className="measure">
                    <fieldset id="sign_up" className="ba b--black ph0 mh0">
                    <legend className="f1 fw6 ph0 mh0 white">Sign In</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6 white" htmlFor="email-address">Email</label>
                        <input onChange={ this.onEmailChange } className="br3 pa2 input-reset ba bg-black hover-bg-white hover-black w-100 blue" type="email" name="email-address"  id="email-address"/>
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6 white" htmlFor="password">Password</label>
                        <input onChange={ this.onPasswordChange } className="br3 b pa2 input-reset ba bg-black hover-bg-white hover-black w-100 blue" type="password" name="password"  id="password"/>
                    </div>
                    </fieldset>
                        <div className="">
                            <input 
                                onClick={this.onSubmitSignIn}
                                className="br3 b ph3 pv2 input-reset ba b--white bg-black grow pointer f6 dib blue" 
                                type="submit" 
                                value="Sign in"
                            />
                        </div>
                    <div className="lh-copy mt3">
                        <p onClick={() => onRouteChange('register')} className="f6 link dim white db pointer">Register</p>
                    </div>
                </form>
            </main>
        </article>
    );
}
}

export default SignIn;