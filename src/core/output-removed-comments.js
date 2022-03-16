import React from 'react';
import { Link } from 'react-router-dom';

function OutputRemovedComments({ removedCommentsText }) {
  //   console.log(props);
  const createDownloadLink = (text) => {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    return url;
  };
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
        <a
          className="header-button link-styling"
          href={createDownloadLink(removedCommentsText)}
          download={'removedComments.txt'}
        >
          Download
        </a>
      </header>
      <div className="display-text"> {removedCommentsText}</div>
    </div>
  );
}

export default OutputRemovedComments;
