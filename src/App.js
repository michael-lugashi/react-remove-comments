import TextFileUpload from './core/text-file-upload';
import OutputRemovedComments from './core/output-removed-comments';
import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/App.css';

function App() {
  const [removedCommentsText, setRemovedCommentsText] = useState('');
  return (
    <div className="App">
      <header className="App-header">
        <h1>Remove Comments Text File</h1>
      </header>
      <Router>
        <Routes>
          <Route path="/read-file" element={<TextFileUpload  setRemovedCommentsText={setRemovedCommentsText}/>} />
          <Route path="/output" element={<OutputRemovedComments />} />
          {/* <OutputRemovedComments />
      <TextFileUpload /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
