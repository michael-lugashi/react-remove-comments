import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

function TextFileUpload({ setRemovedCommentsText }) {
  const [text, setText] = useState('');
  const removeTrailingWhiteSpace = (text) => {
    let lastNonWhiteIn = 0;
    for (let j = 0; j < text.length; j++) {
      if (text[j] !== ' ' && text[j] !== '\t') {
        lastNonWhiteIn = j + 1;
      }
    }
    text = text.slice(0, lastNonWhiteIn);
    if (text) {
      text += '\n';
    }
    return text;
  };
  const removeComments = (fileText) => {
    let removedCommentsText = '';
    let currentLine = '';
    let singleLineSkip = false;
    let multiLineSkip = false;

    for (let i = 0; i < fileText.length; i++) {
      if (fileText[i - 1] === '*' && fileText[i] === '/' && multiLineSkip) {
        multiLineSkip = false;
      } else if (fileText[i] === '\n' && !multiLineSkip) {
        if (currentLine) {
          removedCommentsText += currentLine + '\n';
          currentLine = '';
        }
        singleLineSkip = false;
      } else if (multiLineSkip || singleLineSkip) {
        continue;
      } else if (fileText[i] === '/' && fileText[i + 1] === '/') {
        singleLineSkip = true;
        currentLine = removeTrailingWhiteSpace(currentLine);
        removedCommentsText += currentLine;
        currentLine = '';
      } else if (fileText[i] === '/' && fileText[i + 1] === '*') {
        multiLineSkip = true;
        currentLine = removeTrailingWhiteSpace(currentLine);
        removedCommentsText += currentLine;
        currentLine = '';
      } else if (!singleLineSkip && !multiLineSkip) {
        currentLine += fileText[i];
      }
    }
    return removedCommentsText;
  };

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
