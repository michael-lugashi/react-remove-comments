import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function TextFileUpload({ setRemovedCommentsText }) {
  const [text, setText] = useState('');

  const removeComments = (fileText) => {
    let removedCommentsText = '';
    let singleLineSkip = false;
    let multiLineSkip = false;
    for (let i = 0; i < fileText.length; i++) {
      if (fileText[i] === '/' && fileText[i + 1] === '/') {
        singleLineSkip = true;
      } else if (fileText[i] === '\n' && singleLineSkip === true) {
        singleLineSkip = false;
      } else if (fileText[i] === '/' && fileText[i + 1] === '*') {
        multiLineSkip = true;
      } else if (
        fileText[i - 1] === '*' &&
        fileText[i] === '/' &&
        multiLineSkip === true
      ) {
        multiLineSkip = false;
      } else if (singleLineSkip === false && multiLineSkip === false) {
        removedCommentsText += fileText[i];
      }
    }
    return removedCommentsText;
  };

  return (
    <div>
      <header className="actions-header">
        <label for="file-upload" className="header-button">
          Select A Text File
          <input
            id="file-upload"
            type="file"
            className="file-input"
            onChange={async (e) => {
              const file = e.target.files[0];
              console.log(file.type);
              const fileText = await file.text();
              setText(fileText);
            }}
          />
        </label>
        <Link
          className="link-styling"
          to={{
            pathname: text ? '/output' : '/read-file',
          }}
        >
          <button
            className="header-button"
            onClick={() => {
              if (!text) {
                alert('text file is eiter empty or not uploaded!');
              }
              setRemovedCommentsText(removeComments(text));
            }}
          >
            Remove Comments
          </button>
        </Link>
      </header>

      <div className="display-text">{text}</div>
    </div>
  );
}
export default TextFileUpload;
