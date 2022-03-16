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
      currentLine += fileText.charAt(i);
    }
  }
  return removedCommentsText;
};

export default removeComments;
