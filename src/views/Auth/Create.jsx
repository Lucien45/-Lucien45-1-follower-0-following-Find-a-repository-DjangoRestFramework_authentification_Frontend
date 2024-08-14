import { useState } from 'react';
import { FaUser, FaLock, FaCamera } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { MdEmail } from "react-icons/md";
import Swal from 'sweetalert2';
import { Utils } from '../../_utils/utils';
import { UserService } from '../../_services/User.service';

const Create = () => {
  const [user, setUser] = useState({
    username: '', email: '', password: '', confirm_mdp: '', preview: ''
  });
  const [image, setImage] = useState('');

  const loadProfile = (e) => {
    const photo = e.target.files[0];
    if (photo) {
      setImage(photo);
      setUser({ ...user, preview: URL.createObjectURL(photo) });
      console.log(photo);
    }
  };

  const createCompte = async () => {
    if (user.password === user.confirm_mdp) {
        const formData = new FormData();
        formData.append('email', user.email);
        formData.append('username', user.username);
        formData.append('password', user.password);
        formData.append('confirm_mdp', user.confirm_mdp);
        if (image) {
            formData.append('image', image);
        }

        try {
            await UserService.SignUp(formData);
            Utils.success("Votre compte est bien enregistré!");
            window.location.href = '/';
        } catch (error) {
            console.error('Erreur lors de l\'inscription:', error);
            Utils.errorPage(error.response?.data?.detail || 'Erreur lors de l\'inscription');
        }
    } else {
        Utils.errorPage("Veuillez confirmer votre mot de passe!");
    }
  };

  const actionButton = async (e) => {
    e.preventDefault();

    if (!user.username || !user.email || !user.password || !user.confirm_mdp) {
        Swal.fire({ icon: 'error', title: 'Erreur', text: 'Veuillez compléter tous les champs!' });
    } else {
        if (!image) {
            Swal.fire({
                title: `Voulez-vous vraiment créer ce compte sans image de profil?`,
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: "Oui",
                denyButtonText: "Non",
                allowEscapeKey: false,
                allowOutsideClick: false,
            }).then((result) => {
                if (result.isConfirmed) {
                  createCompte();
                }
            });
        } else {
            createCompte();
        }
    }
  };

  return (
      <div className='authentification'>
          <div className='logo-auth'>
            <img src='../media/background/createCompte.jpg' alt='logo'/>
          </div>
          <form onSubmit={actionButton}>
            <div className='input-auth'>
              <h2>Inscription</h2>
              <div className="control">
                <i><FaUser/></i>
                <input type="text" value={user.username} onChange={(e) => setUser({...user, username: e.target.value})} className='input' placeholder="Nom d'utilisateur" required/>
              </div>
              <div className="control">
                <i><MdEmail/></i>
                <input type="email" value={user.email} onChange={(e) => setUser({...user, email: e.target.value})} className='input' placeholder="Email" required/>
              </div>
              <div className="control">
                <i><FaLock/></i>
                <input type="password" value={user.password} onChange={(e) => setUser({...user, password: e.target.value})} className='input' placeholder="Mot de passe" required/>
              </div>
              <div className="control">
                <i><FaLock/></i>
                <input type="password" value={user.confirm_mdp} onChange={(e) => setUser({...user, confirm_mdp: e.target.value})} className='input' placeholder="Confirmer votre mot de passe" required/>
              </div>
              <div className="control">
                <i><FaCamera/></i>
                <input type="file" onChange={loadProfile} className='input' placeholder="Image de profil"/>
              </div>

              {user.preview && (
                  <figure className='image is-128x128'>
                      <img src={user.preview} alt='Preview images' />
                  </figure>
              )}
              
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