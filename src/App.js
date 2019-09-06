import React, {Component} from 'react';
import {withRouter, Route, Switch} from 'react-router-dom'
import Home from './1.pages/Home/Home';
import 'bootstrap/dist/css/bootstrap.min.css'
import NavbarComp from './1.pages/Navbar/Navbar';
import Auth from './1.pages/Auth/Auth';
import Cookie from 'universal-cookie'
import {connect} from 'react-redux'
import {keepLogin, cookieChecker} from './redux/1.actions'
import ProductDetails from './1.pages/ProductDetails/ProductDetails';
import Cart from './1.pages/Cart/Cart';
import AdminDashboard from './1.pages/Admin/AdminDashboard';
import History from './1.pages/History/History';
import HistoryDetail from './1.pages/History/HistoryDetail';
import Wishlist from './1.pages/Wishlist/Wishlist';



let cookieObj = new Cookie()
class App extends Component {

  componentDidMount(){
    let cookieVar = cookieObj.get('userData')
    if(cookieVar){
      this.props.keepLogin(cookieVar)
    }else{
      this.props.cookieChecker()
    }
  }

  render(){
    if(this.props.globalCookie){
      return (
        <div>
          <NavbarComp/>
          <Switch>
            <Route component={Home} path='/' exact />
            <Route component={Auth} path='/auth' exact />
            <Route component={ProductDetails} path='/product-details/:id' exact />
            <Route component={Cart} path='/cart' exact />
            <Route component={AdminDashboard} path='/admin/dashboard' exact />
            <Route component={History} path='/history' exact />
            <Route component={HistoryDetail} path='/history-detail/:id' exact />
            <Route component={Wishlist} path='/wishlist' exact />
          </Switch>
        </div>
      )
    }
    return <div>Loading ...</div>
  }
}

const mapStateToProps = (state) => {
  return {
    globalCookie : state.user.cookie
  }
}

export default connect(mapStateToProps, {keepLogin, cookieChecker})(withRouter(App))
