import React from 'react';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import './App.css';
import FaceFind from './components/FaceFind/FaceFind';


const inicialState = {
      input: '',
      imageUrl:'',
      box:{},
      route: 'signin',
      isSignin: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
}
}

class App extends React.Component {
  constructor() {
    super();
    this.state = inicialState;
    }

  loadUser = (data) => {
    this.setState({ user: {
          id: data.id,
          name: data.name,
          email: data.email,
          entries: data.entries,
          joined: data.joined
    }
    })
  }

  calculateFaceDetection = (data) => {
    const getFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const img = document.getElementById('inputimage'); 
    const width = Number(img.width);
    const height = Number(img.height);
    console.log(width, height);
    console.log(getFace);
    return {
      leftCol: getFace.left_col * width,
      topRow: getFace.top_row * height,
      rightCol: width - (getFace.right_col * width),
      bottomRow: height - (getFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }
  
  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    fetch('https://vast-citadel-23646.herokuapp.com/imageUrl', {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response => response.json())
    .then(response => {
      if(response) {
        fetch('https://vast-citadel-23646.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: this.state.user.id
            })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, { entries: count }))
        })
      }
      this.displayFaceBox(this.calculateFaceDetection(response))
    })
    .catch(error => console.log(error));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(inicialState)
    } else if (route === 'home') {
      this.setState({isSignin: true})
    }
    this.setState({route: route});
  }
  

  render() 
  {
    return (
      <div className="App">
        <Particles className='particles'
                  params={{
                    "particles": {
                        "number": {
                            "value": 150
                        },
                        "size": {
                            "value": 2
                        }
                    },
                    "interactivity": {
                        "events": {
                            "onhover": {
                                "enable": true,
                                "mode": "repulse"
                            }
                        }
                    }
                  }} />
        <Navigation isSignin={this.state.isSignin} onRouteChange={this.onRouteChange}/>
        { this.state.route === 'home' 
        ? <div>
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries}/>
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
            <FaceFind box={this.state.box} imageUrl={this.state.imageUrl}/>
          </div>
        : ( this.state.route === 'signin' 
            ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> 
            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          )
        }
    </div>
    );
  }
}

export default App;
