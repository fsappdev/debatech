import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createProfile, getCurrentProfile } from '../../actions/profileActions';
import isEmpty from '../../validation/is-empty';

class CreateProfile extends Component {
   constructor(props) {
      super(props);
      this.state = {
         displaySocialInputs: false,
         handle: '',
         company: '',
         website: '',
         location: '',
         status: '',
         skills: '',
         githubusername: '',
         bio: '',
         twitter: '',
         facebook: '',
         linkedin: '',
         youtube: '',
         instagram: '',
         errors: {}
      };

      /* this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this); */
   }

   componentDidMount() {
      this.props.getCurrentProfile();
   }

   componentWillReceiveProps(nextProps) {
      if (nextProps.errors) {
         this.setState({ errors: nextProps.errors });
      }
      if (nextProps.profile.profile) {
         const profile = nextProps.profile.profile;
         //traemos el array de skills de vuelta a csv
         const skillsCSV = profile.skills.join(',');
         //si no existe el campo perfil, crear un string vacio
         profile.company = !isEmpty(profile.company) ? profile.company : '';
         profile.website = !isEmpty(profile.website) ? profile.website : '';
         profile.location = !isEmpty(profile.location) ? profile.location : '';
         profile.githubusername = !isEmpty(profile.githubusername) ? profile.githubusername : '';
         profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
         profile.social = !isEmpty(profile.social) ? profile.social : {};

         profile.twitter = !isEmpty(profile.social.twitter) ? profile.social.twitter : '';
         profile.facebook = !isEmpty(profile.social.facebook) ? profile.social.facebook : '';
         profile.linkedin = !isEmpty(profile.social.linkedin) ? profile.social.linkedin : '';
         profile.youtube = !isEmpty(profile.social.youtube) ? profile.social.youtube : '';
         profile.instagram = !isEmpty(profile.social.instagram) ? profile.social.instagram : '';

         //seteamos el estado
         this.setState({
            handle: profile.handle,
            company: profile.company,
            website: profile.website,
            location: profile.location,
            status: profile.status,
            skills: skillsCSV,
            githubusername: profile.githubusername,
            bio: profile.bio,
            twitter: profile.twitter,
            facebook: profile.facebook,
            linkedin: profile.linkedin,
            youtube: profile.youtube,
            instagram: profile.instagram
         })
      }
   }

   onSubmit = (e) => {
      e.preventDefault();
      const profileData = {
         handle: this.state.handle,
         company: this.state.company,
         website: this.state.website,
         location: this.state.location,
         status: this.state.status,
         skills: this.state.skills,
         githubusername: this.state.githubusername,
         bio: this.state.bio,
         twitter: this.state.twitter,
         facebook: this.state.facebook,
         linkedin: this.state.linkedin,
         youtube: this.state.youtube,
         instagram: this.state.instagram
      }
      this.props.createProfile(profileData, this.props.history);

   }

   onChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
   }

   render() {

      const { errors, displaySocialInputs } = this.state;
      let socialInputs;
      if (displaySocialInputs) {
         socialInputs = (
            <div>
               <InputGroup
                  placeholder="Perfil de Twitter"
                  name="twitter"
                  icon="fab fa-twitter"
                  value={this.state.twitter}
                  onChange={this.onChange}
                  error={errors.twitter}
               />
               <InputGroup
                  placeholder="Perfil de Facebook"
                  name="facebook"
                  icon="fab fa-facebook"
                  value={this.state.facebook}
                  onChange={this.onChange}
                  error={errors.facebook}
               />
               <InputGroup
                  placeholder="Perfil de LinkedIn"
                  name="linkedin" Youtube
                  icon="fab fa-linkedin" LinkedIn
                  value={this.state.linkedin}
                  onChange={this.onChange}
                  error={errors.linkedin}
               />
               <InputGroup
                  placeholder="Perfil de Youtube"
                  name="youtube"
                  icon="fab fa-youtube"
                  value={this.state.youtube}
                  onChange={this.onChange}
                  error={errors.youtube}
               />
               <InputGroup
                  placeholder="Perfil de Instagram"
                  name="instagram"
                  icon="fab fa-instagram"
                  value={this.state.instagram}
                  onChange={this.onChange}
                  error={errors.instagram}
               />
            </div>
         );
      }

      const options = [
         { label: '* Seleccione su Status', value: 0 },
         { label: 'Developer', value: 'Developer' },
         { label: 'Junior Developer', value: 'Junior Developer' },
         { label: 'Senior Developer', value: 'Senior Developer' },
         { label: 'Manager', value: 'Manager' },
         { label: 'Estudiante o aprendiz', value: 'Estudiante o aprendiz' },
         { label: 'Instructor o Maestro', value: 'Instructor o Maestro' },
         { label: 'Interno', value: 'Interno' },
         { label: 'Otro', value: 'Otro' }
      ];

      return (
         <div className="create-profile">
            <div className="container">
               <div className="row">
                  <div className="col-md-8 m-auto">
                     <Link to="/dashboard" className="btn btn-light">Volver
                     </Link>
                     <h1 className="display-4 text-center">Edita tu Perfil</h1>
                     <small className="d-block pb-3">* => campos requeridos</small>
                     <form onSubmit={this.onSubmit}>
                        <TextFieldGroup
                           placeholder="* Nickname con el que puedes entrar"
                           name="handle"
                           value={this.state.handle}
                           onChange={this.onChange}
                           error={errors.handle}
                           info="Un manejador unico para la URL de tu perfil. Nombre completo, compañia, nickname"
                        />
                        <SelectListGroup
                           placeholder="Status"
                           name="status"
                           value={this.state.status}
                           onChange={this.onChange}
                           options={options}
                           error={errors.status}
                           info="Danos una idea de donde estas posicionado en tu carrera"
                        />
                        <TextFieldGroup
                           placeholder="Compañía"
                           name="company"
                           value={this.state.company}
                           onChange={this.onChange}
                           error={errors.company}
                           info="Tu propia compañia o para la cual trabajas"
                        />
                        <TextFieldGroup
                           placeholder="Website"
                           name="website"
                           onChange={this.onChange}
                           value={this.state.website}
                           error={errors.website}
                           info="Tu sitio web"
                        />
                        <TextFieldGroup
                           placeholder="Ubicacion"
                           name="location"
                           value={this.state.location}
                           onChange={this.onChange}
                           error={errors.location}
                           info="Tu ciudad o estado"
                        />
                        <TextFieldGroup
                           placeholder="* Habilidades"
                           name="skills"
                           value={this.state.skills}
                           onChange={this.onChange}
                           error={errors.skills}
                           info="Por favor use valores separados por comas ej. HTML, CSS, Javascript, PHP"
                        />
                        <TextFieldGroup
                           placeholder="Usuario de Github"
                           name="githubusername"
                           value={this.state.githubusername}
                           onChange={this.onChange}
                           error={errors.githubusername}
                           info="Tu nick de usuario Github"
                        />
                        <TextAreaFieldGroup
                           placeholder="Biografia"
                           name="bio"
                           onChange={this.onChange}
                           value={this.state.bio}
                           error={errors.bio}
                           info="Cuéntanos un poco de ti"
                        />
                        <div className="mb-3">
                           <button type="button" onClick={() => {
                              this.setState(prevState => ({ displaySocialInputs: !prevState.displaySocialInputs }))
                           }} className="btn btn-light">Click aquí para Agregar redes sociales</button>
                           <span className="text-muted"> Opcional </span>
                        </div>
                        {socialInputs}
                        <input type="submit" value="Enviar" className="btn btn-info btn-block mt-4" />
                     </form>
                  </div>
               </div>
            </div>
         </div>
      )
   }
}

CreateProfile.propTypes = {
   createProfile: PropTypes.func.isRequired,
   getCurrentProfile: PropTypes.func.isRequired,
   profile: PropTypes.object.isRequired,
   errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({ profile: state.profile, errors: state.errors });

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(CreateProfile));