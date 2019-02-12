import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProfileByHandle } from '../../actions/profileActions';
import { Link } from 'react-router-dom';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
import ProfileGithub from './ProfileGithub';
import Spinner from '../common/Spinner';


class Profile extends Component {
   ComponentDidMount() {

      if (this.props.match.params.handle) {
         this.props.getProfileByHandle(this.props.match.params.handle);
         console.log(this.props);
      }
   }
   /* componentDidMount() {
      this.props.getProfileByHandle(this.props.match.params.handle);
   } */

   render() {
      const { profile, loading } = this.props;
      console.log(profile);
      let profileContent;


      /* if (profile === null || loading) {
         //profileContent = <Spinner />;
      } else {
         aca iba el profile content
      } */
      if (profile === null || loading) {
         profileContent = <Spinner />;
      }

      profileContent = (
         <div>
            <div className="row">
               <div className="col-md-6">
                  <Link to="/profiles" className="btn btn-light mb-3 float-left">
                     Volver a los perfiles
                  </Link>
               </div>
               <div className="col-md-6" />
            </div>
            <ProfileHeader profile={profile} />
            <ProfileAbout />
            <ProfileCreds />
            <ProfileGithub />
         </div>
      );




      return (
         <div className="profile">
            <div className="container">
               <div className="row">
                  <div className="col-md-12">
                     {profileContent}
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

Profile.propTypes = {
   getProfileByHandle: PropTypes.func.isRequired,
   profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
   profile: state.profile
});
export default connect(mapStateToProps, { getProfileByHandle })(Profile);