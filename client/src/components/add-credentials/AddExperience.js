import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExperience } from '../../actions/profileActions';

class AddExperience extends Component {
   constructor(props) {
      super(props);
      this.state = {
         company: '',
         title: '',
         location: '',
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

      const expData = {
         company: this.state.company,
         title: this.state.title,
         location: this.state.location,
         from: this.state.from,
         to: this.state.to,
         current: this.state.current,
         description: this.state.description
      };
      this.props.addExperience(expData, this.props.history);
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
         <div className="add-experience">
            <div className="container">
               <div className="row">
                  <div className="col-md-8 m-auto">
                     <Link to="/dashboard" className="btn btn-light">Volver
                     </Link>
                     <h1 className="display-4 text-center">Agregar experiencia</h1>
                     <p className="lead text-center">agrega cualquier trabajo o posicion que hayas tenido antes o actual</p>
                     <small className="d-block pb-3">* = campos requeridos</small>
                     <form onSubmit={this.onSubmit}>
                        <TextFieldGroup
                           placeholder="* compañía"
                           name="company"
                           value={this.state.company}
                           onChange={this.onChange}
                           error={errors.company}
                        />
                        <TextFieldGroup
                           placeholder="* Titulo del trabajo"
                           name="title"
                           value={this.state.title}
                           onChange={this.onChange}
                           error={errors.title}
                        />
                        <TextFieldGroup
                           placeholder="* Ubicacion"
                           name="location"
                           value={this.state.location}
                           onChange={this.onChange}
                           error={errors.location}
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
                              Trabajo actual
                              </label>
                        </div>
                        <TextAreaFieldGroup
                           placeholder="Descripción del trabajo"
                           name="description"
                           value={this.state.description}
                           onChange={this.onChange}
                           error={errors.description}
                           info="Cuentanos algo sobre el puesto"
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

AddExperience.propTypes = {
   addExperience: PropTypes.func.isRequired,
   profile: PropTypes.object.isRequired,
   errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
   profile: state.profile,
   errors: state.errors
});
export default connect(mapStateToProps, { addExperience })(withRouter(AddExperience));