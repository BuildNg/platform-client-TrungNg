import React, { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useStore from '../store';

function Posts(props) {
  const allPosts = useStore(({ postSlice }) => postSlice.all);
  const fetchAllPosts = useStore(({ postSlice }) => postSlice.fetchAllPosts);

  useEffect(() => {
    fetchAllPosts();
  }, []);

  const renderPost = ({
    id, title, tags, coverUrl,
  }) => (
    <div key={id} className="position-relative mt-5 me-4" style={{ width: '30%' }}>
      <Link to={`/posts/${id}`} className="stretched-link" />
      <Card className="border border-dark">
        <Card.Img variant="top" src={coverUrl} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{tags}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );

  return (
    <div className="mx-auto" style={{ width: '90%' }}>
      <div className="d-flex flex-row flex-wrap justify-content-start mr-5">
        {allPosts?.map((post) => renderPost(post))}
      </div>
    </div>
  );
}

export default Posts;
