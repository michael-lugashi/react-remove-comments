import React from 'react';
import { Link } from 'react-router-dom';

function OutputRemovedComments({ removedCommentsText }) {
  //   console.log(props);
  return (
    <div>
      <header className="actions-header">
        <Link
          className="link-styling"
          to={{
            pathname: '/read-file',
          }}
        >
          <button className="header-button">Upload New File</button>
        </Link>
      </header>
      <div className="display-text"> {removedCommentsText}</div>
    </div>
  );
}

export default OutputRemovedComments;
