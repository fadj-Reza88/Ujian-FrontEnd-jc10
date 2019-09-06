import React, { Component } from 'react';
import Axios from 'axios'
import {connect} from 'react-redux'
import {urlApi} from '../../3.helpers/database'
// import {Link} from 'react-router-dom'
import {Redirect} from 'react-router-dom'

class Wishlist extends Component {
        state = {
           WishlistData : [],
            
        }
    
        componentWillReceiveProps(newProps){
            this.getWishlistCart(newProps.id)
        }
    
        componentDidMount(){
            this.getWishlistCart(this.props.id)
        }
    
        
        getWishlistCart = (id) => {
            Axios.get(urlApi + 'Wishlist?userId=' + id)
            .then(res => {
                console.log(res)
                this.setState({WishlistData : res.data})
            })
            .catch(err => {
                console.log(err)
            })
        }
    
        renderWishlist = () => {
            var jsz = this.state.WishlistData.map((val, idx) => {
                return (
                    <tr>
                        <td>{val.nama}</td>
                        <td>{val.totalPrice}</td>
                        {/* <td><Link to={'/history-detail/' + val.id} style={{textDecoration:'none'}}>
                             Show details
                             </Link>
                        </td> */}
                    </tr>
                )
            })
    
            return jsz
        }

    render() {
        if(this.props.role === ''){
           return <Redirect to='/'></Redirect> 
        }
        
        return (
            <div className="container">
                
                <h4 className="text-center">Wishlist</h4>
                
                <table className="table mt-3 text-center">
                    <thead>
                        <tr>
                            <th>Name</th>
                            
                            <th>Detail</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderWishlist()}
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

export default connect(mapStateToProps)(Wishlist)