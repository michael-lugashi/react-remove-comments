import React from 'react';
import { Link } from 'react-router-dom';

function OutputRemovedComments({ removedCommentsText }) {
  //   console.log(props);
  return (
    <div>
      <header className="actions-header">
        <Link
          to={{
            pathname: '/read-file',
          }}
        >
          <button>upload file</button>
        </Link>
      </header>
      <div className="display-text"> {removedCommentsText}</div>
    </div>
  );
}

export default OutputRemovedComments;
