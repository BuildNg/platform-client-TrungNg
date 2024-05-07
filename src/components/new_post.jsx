import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import useStore from '../store';

function NewPost(props) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [coverUrl, setCoverUrl] = useState('');

  const navigate = useNavigate();
  const createPost = useStore((state) => state.postSlice.createPost);

  const handleContentChange = (event) => setContent(event.target.val);
  const handleTitleChange = (event) => setTitle(event.target.value);
  const handleTagsChange = (event) => setTags(event.target.value);
  const handleUrlChange = (event) => setCoverUrl(event.target.value);

  const handleDelete = () => {
    navigate('/');
  };

  const handleSave = async () => {
    if (!title || !tags || !content) {
      alert('Please fill out title, tags, and content.');
    } else {
      const fields = {
        title, tags, content, coverUrl,
      };
      await createPost(fields);
      navigate('/');
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="d-flex flex-column w-75 border border-dark bg-light my-5 p-2">
        <Form>
          <Form.Group className="mb-5">
            <Form.Label>Title</Form.Label>
            <Form.Control value={title} type="text" onChange={handleTitleChange} placeholder="Enter Title here" />
          </Form.Group>
          <Form.Group className="mb-5">
            <Form.Label>Tags</Form.Label>
            <Form.Control value={tags} type="text" onChange={handleTagsChange} placeholder="Enter Tags here" />
          </Form.Group>
          <Form.Group className="mb-5">
            <Form.Label>Content</Form.Label>
            <Form.Control as="textarea" rows={5} value={content} onChange={handleContentChange} placeholder="Enter Content here" />
          </Form.Group>
          <Form.Group className="mb-5">
            <Form.Label>Cover Image URL</Form.Label>
            <Form.Control value={coverUrl} type="text" onChange={handleUrlChange} placeholder="Enter URL here" />
          </Form.Group>
        </Form>
        <div className="d-flex justify-content-start">
          <Button onClick={handleSave} className="me-2">
            <FontAwesomeIcon style={{ fontSize: 16 }} icon={faSave} />
          </Button>
          <Button onClick={handleDelete} variant="outline-danger">
            <FontAwesomeIcon style={{ fontSize: 16 }} icon={faTrashCan} />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NewPost;
