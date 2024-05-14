import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Form, Button, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft, faPenToSquare, faTrashCan, faSave,
} from '@fortawesome/free-solid-svg-icons';
import ReactMarkdown from 'react-markdown';
import useStore from '../store';

function Post(props) {
  const navigate = useNavigate();
  const params = useParams();

  const post = useStore(({ postSlice }) => postSlice.current);
  const fetchPost = useStore(({ postSlice }) => postSlice.fetchPost);

  const [isEditing, setIsEditing] = useState(false);

  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [content, setContent] = useState('');

  const updatePost = useStore((state) => state.postSlice.updatePost);

  useEffect(() => {
    fetchPost(params.postID);
  }, []);

  useEffect(() => {
    if (post) {
      setTitle(post.title || '');
      setContent(post.content || '');
      setTags(post.tags ? post.tags.join(' ') : ''); // Convert tags array to space-separated string
    }
  }, [post]);

  const onDeleteClick = async () => {
    await useStore.getState().postSlice.deletePost(params.postID);
    navigate('/');
  };

  const saveChanges = async () => {
    if (!title || !tags || !content) {
      alert('Please fill out all fields!');
    } else {
      const fields = { title, tags, content };
      await updatePost(fields, params.postID);
      navigate('/');
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="d-flex flex-column w-75 border border-dark rounded bg-light p-4 my-5">
        <Image fluid className="w-50 align-self-center" src={post.coverUrl} />
        <div className="d-flex justify-content-between my-2">
          <div className="d-flex">
            <Button className="me-2" onClick={() => { navigate('/'); }}>
              <FontAwesomeIcon style={{ fontSize: 18 }} icon={faArrowLeft} />
            </Button>
            <Button onClick={saveChanges}>
              <FontAwesomeIcon style={{ fontSize: 18 }} icon={faSave} />
            </Button>
          </div>

          <div className="d-flex">
            <Button className="me-2" onClick={() => { setIsEditing(!isEditing); }} variant={isEditing ? 'outline-primary' : 'primary'}>
              <FontAwesomeIcon style={{ fontSize: 18 }} icon={faPenToSquare} />
            </Button>
            <Button className="me-2" onClick={onDeleteClick} variant="outline-danger">
              <FontAwesomeIcon style={{ fontSize: 18 }} icon={faTrashCan} />
            </Button>
          </div>
        </div>
        <Form className="">
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control disabled={!isEditing} value={title || ''} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Edit title" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Tags</Form.Label>
            <Form.Control disabled={!isEditing} value={tags || ''} onChange={(e) => setTags(e.target.value)} type="text" placeholder="Edit tags" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Content</Form.Label>
            {isEditing ? (
              <Form.Control disabled={!isEditing} value={content || ''} onChange={(e) => setContent(e.target.value)} as="textarea" placeholder="Edit content" rows={3} />
            ) : (
              <ReactMarkdown>
                {content}
              </ReactMarkdown>
            )}
          </Form.Group>

          {isEditing && (
          <Button
            onClick={saveChanges}
            variant="primary"
          >
            Submit
          </Button>
          )}
        </Form>
      </div>
    </div>
  );
}

export default Post;
