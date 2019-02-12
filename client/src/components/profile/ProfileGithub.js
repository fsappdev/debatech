import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import isEmpty from '../../validation/is-empty';
import PropTypes from 'prop-types';

class ProfileGithub extends Component {
   constructor(props) {
      super(props);
      this.state = {
         clientId: '4431a4ae1cc62c61a76d',
         clientSecret: '8b18c8a8f80ce07a8856a90c8d22989fa84ceb83',
         count: 5,
         sort: 'created: asc',
         repos: []
      }
   }

   componentDidMount() {
      const { username } = this.props;
      //console.log(username);
      const { count, sort, clientId, clientSecret } = this.state;
      fetch(`https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`)
         .then(res => res.json())
         .then(data => {
            //this.setState({ repos: data })
            if (this.refs.myRef) {
               this.setState({ repos: data });
            }
         })
         .catch(err => console.log(err))
   }

   render() {
      const { repos } = this.state;
      const repoItems = repos.map(repo => (
         <div key={repo.id} className="card card-body mb-2">
            <div className="row">
               <div className="col-md-6">
                  <h4>
                     <Link to={repo.html_url} className="text-info" target="_blank">
                        {repo.name}
                     </Link>
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
      ));

      return (
         <div ref="myRef">
            <hr />
            <span className="lead">{isEmpty(repoItems) ? (<p>Aun no tiene repositorios de Github</p>) : (<p className="mb-4">Ultimos repositorios de Github</p>)}
            </span>
            {/* <h3 className="mb-4">ultimos repositorios de Github</h3> */}
            {repoItems}
         </div>
      );
   }
}

ProfileGithub.propTypes = {
   username: PropTypes.string.isRequired
};

export default ProfileGithub;