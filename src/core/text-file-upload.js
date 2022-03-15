import React, {useState} from 'react';

function TextFileUpload({setRemovedCommentsText}) {
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
      <input
        type="file"
        onChange={async (e) => {
          const file = e.target.files[0];
          const fileText = await file.text();
          setText(fileText);
          setRemovedCommentsText(removeComments(fileText));
        }}
      />

      <div>{text}</div>
    </div>
  );
}
export default TextFileUpload;
