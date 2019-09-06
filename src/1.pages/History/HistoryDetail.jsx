import React, { Component } from 'react'
import Axios from 'axios'
import {connect} from 'react-redux'
import {urlApi} from '../../3.helpers/database'
import {Redirect} from 'react-router-dom'


export class HistoryDetail extends Component {

    state ={
        historyDetail :{},
        item : []
    }


    componentDidMount = () => {
        this.getHistoryDetail()
    }

    getHistoryDetail = () => {
        Axios.get(urlApi + 'history/'+ this.props.match.params.id)
        .then((res) => {
            console.log(res)
            this.setState({historyDetail : res.data, item : res.data.items})
        })
        .catch((err) => console.log(err))
    }

    renderItems = () => {
        var history = this.state.item.map((val) => {
            return (
                <tr style={{textAlign:'center'}}>
                    <td>
                        <img style={{width:'80px'}} alt={val.productName} src={val.img}/>
                    </td>
                    <td>
                        {val.productName}
                    </td>
                    <td>
                        {val.price}
                    </td>
                    <td>
                        {
                            val.discount > 0 ? val.discount + "%" : "0"
                        }
                    </td>
                    <td>
                        {val.quantity}
                    </td>
                    <td  >
                        {(val.price - (val.price * val.discount / 100)) * val.quantity}
                    </td>
                </tr>
            )
        })
        return history
    }

    render(){
        if(this.props.role === ''){
            return <Redirect to='/'></Redirect> 
         }
        
            return(
                <div className='container'>
                    <table className="table col-md-8 col-12">
                                <thead>
                                    <tr>
                                        <th scope="col" >History Details </th>
                                    </tr>
                                    <tr>
                                        <td>Image</td>
                                        <td>Product Name</td>
                                        <td>Price /pcs</td>
                                        <td>Discount</td>
                                        <td>Quantity</td>
                                        <td>Price</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderItems()}
                                </tbody>
                                <tfoot>
                                    <th>Total Price = Rp. {this.state.historyDetail.totalPrice} </th>
                                </tfoot>
                    </table>
                </div>
            )
       
    }
}

const mapStateToProps =(state) => {
    return {
        username : state.user.username,
        role : state.user.role
    }
}

export default connect(mapStateToProps)(HistoryDetail)