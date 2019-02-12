import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import isEmpty from '../../validation/is-empty';

class ProfileAbout extends Component {
   render() {
      const { publicprofile } = this.props;
      //traer el primer nombre
      const firstName = publicprofile.user.name.trim().split(' ')[0];
      //lista de skills
      const skills = publicprofile.skills.map((skill, index) => (
         <div key={index} className="p-3">
            <i className="fa fa-check" /> {skill}
         </div>
      ));

      return (
         <div className="row">
            <div className="col-md-12">
               <div className="card card-body bg-light mb-3">
                  <h3 className="text-center text-info">Biografía de {firstName}</h3>
                  <p className="lead">{isEmpty(publicprofile.bio) ? (<span>{firstName} no tiene una biografía</span>) : (<span>{publicprofile.bio}</span>)}
                  </p>
                  <hr />
                  <h3 className="text-center text-info"></h3>
                  <div className="row">
                     <div className="d-flex flex-wrap justify-content-center align-items-center">
                        {skills}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

export default ProfileAbout;