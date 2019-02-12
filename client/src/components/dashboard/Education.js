import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
/* import { withRouter } from 'react-router-dom'; */
import Moment from 'react-moment';
import { deleteEducation } from '../../actions/profileActions';

class Education extends Component {

   onDeleteClick(id) {
      this.props.deleteEducation(id);
   }

   render() {
      const education = this.props.education.map(edu => (
         <tr key={edu._id}>
            <td>{edu.school}</td>
            <td>{edu.degree}</td>
            <td>
               <Moment format="DD/MM/YYYY">{edu.from}</Moment> -
      {edu.to === null ? ('Actual') : (<Moment format="DD/MM/YYYY">{edu.to}</Moment>)}
            </td>
            <td><button onClick={this.onDeleteClick.bind(this, edu._id)} className="btn btn-danger">Borrar</button></td>
         </tr>
      ))
      return (
         <div>

            <h4 className="mb-4" >Certificaciones<i className="fas fa-graduation-cap text-info ml-1"></i></h4>
            <table className="table">
               <thead>
                  <tr>
                     <th>Institución</th>
                     <th>Titulo</th>
                     <th>años</th>
                     <th></th>
                  </tr>
                  {education}
               </thead>
            </table>
         </div>
      )
   }
}

Education.propTypes = {
   deleteEducation: PropTypes.func.isRequired
}


export default connect(null, { deleteEducation })(Education);