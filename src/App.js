import TextFileUpload from './core/text-file-upload';
import OutputRemovedComments from './core/output-removed-comments';
import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/App.css';

function App() {
  const [removedCommentsText, setRemovedCommentsText] = useState('');
  useEffect(() => {
    console.log(removedCommentsText)
  }, [removedCommentsText]);
  return (
    <div className="App">
      <header className="App-header">
        <h1 className='title'>Remove Comments of Text File</h1>
      </header>
      <Router>
        <Routes>
          <Route path="/read-file" element={<TextFileUpload  setRemovedCommentsText={setRemovedCommentsText}/>} />
          <Route path="/output" element={<OutputRemovedComments setRemovedCommentsText={setRemovedCommentsText} removedCommentsText={removedCommentsText}/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
