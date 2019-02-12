import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createProfile } from '../../actions/profileActions';

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

   componentWillReceiveProps(nextProps) {
      if (nextProps.errors) {
         this.setState({ errors: nextProps.errors });
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
      };

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
                  name="linkedin"
                  icon="fab fa-linkedin"
                  value={this.state.linkedin}
                  onChange={this.onChange}
                  error={errors.LinkedIn}
               />
               <InputGroup
                  placeholder="Perfil de Youtube"
                  name="youtube"
                  icon="fab fa-youtube"
                  value={this.state.youtube}
                  onChange={this.onChange}
                  error={errors.Youtube}
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
                     <h1 className="display-4 text-center">Crea tu Perfil</h1>
                     <p className="lead text-center">Pongamos algo de info para hacer que tu perfil se destaque.</p>
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
                           errors={errors.status}
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
                           info="Tu link a Github"
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
   profile: PropTypes.object.isRequired,
   errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({ profile: state.profile, errors: state.errors });

export default connect(mapStateToProps, { createProfile })(withRouter(CreateProfile));