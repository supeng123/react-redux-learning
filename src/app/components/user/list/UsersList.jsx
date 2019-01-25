import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Divider, List, ListItem, ListItemText } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { navigate } from "@reach/router";
import SearchIcon from '@material-ui/icons/Search';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import { connect } from 'react-redux';
import actions from '../../../userApi/actions';
import Progress from '../../common/Progress';
import Pagination from "material-ui-flat-pagination";

const styles = theme => ({
    listItem: {
        height: theme.spacing.unit * 6
    },
    root: {
        flexGrow: 1
    },
    flex: {
        flex: 1
    },
    searchDiv: {
        margin: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: "3.0em",
        width: "25%"
    },
    searchInput: {
        backgroundColor: "#547596",
        border: 0,
        borderRadius: "5px",
        color: "#ebfcfd",
        height: "32px",
        marginLeft: "0.5em",
        paddingLeft: "0.5em",
        width: "100%",
        '&::placeholder': {
            color: "#96a7a8"
        }
    }
});

class UsersList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            offset: 0,
            searchName: '',
            isSearching: false
        };
    }

    onHandleChange(event) {
        this.setState({
            searchName: event.target.value
        })
    }

    onSearchClick() {
        if (this.state.searchName){
            this.setState({
                isSearching: true
            })
        }
    }

    handleClick(offset) {
        this.setState({ offset });
    }

    componentDidMount() {
        this.setState({
            isSearching: false
        });
        this.props.fetchAll();
    }

    mapUsers = user => {
        const { classes } = this.props;
        return (
            <div key={user.id}>
                <ListItem
                    button
                    className={classes.listItem}
                    onClick={() => navigate(`/${user.login}`)}>
                    <Avatar alt={`${user.login} profile pic`} src={user.avatar_url} />
                    <ListItemText primary={`@${user.login}`} />
                </ListItem>
                <Divider />
            </div>
        );
    };

    render() {
        const {isLoading, users, classes } = this.props;
        const limit = 10;
        let items;
        const currentPage = this.state.offset * limit;
        if (this.state.isSearching) {
            items = users.filter(user => user.login === this.state.searchName).slice(currentPage, Number(currentPage + limit)).map(this.mapUsers)
        } else {
            items = users.slice(currentPage, Number(currentPage + limit)).map(this.mapUsers);
        }

        return (
            <div>
                <div className={classes.root}>
                    <AppBar style={{position: 'fixed'}}>
                        <Toolbar>
                            <Typography variant="title" color="inherit" className={classes.flex}>
                                Assignment github users
                            </Typography>
                            <div className={classes.searchDiv}>
                                <SearchIcon onClick={this.onSearchClick.bind(this)}/>
                                <input
                                    className={classes.searchInput}
                                    value={this.state.searchName}
                                    onChange={this.onHandleChange.bind(this)}
                                    placeholder="Search user..." />
                            </div>
                        </Toolbar>
                    </AppBar>
                </div>
                <Progress loading={isLoading}>
                    <List>
                        {items.length > 0 ? items: 'no user can be found'}
                        {items.length > 0 ? <Pagination
                            limit={1}
                            offset={this.state.offset}
                            total={Math.ceil(users.length / limit)}
                            onClick={(e, offset) => this.handleClick(offset)}
                        />: ''}
                    </List>
                </Progress>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    fetchAll: () => dispatch({ type: actions.user.FETCH_ALL })
});

const mapStateToProps = store => {
    const { user } = store;
    const { isLoading, users } = user;
    const error = user.error ? user.error : "";
    return { error, isLoading, users };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UsersList));