import React from 'react';

function TextFileUpload(props) {
    const [text, setText] = React.useState('');
    return (
        <div>
            <input type='file' onChange={async (e)=>{
                const file = e.target.files[0];
                const fileText= await file.text();
                setText(fileText)
                // console.log(fileText);
                for (let i = 0; i < fileText.length; i++) {
                    if (fileText[i] === '\n') {
                        console.log('found one!!!!!')
                    }
                   console.log(fileText[i]);
                    }
                }}/>
          
            <div>{text}</div>
        </div>
    );
}
export default TextFileUpload;