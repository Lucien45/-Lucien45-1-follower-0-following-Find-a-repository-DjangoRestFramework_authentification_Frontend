import React, { useEffect, useState } from 'react';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { PostService } from '../../_services/Post.service';
import { Utils } from '../../_utils/utils';

export const ListPost = () => {
    const [dataPost, setDataPost] = useState([])


    const getAllPost = async () => {
        try {
            PostService.getAllPosts()
            .then((res) => {
                setDataPost(res.data)
                console.log(dataPost);
            })
        } catch (error) {
            Swal.fire({ icon: 'error', title: 'Erreur!', text: `Échec de recuperation ${error}` });
            console.error(error);
        }
    }

    useEffect(() => {
        getAllPost()
    }, [])
    return (
        <div className='list-post-container'>
            {Array.isArray(dataPost) && dataPost.length > 0 ? (
                <div className='scrollable-list'>
                    <h2>Posts</h2>
                    <ul className='post-list'>
                        {dataPost.map(post => (
                            <li key={post.id} className='post-item'>
                                <h3>{post.titre}</h3>
                                <p>{post.description}</p>
                                <img src={`http://localhost:8000/${post.image}`} alt={post.titre} width="100" />
                                <button><FaTrash /></button>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div>Aucun Post disponible.</div>
            )}
        </div>

    )
};

export const AddEditPost = () => {
    const { id } = useParams();
    const [post, setPost] = useState({ titre: '', description: '', preview: '' });
    const [image, setImage] = useState('');
    const navigate = useNavigate();

    const loadProfile = (e) => {
        const photo = e.target.files[0];
        if (photo) {
            setImage(photo);
            setPost({ ...post, preview: URL.createObjectURL(photo) });
            console.log(photo);
        }
    };

    const addPost = async () => {
        const formData = new FormData();
        formData.append('titre', post.titre);
        formData.append('description', post.description);
        if (image) {
            formData.append('image', image);
        }

        try {
            await PostService.createPost(formData);
            Utils.success("Votre post est bien enregistré!");
            window.location.href = '/admin/post';
        } catch (error) {
            console.error('Erreur lors de la creation post:', error);
            Utils.errorPage(error.response?.data?.detail || 'Erreur lors de la creation post');
        }
    };

    const actionButton = async (e) => {
        e.preventDefault();

        if (!post.titre || !post.description) {
            Swal.fire({ icon: 'error', title: 'Erreur', text: 'Veuillez compléter les champs!' });
        } else {
            if (!image) {
                Swal.fire({ icon: 'error', title: 'Erreur', text: 'Veuillez insérer une image!' });
            } else {
                Swal.fire({
                    title: `Voulez-vous vraiment ${id ? "modifier" : "ajouter"} ce nouveau post?`,
                    showDenyButton: true,
                    showCancelButton: false,
                    confirmButtonText: `${id ? "Modifier" : "Ajouter"}`,
                    denyButtonText: "Annuler",
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                }).then((result) => {
                    if (result.isConfirmed) {
                        addPost();
                    }
                });
            }
        }
    };

    return (
        <div>
            <form onSubmit={actionButton}>
                <div className='formulaire'>
                    <div className="field">
                        <label className='label'>Titre</label>
                        <div className="control">
                            <input type='text' value={post.titre} onChange={(e) => setPost({ ...post, titre: e.target.value })} className='input' placeholder='Post titre' required/>
                        </div>
                    </div>

                    <div className="field">
                        <label className='label'>Description</label>
                        <div className="control">
                            <input type='text' value={post.description} onChange={(e) => setPost({ ...post, description: e.target.value })} className='input' placeholder='Description' required />
                        </div>
                    </div>

                    <div className="field">
                        <label className='label'>Image</label>
                        <div className="control">
                            <div className="file">
                                <label className='file-label'>
                                    <input type='file' className='file-input' onChange={loadProfile} required />
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* {post.preview ? (
                        <figure className='image is-128x128'>
                            <img src={post.preview} alt='Preview images' />
                        </figure>
                    ) : (
                        ""
                    )} */}

                    <div className="field btn">
                        <div className="control">
                            <input type='submit' value={id ? "Modifier" : "Ajouter"} className='button is-success'/>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};