import React, { Component } from 'react';
import PropTypes from 'prop-types';
/* import { connect } from 'react-redux'; */
import { Link } from 'react-router-dom';
import isEmpty from '../../validation/is-empty';


class ProfileItem extends Component {
   render() {
      const { profile } = this.props;
      /*  console.log(this.props); */
      /* console.log(profile.handle); */
      return (
         <div className="card card-body bg-light mb-3">
            <div className="row">

               <div className="col-2">
                  <img src={profile.user.avatar} alt="" className="rounded-circle" />
               </div>

               <div className="col-lg-6 col-md4 col-8">
                  <h3>{profile.user.name}</h3>
                  <p>
                     {profile.status} {' '} {isEmpty(profile.company) ? null : (<span>en {profile.company}</span>)}
                  </p>
                  <p>
                     {isEmpty(profile.location) ? null : (<span>en {profile.location}</span>)}
                  </p>
                  <Link to={`/profile/${profile.handle}`} className="btn btn-info">Ver Perfil</Link>
               </div>

               <div className="col-md-4 d-none d-md-block">
                  <h4>Habilidades</h4>
                  <ul className="list-group">
                     {profile.skills.slice(0, 4).map((skill, index) => (
                        <li key={index} className="list-group-item">
                           <i className="fa fa-check pr-1" />
                           {skill}
                        </li>
                     ))}
                  </ul>
               </div>
            </div>
         </div>
      );
   }
}

ProfileItem.propTypes = {
   profile: PropTypes.object.isRequired
};

/* const mapStateToProps = state => ({
   profile: state.profile
}); */

export default ProfileItem;