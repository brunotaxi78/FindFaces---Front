import React from 'react';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: ''
        }
    }

    onNameChange = (event) => {
        this.setState({name: event.target.value})
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value})
    }

    onSubmitRegister = (event) => {
        event.preventDefault()
        fetch('https://vast-citadel-23646.herokuapp.com/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
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


    render() {
        const { onRouteChange } = this.props;
        return (
            <article className="br3 ba b--white-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 white-80">
                    <form className="measure">
                        <fieldset id="sign_up" className="ba b--black ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0 white">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6 white" htmlFor="name">Name</label>
                                <input 
                                className="br3 pa2 input-reset ba bg-black hover-bg-white hover-black w-100 blue" 
                                type="text" 
                                name="name"  
                                id="name"
                                onChange={ this.onNameChange }/>
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6 white" htmlFor="email-address">Email</label>
                                <input 
                                className="br3 pa2 input-reset ba bg-black hover-bg-white hover-black w-100 blue" 
                                type="email" 
                                name="email-address"  
                                id="email-address"
                                onChange={ this.onEmailChange }/>
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6 white" htmlFor="password">Password</label>
                                <input 
                                className="br3 b pa2 input-reset ba bg-black hover-bg-white hover-black w-100 blue" 
                                type="password" 
                                name="password"  
                                id="password"
                                onChange={ this.onPasswordChange }/>
                            </div>
                        </fieldset>
                        <div className="">
                                <input 
                                    onClick={this.onSubmitRegister}
                                    className="br3 ph3 pv2 input-reset ba b--white bg-black grow pointer f6 dib blue"
                                    type="submit" 
                                    value="Register"
                                />
                            </div>
                    </form>
                </main>
            </article>
    );
    }
}

export default Register;