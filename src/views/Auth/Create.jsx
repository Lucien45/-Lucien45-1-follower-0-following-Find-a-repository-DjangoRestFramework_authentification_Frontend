import { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { MdEmail } from "react-icons/md";
import { Utils } from '../../_utils/utils';
import { UserService } from '../../_services/User.service';

const Create = () => {

  const [user, setUser] = useState({
    username: '', email: '', password: '', confirm_mdp: ''
  });

  const createCompte = async (e) => {
    e.preventDefault();

    if (user.password === user.confirm_mdp) {
      var data = {
        email: user.email,
        username: user.username,
        password: user.password
      };
      UserService.SignUp(data)
      .then(res=>{
          Utils.sucess("Votre compte est bien enregistrée!")
          window.location.href='/'
        })
        .catch((error) => {
          Utils.errorPage(error.response.data.message)
        });
    } else {
      Utils.errorPage("Veuillez confirmer votre mot de passe!");
    }
  };

  return (
      <div className='authentification'>
          <div className='logo-auth'>
            <img src='../media/background/createCompte.jpg' alt='logo'/>
          </div>
          <form onSubmit={createCompte}>
            <div className='input-auth'>
              <h2>Inscription</h2>
              <div className="control">
                <i><FaUser/></i>
                <input type="text" value={user.username} onChange={(e) => setUser({...user, username: e.target.value})} className='input' placeholder="Nom d'utilisateur" required/>
              </div>
              <div className="control">
                <i><MdEmail/></i>
                <input type="text" value={user.email} onChange={(e) => setUser({...user, email: e.target.value})} className='input' placeholder="Email" required/>
              </div>
              <div className="control">
                <i><FaLock/></i>
                <input type="password" value={user.password} onChange={(e) => setUser({...user, password: e.target.value})} className='input' placeholder="Mot de passe" required/>
              </div>
              <div className="control">
                <i><FaLock/></i>
                <input type="password" value={user.confirm_mdp} onChange={(e) => setUser({...user, confirm_mdp: e.target.value})} className='input' placeholder="Confirmer votre mot de passe" required/>
              </div>
              
              <button className='btn-auth'>S'inscrire</button>

              <div className='create-compte'>
                <span><Link to='/'>J'ai déjà un compte</Link></span>
              </div>
            </div>
          </form>
      </div>
  );
};

export default Create;
