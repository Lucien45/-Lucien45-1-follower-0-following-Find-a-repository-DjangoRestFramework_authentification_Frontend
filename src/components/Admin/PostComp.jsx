import React, { useEffect, useState } from 'react';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios'

export const ListPost = () => {
    const [dataPost, setDataPost] = useState([])


    const getAllPost = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/galerie/posts/');
            setDataPost(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getAllPost()
    }, [])
    return (
        <div className='all-client'>
            {Array.isArray(dataPost) && dataPost.length > 0 ? (
                <div>
                <h2>Posts</h2>
                <ul>
                  {dataPost.map(post => (
                    <li key={post.id}>
                      <h3>{post.titre}</h3>
                      <p>{post.description}</p>
                      <img src={`http://localhost:8000/${post.image}`} alt={post.titre} width="100" />
                      <button onClick={() => handleDelete(post.id)}><FaTrash /></button>
                    </li>
                  ))}
                </ul>
              </div>
            ):(
                <div>Aucun Post disponible.</div>
            )}
        </div>

    )
};

export const AddEditPost = () => {
    const [titre, setTitre] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const handleTitleChange = (e) => setTitre(e.target.value);
    const handleContentChange = (e) => setDescription(e.target.value);
    const handleImageChange = (e) => setImage(e.target.files[0]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form_data = new FormData();
        form_data.append('image', image, image.name);
        form_data.append('titre', titre);
        form_data.append('description', description);

        try {
            const response = await axios.post('http://localhost:8000/api/galerie/posts/', form_data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            console.log(response.data);
            navigate("/admin/Post");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <p>
                    <input type="text" placeholder='Titre' value={titre} onChange={handleTitleChange} required />
                </p>
                <p>
                    <input type="text" placeholder='Description' value={description} onChange={handleContentChange} required />
                </p>
                <p>
                    <input type="file" accept="image/png, image/jpeg" onChange={handleImageChange} required />
                </p>
                <input type="submit" />
            </form>
        </div>
    );
};