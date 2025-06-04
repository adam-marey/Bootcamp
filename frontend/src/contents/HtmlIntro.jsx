import React from 'react';
import './Lesson.css';
import CodeBlock from '../components/CodeBlock';

const HtmlIntro = () => {
  const doctypeExample = `<!DOCTYPE html>`;
  const structureExample = `
<!DOCTYPE html>
<html>
  <head>
    <title>My First HTML Page</title>
  </head>
  <body>
    <h1>Welcome to HTML!</h1>
    <p>This is a paragraph.</p>
  </body>
</html>
`;
  const tagsExample = `
<h1>Main Heading</h1>
<p>This is a paragraph.</p>
<a href="https://www.example.com">Visit Example</a>
`;

  return (
    <div className="lesson-container">
      <h2>Introduction to HTML</h2>
      <p>
        Welcome! In this lesson, we’ll cover the foundational concepts of HTML.
      </p>

      <h3>1. What is HTML?</h3>
      <p>
        HTML stands for <strong>HyperText Markup Language</strong>. It defines
        the structure of web content using tags.
      </p>

      <div className="lesson-note">
        🔍 <strong>Note:</strong> HTML is not a programming language — it’s a
        markup language that structures content.
      </div>

      <h3>2. The Doctype Declaration</h3>
      <p>This tells the browser we’re using HTML5:</p>
      <CodeBlock language="html" code={doctypeExample} />

      <h3>3. Basic Page Structure</h3>
      <p>Every HTML document starts with a basic structure like this:</p>
      <CodeBlock language="html" code={structureExample} />

      <h3>4. Common Tags</h3>
      <p>Here are a few of the most common HTML tags:</p>
      <ul>
        <li>
          <code>&lt;h1&gt;</code> - Heading
        </li>
        <li>
          <code>&lt;p&gt;</code> - Paragraph
        </li>
        <li>
          <code>&lt;a&gt;</code> - Link
        </li>
      </ul>
      <CodeBlock language="html" code={tagsExample} />

      <h3>5. Practice Time</h3>
      <p>
        Try building a basic page with a heading, a paragraph, and a link. Use
        the examples above as a guide!
      </p>
    </div>
  );
};

export default HtmlIntro;
