import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
/* import { withRouter } from 'react-router-dom'; */
import Moment from 'react-moment';
import { deleteExperience } from '../../actions/profileActions';

class Experience extends Component {

   onDeleteClick(id) {
      this.props.deleteExperience(id);
   }

   render() {
      const experience = this.props.experience.map(exp => (
         <tr key={exp._id}>
            <td>{exp.company}</td>
            <td>{exp.title}</td>
            <td>
               <Moment format="DD/MM/YYYY">{exp.from}</Moment> -
      {exp.to === null ? ('Actual') : (<Moment format="DD/MM/YYYY">{exp.to}</Moment>)}
            </td>
            <td><button onClick={this.onDeleteClick.bind(this, exp._id)} className="btn btn-danger">Borrar</button></td>
         </tr>
      ))
      return (
         <div>
            <h4 className="mb-4">Credenciales<i className="fab fa-black-tie text-info ml-1"></i></h4>
            <table className="table">
               <thead>
                  <tr>
                     <th>Compañía</th>
                     <th>Titulo</th>
                     <th>años</th>
                     <th></th>
                  </tr>
                  {experience}
               </thead>
            </table>
         </div>
      )
   }
}

Experience.propTypes = {
   deleteExperience: PropTypes.func.isRequired
}


export default connect(null, { deleteExperience })(Experience);