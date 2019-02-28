import React from 'react';
import { Table } from 'react-bootstrap';
import Request from '../../services/Request';
import { connect } from 'react-redux'
import { showDialog } from '../../actions';

const mapDispatchToProps = dispatch => ({
    showPopup: (title, message) => dispatch(showDialog(title, message))
})

class UsersPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
    }

    componentDidMount() {
        const request = new Request().getRequestInstance();
        request.get('user/findAll')
            .then((response) => {
                console.log(response);
                this.setState({ users: response.data });
            }).catch((error) => {
                console.log(error);
                var errorMessage = 'Network error.';
                if (error != null && error.response != null && error.response.data != null && error.response.data.message != null) {
                    errorMessage = error.response.data.message;
                }
                this.props.showPopup(0, errorMessage);
            });
    }

    // Want to use async/await? Add the `async` keyword to your outer function/method.
    // async getUser() {
    //     try {
    //         const response = await axios.get('/user?ID=12345');
    //         console.log(response);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    render() {

        return (
            <UserList users={this.state.users} />
        )
    }
}

class UserList extends React.Component {
    render() {
        const users = this.props.users.map((user, index) =>
            <User key={user.id} user={user} index={index} />
        );
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Username</th>
                        <th>TC No</th>
                    </tr>
                </thead>
                <tbody>
                    {users}
                </tbody>
            </Table>
        )
    }
}

class User extends React.Component {
    render() {
        return (
            <tr>
                <td>{this.props.index + 1}</td>
                <td>{this.props.user.username}</td>
                <td>{this.props.user.tcno}</td>
            </tr>
        )
    }
}

export default connect(null, mapDispatchToProps)(UsersPage)