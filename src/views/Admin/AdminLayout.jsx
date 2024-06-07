import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { UserService } from '../../_services/User.service';
import { Utils } from '../../_utils/utils';

const AdminLayout = () => {

    const[dataUser, setDataUser] = useState([]);

    function submitLogout(e) {
        e.preventDefault();
        var credential = {
          withCredentials: true
        };
        UserService.SignOut(credential)
        .then(res=>{
          Utils.sucess("Deconneion!")
          window.location.href='/'
        })
        .catch((error) => {
          Utils.errorPage(error.response.data.message)
        })
    }
    useEffect(() => {
        UserService.getUser()
        .then(function(res) {
          setDataUser(res.data.user);
          console.log(res.data);
        })
        .catch(function(error) {
          Utils.errorPage(error.response.data.message)
        });
    }, []);
    return (
        <div>
            <Navbar bg="dark" variant="dark">
               <Container>
                 <Navbar.Brand>Authentication App</Navbar.Brand>
                 <Navbar.Toggle />
                 <Navbar.Collapse className="justify-content-end">
                   <Navbar.Text>
                     <form onSubmit={e => submitLogout(e)}>
                       <Button type="submit" variant="light">Log out</Button>
                     </form>
                   </Navbar.Text>
                 </Navbar.Collapse>
               </Container>
            </Navbar>
            <div className="center">
                 <h2>You're logged in!</h2>
            </div>
            <div>
                 <h1>Bienvenue, {dataUser.username}!</h1>
                 <p>Email: {dataUser.email}</p>
            </div>
        </div>
    );
};

export default AdminLayout;