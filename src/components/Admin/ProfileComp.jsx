import React, { useEffect, useState } from 'react';
import { UserService } from '../../_services/User.service';
import { FaFacebook, FaTwitter, FaLinkedin, FaUserFriends, FaEnvelope, FaUser, FaLock, FaCamera } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

export const ListAllProfile = () => {
  return (
    <div>Tout les profile</div>
  )
}

export const GetProfile = () => {
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState('profile'); // Track active tab

  useEffect(() => {
    UserService.getUser()
      .then((res) => {
        setUserData(res.data.user);
      })
      .catch((error) => {
        console.error('Failed to fetch user data:', error);
      });
  }, []);

  return (
    <div className="profile-container">
      {userData ? (
        <div className="profile-content">
          <div className="profile-sidbar">
            <div className="profile-img">
              <img
                src={userData.image ? `http://localhost:8000/${userData.image}` : '../../../public/media/userdefault.png'}
                alt={userData.username || 'Default User'}
              />
            </div>
            <h3>{userData.username}</h3>
            <p>{userData.is_admin ? 'Accounts Manager Amix corp' : 'Staff Member'}</p>
            <div className="profile-stats">
              <div>
                <FaUserFriends /> 254
              </div>
              <div>
                <FaEnvelope /> 54
              </div>
            </div>
            <div className="profile-extra-info">
              <p><strong>Adresse courriel:</strong> {userData.email}</p>
              <p><strong>Téléphone:</strong> +91 654 784 547</p>
              <p><strong>Adresse:</strong> 71 Pilgrim Avenue Chevy Chase, MD 20815</p>
              <div className="map-placeholder">
                <img src="../../../public/media/map.jpeg" alt="Map location" />
              </div>
              <div className="social-links">
                <a href="#"><FaFacebook /></a>
                <a href="#"><FaTwitter /></a>
                <a href="#"><FaLinkedin /></a>
              </div>
            </div>
          </div>
          <div className="profile-details">
            <ul className="profile-tabs">
              <li className={activeTab === 'profile' ? 'active' : ''} onClick={() => setActiveTab('profile')}>Profile</li>
              <li className={activeTab === 'settings' ? 'active' : ''} onClick={() => setActiveTab('settings')}>Paramètres</li>
            </ul>

            {activeTab === 'profile' ? (
              <div className="profile-infos">
                <p><strong>Nom d'utilisateur:</strong> {userData.username}</p>
                <p><strong>Messagerie électronique:</strong> {userData.email}</p>
                <p><strong>Téléphone Non:</strong> +91 654 784 547</p>
                <p><strong>Dernière connexion:</strong> {userData.last_login}</p>
              </div>
            ) : (
              <div className="profile-settings">
                <div className="form-group">
                  <label>Nom d'utilisateur:</label>
                  <input type="text" value={userData.username} />
                </div>
                <div className="form-group">
                  <label>Messagerie électronique:</label>
                  <input type="email" value={userData.email} />
                </div>
                <div className="form-group">
                  <label>Mot de passe:</label>
                  <input type="password" placeholder="Nouveau mot de passe" />
                </div>
                <div className="form-group">
                  <label>Téléphone Non:</label>
                  <input type="text" value="+91 654 784 547" />
                </div>
                <div className="form-group">
                  <label>Sélectionner un pays:</label>
                  <select>
                    <option value="Londres">Londres</option>
                    <option value="Paris">Paris</option>
                    <option value="New York">New York</option>
                  </select>
                </div>
                <button className="btn-update">Mettre à jour le profil</button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export const AddEditProfile = () => {
  const [user, setUser] = useState({
    username: '', email: '', password: '', confirm_mdp: '', preview: ''
  });

  const [image, setImage] = useState('');

  const loadProfile = (e) => {
    const photo = e.target.files[0];
    if (photo) {
      setImage(photo);
      setUser({ ...user, preview: URL.createObjectURL(photo) });
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
          Swal.fire({
            icon: 'success',
            title: 'Succès',
            text: 'Votre compte a été créé avec succès!',
            timer: 3000,
            showConfirmButton: false
          });
          window.location.href = '/admin/profile';
      } catch (error) {
          console.error('Erreur lors de l\'inscription:', error);
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: error.response?.data?.message || 'Une erreur s\'est produite.',
            timer: 3000,
            showConfirmButton: false
        });
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
            title: 'Confirmer l\'inscription',
            text: 'Êtes-vous sûr de vouloir créer un compte avec ces informations?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Oui',
            cancelButtonText: 'Annuler'
            }).then(async (result) => {
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
    <div className="add-edit-profile-container">
      <div className="form-wrapper">
        <h2 className="form-title">Créer un nouveau compte</h2>
        <form onSubmit={actionButton}>
          <div className="form-group">
            <label htmlFor="username"><FaUser /> Nom d'utilisateur</label>
            <input
              type="text"
              id="username"
              className="form-control"
              value={user.username}
              onChange={(e) => setUser({...user, username: e.target.value})}
              placeholder="Entrez votre nom d'utilisateur"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email"><FaEnvelope /> Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={user.email}
              onChange={(e) => setUser({...user, email: e.target.value})}
              placeholder="Entrez votre adresse email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password"><FaLock /> Mot de passe</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={user.password}
              onChange={(e) => setUser({...user, password: e.target.value})}
              placeholder="Entrez un mot de passe"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirm_mdp"><FaLock /> Confirmer mot de passe</label>
            <input
              type="password"
              id="confirm_mdp"
              className="form-control"
              value={user.confirm_mdp}
              onChange={(e) => setUser({...user, confirm_mdp: e.target.value})}
              placeholder="Confirmez votre mot de passe"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="profile-image"><FaCamera /> Ajouter une photo de profil</label>
            <input
              type="file"
              id="profile-image"
              className="form-control-file"
              accept="image/*"
              onChange={loadProfile}
            />
            {user.preview && <img src={user.preview} alt="Image Preview" className="image-preview" />}
          </div>

          <button type="submit" className="btn btn-primary">Créer un compte</button>
        </form>
      </div>
    </div>
  );
};
