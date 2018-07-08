var Router = window.ReactRouter.Router;
var Route = window.ReactRouter.Route;
var hashHistory = window.ReactRouter.hashHistory;
var Link = window.ReactRouter.Link;

class Signin extends React.Component {

    constructor(props){
        super(props);
        console.log('1111');
        this.signIn = this.signIn.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.state = {
            email:'',
            password:''
        };
    }


    signIn(){
        console.log('22222');
        //alert('Email address is ' + this.state.email + ' Password is ' + this.state.password);
        axios.post('/signin', {
            email: this.state.email,
            password: this.state.password
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleEmailChange(e){
        console.log('3333');
        this.setState({email:e.target.value})
    }

    handlePasswordChange(e){
        console.log('444');
        this.setState({password:e.target.value})
    }

    render(){
        return (
            <div>
            <form className="form-signin">

                <h2 className="form-signin-heading"> Please sign in </h2>

                <label for="inputEmail" className="sr-only"> Email address</label>

                <input type="email" onChange={this.handleEmailChange} id="inputEmail" className="form-control" placeholder="Email address" required autofocus />

                <label for="inputPassword" className="sr-only"> Password</label>

                <input type="password" onChange={this.handlePasswordChange} id="inputPassword" className="form-control" placeholder="Password" required />

                <button className="btn btn-lg btn-primary btn-block" onClick={this.signIn} type="button"> Sign in </button>

            </form>
            <div>
                <Link to="/signup">{'Signup'}</Link>
            </div>
            </div>
        )
    }
}

class Signup extends React.Component{
    render(){
        return (
            <div>
                <form className="form-signin">

                    <h2 className="form-signin-heading">Please sign up</h2>

                    <label for="inputName" className="sr-only">Name</label>

                    <input type="name" onChange={this.handleNameChange} id="inputName" className="form-control" placeholder="Name" required autofocus />

                    <label for="inputEmail" className="sr-only">Email address</label>

                    <input type="email" onChange={this.handleEmailChange} id="inputEmail" className="form-control" placeholder="Email address" required autofocus />

                    <label for="inputPassword" className="sr-only">Password</label>

                    <input type="password" onChange={this.handlePasswordChange} id="inputPassword" className="form-control" placeholder="Password" required />

                    <button className="btn btn-lg btn-primary btn-block" onClick={this.signUp} type="button">Sign up</button>
                </form>
                <div>
                    <Link to="/signin">{'SignIn'}</Link>
                </div>
            </div>
        )
    }

    handleNameChange(e){

    }

    handleEmailChange(e){

    }

    handlePasswordChange(e){

    }
}

ReactDOM.render(
    <Router history={hashHistory}>
        <Route component={Signin} path="/"></Route>
        <Route component={Signup} path="/signup"></Route>
    </Router>,

document.getElementById('app'));