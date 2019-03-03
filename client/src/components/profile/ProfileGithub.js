import React, { Component } from 'react'
import PropTypes from 'prop-types';

class ProfileGithub extends Component {

   constructor(props) {
      super(props);
      this.state = {
         count: 5,
         sort: 'created: asc',
         username: this.props,
         repos: [],
      };
   }

   //traemos la data de GH con fetch
   getFetch = () => {
      const { username } = this.props;
      const { count, sort } = this.state;

      fetch(`/api/profile/github/${username}/${count}/${sort}`)
         .then(res => res.json())
         .then(data => {
            //if (this.refs.myRef && this._isMounted) {
            this.setState({ repos: data });
            console.log(this.state.repos);
            //}
         })
         .catch(err => console.log(err));
      console.log('didmount');
      console.log(this.state.repos);
   }

   render() {
      const { username } = this.props;

      if (username) {
         const { repos } = this.state;

         return (
            <div /* ref="myRef" */ >
               <br />

               <h3 className="text-left text-info">
                  <i className="fab fa-github fa-1x"></i>
                  Github:
               </h3>
               <p>nombre de usuario: {username}</p>

               <button className="btn btn-light mb-3 " onClick={this.getFetch}>Click para ver los repositorios</button>
               {
                  repos.map(repo => (
                     <div key={repo.id} className="card card-body mb-2">
                        <div className="row">
                           <div className="col-md-6">
                              <h4>
                                 <a href={repo.html_url} className="text-info" rel="noopener noreferrer" target="_blank">
                                    {repo.name}
                                 </a>
                              </h4>
                              <p>{repo.description}</p>
                           </div>
                           <div className="col-md-6">
                              <span className="badge badge-info mr-1">
                                 Stars: {repo.stargazers_count}
                              </span>
                              <span className="badge badge-info mr-1">
                                 Watchers: {repo.watchers_count}
                              </span>
                              <span className="badge badge-info mr-1">
                                 Forks: {repo.forks_count}
                              </span>
                           </div>
                        </div>
                     </div>
                  ))
               }
            </div>
         );

      } else if (username === undefined) {
         return <div>
            <h3 className="text-left text-info">
               <i className="fab fa-github fa-1x"></i>
               Aún no ha creado un usuario de GitHub...
                  </h3>
         </div>
      }

   }
}

ProfileGithub.propTypes = {
   username: PropTypes.string
};

export default ProfileGithub;