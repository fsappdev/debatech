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

   componentWillReceiveProps(nextProps) {
      if (nextProps.publicprofile.publicprofile === null) {
         this.props.history.push('/not-found');
      }
   }

   componentDidMount() {
      let usuario = this.props.match.params.handle;
      console.log(usuario);
      this.props.getProfileByHandle(this.props.match.params.handle);
   }

   render() {
      /* console.log(this.props.match.params.handle); */
      //let usuario = this.props.match.params.handle;
      //console.log(usuario);

      const { publicprofile, loading } = this.props.publicprofile;
      let profileContent;
      console.log(this.props);
      console.log(this.props.match);
      console.log(publicprofile);

      if (publicprofile === null || loading) {
         profileContent = <Spinner />
      } else {
         profileContent = (
            <div>
               <div className="row">
                  <div className="col-md-6">
                     <Link to="/profiles" className="btn btn-light mb-3 float-left">
                        Volver a los perfiles
                     </Link>
                  </div>
                  <div className="col-md-6">tu info</div>
               </div>
               <ProfileHeader publicprofile={publicprofile} />
               <ProfileAbout publicprofile={publicprofile} />
               <ProfileCreds education={publicprofile.education} experience={publicprofile.experience} />
               {publicprofile.githubusername ? (<ProfileGithub username={publicprofile.githubusername} />) : <p>Aún no ha creado repositorios</p>}
            </div>
         )
      }

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
   publicprofile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
   publicprofile: state.public
});
export default connect(mapStateToProps, { getProfileByHandle })(Profile);