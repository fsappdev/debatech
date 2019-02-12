import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';
/* import profileReducer from '../../reducers/profileReducer'; */
import Spinner from '../common/Spinner';
import ProfileActions from './ProfileActions';
import Experience from './Experience';
import Education from './Education';


class Dashboard extends Component {
   componentDidMount() {
      this.props.getCurrentProfile();
   }

   onDeleteClick = (e) => {
      this.props.deleteAccount();
   }

   render() {

      const { user } = this.props.auth;
      const { profile, loading } = this.props.profile;

      let dashboardContent;

      if (profile === null || loading) {
         dashboardContent = <Spinner />;
         //setTimeout(dashboardContent, 800);
         //setTimeout(<Spinner />, 800);
      } else {
         //check si el usuario loggeado tiene data en su profile
         if (Object.keys(profile).length > 0) {
            //dashboardContent = <h4>HACER: DISPLAY PROFILE</h4>
            dashboardContent = (
               <div>
                  <p className="lead text.muted">
                     Bienvenido
                     <Link to={`/profile/${profile.handle}`}> {user.name}</Link>
                  </p>
                  <ProfileActions />
                  {/* hacer: exp y ed*/}
                  <Experience experience={profile.experience} />
                  <Education education={profile.education} />
                  <div style={{ marginBottom: '60px' }} />
                  <button onClick={this.onDeleteClick.bind(this)} className="btn    btn-danger"> Eliminar mi cuenta</button>
               </div>
            );
         } else {
            //el user esta logged pero no tiene data en su profile
            dashboardContent = (
               <div>
                  <p className="lead text-muted">Bienvenido {user.name}</p>
                  <p>Aún no has completado tu perfil, por favor agrega mas información.</p>
                  <Link to="/create-profile" className="btn btn-lg btn-info">Crear perfil</Link>
               </div>
            );
         }
      }

      return (
         <div className="dashboard">
            <div className="container">
               <div className="row">
                  <div className="col-md-12">
                     <h1 className="display-7">Dashboard</h1>
                     {dashboardContent}
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

Dashboard.propTypes = {
   getCurrentProfile: PropTypes.func.isRequired,
   deleteAccount: PropTypes.func.isRequired,
   auth: PropTypes.object.isRequired,
   profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
   profile: state.profile,
   auth: state.auth
})
export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);