import React, { Component } from 'react';
import Axios from 'axios'
import {connect} from 'react-redux'
import {urlApi} from '../../3.helpers/database'
import {Link} from 'react-router-dom'
import {Redirect} from 'react-router-dom'

class History extends Component {
        state = {
           HistoryData : [],
            
        }
    
        componentWillReceiveProps(newProps){
            this.getHistoryCart(newProps.id)
        }
    
        componentDidMount(){
            this.getHistoryCart(this.props.id)
        }
    
        
        getHistoryCart = (id) => {
            Axios.get(urlApi + 'history?userId=' + id)
            .then(res => {
                console.log(res)
                this.setState({HistoryData : res.data})
            })
            .catch(err => {
                console.log(err)
            })
        }
    
        renderHistory = () => {
            var jsy = this.state.HistoryData.map((val, idx) => {
                return (
                    <tr>
                        <td>{val.recepient}</td>
                        <td>{val.totalPrice}</td>
                        <td>{val.address}</td>
                        <td>{val.time}</td>
                        <td><Link to={'/history-detail/' + val.id} style={{textDecoration:'none'}}>
                             Show details
                             </Link>
                        </td>
                    </tr>
                )
            })
    
            return jsy
        }

    render() {
        if(this.props.role === ''){
           return <Redirect to='/'></Redirect> 
        }
        
        return (
            <div className="container">
                <table className="table mt-3 text-center">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Total Price</th>
                            <th>Address</th>
                            <th>Pay Time</th>
                            <th>Detail</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderHistory()}
                    </tbody>
                </table>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        id : state.user.id,
        username : state.user.username,
        role : state.user.role
    }
}

export default connect(mapStateToProps)(History)