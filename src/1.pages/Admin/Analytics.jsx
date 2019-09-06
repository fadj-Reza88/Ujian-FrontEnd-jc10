import React, { Component } from 'react';
import Axios from 'axios'
import { urlApi } from '../../3.helpers/database';

class Analytics extends Component {
    state ={
        historyDetail :{},
    }

    componentDidMount(){
        Axios.get(urlApi + '/history')
        .then(res => {
            console.log(res)
            this.setState({historyDetail : res.data.length})
        })
        .catch(err => {
            console.log(err)
        })
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="card shadow mt-3">
                            <div className="card-body"> 
                                Total pendapatan dari user belanja adalah Rp 
                                {this.state.historyDetail.totalPrice}
                            </div>
                            <div className="card-footer align-items-center">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Analytics;