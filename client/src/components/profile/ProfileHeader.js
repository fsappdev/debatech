import React, { Component } from 'react'
import isEmpty from '../../validation/is-empty';


class ProfileHeader extends Component {
   render() {
      const { publicprofile } = this.props;

      return (
         <div className="row">
            <div className="col-md-12">
               <div className="card card-body bg-info text-white mb-3">
                  <div className="row">
                     <div className="col-4 col-md-3 m-auto">
                        <img className="rounded-circle" src={publicprofile.user.avatar} alt="" />
                     </div>
                  </div>
                  <div className="text-center">
                     <h1 className="display-4 text-center">{publicprofile.user.name}</h1>
                     <p className="lead text-center">{publicprofile.status} {isEmpty(publicprofile.company) ? null : (<span> en {publicprofile.company}</span>)}</p>
                     {isEmpty(publicprofile.location) ? null : (<p>{publicprofile.location}</p>)}
                     <p>
                        {isEmpty(publicprofile.website) ? null : (
                           <a className="text-white p-2" href={publicprofile.website} target="-blank">
                              <i className="fas fa-globe fa-2x"></i>
                           </a>
                        )}
                        {isEmpty(publicprofile.social && publicprofile.social.twitter) ? null : (
                           <a className="text-white p-2" href={publicprofile.social.twitter} target="-blank">
                              <i className="fab fa-twitter fa-2x"></i>
                           </a>
                        )}
                        {isEmpty(publicprofile.social && publicprofile.social.facebook) ? null : (
                           <a className="text-white p-2" href={publicprofile.social.facebook} target="-blank">
                              <i className="fab fa-facebook fa-2x"></i>
                           </a>
                        )}
                        {isEmpty(publicprofile.social && publicprofile.social.linkedin) ? null : (
                           <a className="text-white p-2" href={publicprofile.social.linkedin} target="-blank">
                              <i className="fab fa-linkedin fa-2x"></i>
                           </a>
                        )}
                        {isEmpty(publicprofile.social && publicprofile.social.instagram) ? null : (
                           <a className="text-white p-2" href={publicprofile.social.instagram} target="-blank">
                              <i className="fab fa-instagram fa-2x"></i>
                           </a>
                        )}
                        {isEmpty(publicprofile.social && publicprofile.social.youtube) ? null : (
                           <a className="text-white p-2" href={publicprofile.social.youtube} target="-blank">
                              <i className="fab fa-youtube fa-2x"></i>
                           </a>
                        )}
                     </p>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

/* ProfileHeader.propTypes = {
   profile: PropTypes.object.isRequired
} */
export default ProfileHeader;