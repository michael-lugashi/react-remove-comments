import React from 'react';
import { Link } from 'react-router-dom';

function OutputRemovedComments({ removedCommentsText }) {
  //   console.log(props);
  return (
    <div>
      output: {removedCommentsText}
      <Link
        to={{
          pathname: '/read-file',
        }}
      >
        <button>upload file</button>
      </Link>
    </div>
  );
}

export default OutputRemovedComments;
