import { useState } from 'react';
import { FaLock, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import { Utils } from '../../_utils/utils';
import { UserService } from '../../_services/User.service';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
      try {
        var data = {
          email: email,
          password: password
        };
        UserService.SignIn(data)
        .then(res=>{
            console.log(res.data)
            Utils.success("Connexion réussie")  
            window.location.href='/admin'   
        })
        .catch((error) => {
          Utils.errorPage("Mot de passe ou email incorrect : ", error.response.data.message)
        })
      } catch (error) {
        console.error('Erreur de connexion:', error);
        Swal.fire({
          icon: 'error',
          title: 'Erreur de connexion',
          text: 'Une erreur s\'est produite lors de la connexion. Veuillez réessayer.',
        });
      }
    };
    
    return (
        <div className='authentification'>
            <div className='logo-auth'>
              <img src='../media/background/login.jpg' alt='logo'/>
            </div>
            <div className='input-auth'>
              <h2>Connexion</h2>
              <div className="control">
                <i><FaUser/></i>
                <input type="text" className='input' placeholder="Email d'utilisateur" onChange={(e) => setEmail(e.target.value)} required/>
              </div>
              <div className="control">
                <i><FaLock/></i>
                <input type="password" className='input' placeholder="Mot de passe" onChange={(e) => setPassword(e.target.value)} required/>
              </div>
                   
              <button onClick={handleLogin} className='btn-auth'>Se connecter</button>

              <div className='create-compte'>
                Vous n'avez pas de compte ? <span><Link to='/create'>Inscrivez-vous maintenant</Link></span>
              </div>
            </div>
        </div>
    );
};

export default Login;
