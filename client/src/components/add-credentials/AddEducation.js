import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addEducation } from '../../actions/profileActions';

class AddEducation extends Component {
   constructor(props) {
      super(props);
      this.state = {
         school: '',
         degree: '',
         fieldofstudy: '',
         from: '',
         to: '',
         current: false,
         description: '',
         errors: {},
         disabled: false
      }
   }

   componentWillReceiveProps(nextProps) {
      if (nextProps.errors) {
         this.setState({ errors: nextProps.errors });
      }
   }

   onSubmit = (e) => {
      e.preventDefault();

      const eduData = {
         school: this.state.school,
         degree: this.state.degree,
         fieldofstudy: this.state.fieldofstudy,
         from: this.state.from,
         to: this.state.to,
         current: this.state.current,
         description: this.state.description
      };
      this.props.addEducation(eduData, this.props.history);
      //this.props.addExperience(expData, this.props.history);
   }

   onChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
   }

   onCheck = (e) => {
      this.setState({
         disabled: !this.state.disabled,
         current: !this.state.current
      });
   }

   render() {

      const { errors } = this.state;

      return (
         <div className="add-education">
            <div className="container">
               <div className="row">
                  <div className="col-md-8 m-auto">
                     <Link to="/dashboard" className="btn btn-light">Volver
                     </Link>
                     <h1 className="display-4 text-center">Agregar educacion</h1>
                     <p className="lead text-center">agrega cualquier tipo de educacion que hayas tenido</p>
                     <small className="d-block pb-3">* = campos requeridos</small>
                     <form onSubmit={this.onSubmit}>
                        <TextFieldGroup
                           placeholder="* institucion"
                           name="school"
                           value={this.state.school}
                           onChange={this.onChange}
                           error={errors.school}
                        />
                        <TextFieldGroup
                           placeholder="* Grado o Certificacion"
                           name="degree"
                           value={this.state.degree}
                           onChange={this.onChange}
                           error={errors.degree}
                        />
                        <TextFieldGroup
                           placeholder="* campo de estudio"
                           name="fieldofstudy"
                           value={this.state.fieldofstudy}
                           onChange={this.onChange}
                           error={errors.fieldofstudy}
                        />
                        <h6>Desde</h6>
                        <TextFieldGroup
                           name="from"
                           type="date"
                           value={this.state.from}
                           onChange={this.onChange}
                           error={errors.from}
                        />
                        <h6>Hasta</h6>
                        <TextFieldGroup
                           name="to"
                           type="date"
                           value={this.state.to}
                           onChange={this.onChange}
                           error={errors.to}
                           disabled={this.state.disabled ? 'disabled' : ''}
                        />
                        <div className="form-check mb-4">
                           <input
                              type="checkbox"
                              className="form-check-input"
                              name="current"
                              value={this.state.current}
                              checked={this.state.current}
                              onChange={this.onCheck}
                              id="current"
                           />
                           <label htmlFor="current" className="form-check-label">
                              Cursando actualmente
                              </label>
                        </div>
                        <TextAreaFieldGroup
                           placeholder="Descripción del programa"
                           name="description"
                           value={this.state.description}
                           onChange={this.onChange}
                           error={errors.description}
                           info="Cuentanos algo sobre el programa"
                        />
                        <input type="submit" value="Submit" className="btn btn-info btn-block mt-4" />
                     </form>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

AddEducation.propTypes = {
   addEducation: PropTypes.func.isRequired,
   profile: PropTypes.object.isRequired,
   errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
   profile: state.profile,
   errors: state.errors
});
export default connect(mapStateToProps, { addEducation })(withRouter(AddEducation));