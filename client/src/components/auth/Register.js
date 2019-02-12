import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';

/* import classnames from 'classnames';
 */
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';

class Register extends Component {
   constructor() {
      super();
      this.state = {
         name: ' ',
         email: ' ',
         password: ' ',
         password2: ' ',
         errors: {}
      };
      /* this.onChange = this.onChange.bind; */
      /*  this.onChange = this.onChange.bind(this); */
      /* this.onSubmit = this.onSubmit.bind; */
      /*  this.onSubmit = this.onSubmit.bind(this); */

   }

   componentDidMount() {
      if (this.props.auth.isAuthenticated) {
         this.props.history.push('/dashboard');
      }
   }

   componentWillReceiveProps(nextProps) {
      if (nextProps.errors) {
         this.setState({ errors: nextProps.errors })
      }
   }

   onChange = (e) => {
      e.preventDefault();
      this.setState({ [e.target.name]: e.target.value });
   }

   onSubmit = (e) => {
      e.preventDefault();

      const newUser = {
         name: this.state.name,
         email: this.state.email,
         password: this.state.password,
         password2: this.state.password2
      }
      /* console.log(newUser); */
      this.props.registerUser(newUser, this.props.history);

   }
   render() {
      //extraemos errors del state
      const { errors } = this.state;

      return (
         <div className="register">
            <div className="container">
               <div className="row">
                  <div className="col-md-8 m-auto">
                     <h1 className="display-4 text-center">Registrarse</h1>
                     <p className="lead text-center">Aquí puede crear su cuenta DevConex</p>

                     <form noValidate onSubmit={this.onSubmit}>

                        <TextFieldGroup
                           placeholder="Ingrese su nombre de usuario"
                           name="name"
                           type="name"
                           value={this.state.name}
                           onChange={this.onChange}
                           error={errors.name}
                        />

                        <TextFieldGroup
                           placeholder="Ingrese su correo electrónico"
                           name="email"
                           type="email"
                           value={this.state.email}
                           onChange={this.onChange}
                           error={errors.email}
                           info="Este sitio usa Gravatar, para su imagen de perfil utilice su email de Gravatar"
                        />

                        <TextFieldGroup
                           placeholder="Ingrese su contraseña"
                           name="password"
                           type="password"
                           value={this.state.password}
                           onChange={this.onChange}
                           error={errors.password}
                        />

                        <TextFieldGroup
                           placeholder="repita la contraseña ingresada"
                           name="password2"
                           type="password"
                           value={this.state.password2}
                           onChange={this.onChange}
                           error={errors.password2}
                        />

                        <input type="submit" className="btn btn-info btn-block mt-4" value="Registrarse!" />
                     </form>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

Register.propTypes = {
   registerUser: PropTypes.func.isRequired,
   auth: PropTypes.object.isRequired,
   errors: PropTypes.object.isRequired
};

const mapStateProps = (state) => ({
   auth: state.auth,
   errors: state.errors
});
export default connect(mapStateProps, { registerUser })(withRouter(Register));