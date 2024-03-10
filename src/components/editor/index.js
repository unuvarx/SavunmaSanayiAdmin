// components/TinyMCEEditor.js
import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

const TinyMCEEditor = ({ onChange, value }) => {
  const handleEditorChange = (content, editor) => {
    onChange(content);
  };

  return (
    <Editor
      apiKey="0yvljr72y1qmgc4g7kq12ofsk84m2xodwec1yobgl0x8f7oa"  // Kendi TinyMCE API anahtarınızı buraya ekleyin
      initialValue={value}
      init={{
        height: 500,
        menubar: false,
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount'
        ],
        toolbar:
          'undo redo | formatselect | bold italic backcolor | \
          alignleft aligncenter alignright alignjustify | \
          bullist numlist outdent indent | removeformat | help'
      }}
      onEditorChange={handleEditorChange}
    />
  );
};

export default TinyMCEEditor;
