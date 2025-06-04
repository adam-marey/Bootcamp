import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeBlock = ({ language = 'html', code }) => {
  return (
    <SyntaxHighlighter language={language} style={dracula} showLineNumbers>
      {code}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;
