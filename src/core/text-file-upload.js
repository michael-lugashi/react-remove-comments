import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import removeComments from '../helperFunc/removeComments';

function TextFileUpload({ setRemovedCommentsText }) {
  const [text, setText] = useState('');

  return (
    <div>
      <header className="actions-header">
        <label htmlFor="file-upload" className="header-button">
          Select A Text File
          <input
            id="file-upload"
            type="file"
            className="file-input"
            onChange={async (e) => {
              try {
                const file = e.target.files[0];
                if (file.type !== 'text/plain') {
                  throw new Error('File must be a text file!');
                }
                const fileText = await file.text();
                setText(fileText);
              } catch (err) {
                if (err.name === 'Error') {
                  swal('Oops,', err.message, 'error');
                } else {
                  swal('Oops,', 'Please select a text file!', 'error');
                }
                setText('');
              }
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
              try {
                if (!text) {
                  throw new Error(
                    'Please select a text file! (text file can not be empty)'
                  );
                }
                setRemovedCommentsText(removeComments(text));
              } catch (error) {
                swal('Oops,', error.message, 'error');
              }
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
