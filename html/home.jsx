var Router = window.ReactRouter.Router;
var Route = window.ReactRouter.Route;
var hashHistory = window.ReactRouter.hashHistory;
var browserHistory = window.ReactRouter.browserHistory;
var Link = window.ReactRouter.Link;

class ShowPost extends React.Component {

        constructor(props) {
            super(props);
            this.updatePost = this.updatePost.bind(this);
            //this.getPost = this.getPost.bind(this);
            this.state = {
                posts:[]
            };
        }
    //componentDidMount(){
        //document.getElementById('homeHyperlink').className = "active";
        //document.getElementById('addHyperLink').className = "";
    //}


    componentDidMount(){
        var self = this;
        axios.post('/getPost', {
        })
            .then(function (response) {
                self.setState({posts:response.data})
            })
            .catch(function (error) {
                console.log('error is ',error);
            });
    }

    updatePost(id){;
        hashHistory.push('/addPost/' + id);
    }

    render() {
        return (
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Subject</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
              {
                  this.state.posts.map(function(post,index) {
                      return <tr key={index} >
                          <td>{index+1}</td>
                          <td>{post.title}</td>
                          <td>{post.subject}</td>
                          <td>
                              <span onClick={this.updatePost.bind(this,post._id)} className="glyphicon glyphicon-pencil"></span>
                          </td>
                          <td>
                              <span className="glyphicon glyphicon-remove"></span>
                          </td>
                      </tr>
                  }.bind(this))
                  }
                </tbody>
            </table>
        )
    }

}


class AddPost extends React.Component {

    constructor(props) {
        super(props);
        this.addPost = this.addPost.bind(this);
        //this.getPostWithId = this.getPostWithId.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleSubjectChange = this.handleSubjectChange.bind(this);
        this.state = {
            title:'',
            subject:'',
            id:''
        };
    }

    handleTitleChange(e){
        this.setState({title:e.target.value})

    }

    handleSubjectChange(e){
        this.setState({subject:e.target.value})
    }

    addPost(){

        axios.post('/addPost', {
            title: this.state.title,
            subject: this.state.subject,
            id: this.props.params.id
        })
            .then(function (response) {
                console.log('response from add post is ',response);
                hashHistory.push('/')
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    componentDidMount(){
        var id = this.props.params.id;
        var self = this;
        axios.post('/getPostWithId', {
            id: id
        }).then(function (response) {
            if(response){
                self.setState({title:response.data.title});
                self.setState({subject:response.data.subject});
                self.setState({id:response.data.id});
            }
        })
            .catch(function (error) {
                console.log('error is ',error);
            });
    }

    render() {
        return (
            <div className="col-md-5">
                <div className="form-area">
                    <form role="form">
                        <br styles="clear:both" />
                        <div className="form-group">
                            <input type="text" value={this.state.title} onChange={this.handleTitleChange} className="form-control" id="title" name="title" placeholder="Title" required />
                        </div>

                        <div className="form-group">
                            <textarea value={this.state.subject} className="form-control" type="textarea" onChange={this.handleSubjectChange} name="subject"id="subject" placeholder="Subject" maxlength="140" rows="7"></textarea>
                        </div>

                        <button type="button" id="submit" name="submit" onClick={this.addPost} className="btn btn-primary pull-right">Add Post</button>
                    </form>
                </div>
            </div>
        )
    }

}




    ReactDOM.render(
        <Router history={hashHistory}>
            <Route component={ShowPost} path="/"></Route>
            <Route component={AddPost} path="/addPost(/:id)"></Route>
        </Router>,
document.getElementById('app')
);