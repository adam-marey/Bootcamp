import React, { useState } from 'react';
import './Learn.css';
import { LuLogOut } from 'react-icons/lu';
import HtmlIntro from '../contents/HtmlIntro';
import HtmlTags from '../contents/HtmlTags';
import CssIntro from '../contents/CssIntro';
import CssBoxModel from '../contents/CssBoxModel';
import JsBasics from '../contents/JsBasics';
import JsDom from '../contents/JsDom';
import ReactIntro from '../contents/ReactIntro';
import ReactHooks from '../contents/ReactHooks';

const contentMap = {
  'html-intro': <HtmlIntro />,
  'html-tags': <HtmlTags />,
  'css-intro': <CssIntro />,
  'css-box': <CssBoxModel />,
  'js-basics': <JsBasics />,
  'js-dom': <JsDom />,
  'react-intro': <ReactIntro />,
  'react-hooks': <ReactHooks />
};

const contentTree = {
  HTML: {
    'Intro to HTML': 'html-intro',
    'Common Tags': 'html-tags'
  },
  CSS: {
    'Intro to CSS': 'css-intro',
    'Box Model': 'css-box'
  },
  JavaScript: {
    'JS Basics': 'js-basics',
    'DOM Manipulation': 'js-dom'
  },
  React: {
    'React Intro': 'react-intro',
    'React Hooks': 'react-hooks'
  }
};

const Learn = () => {
  const [activeKey, setActiveKey] = useState('html-intro');
  const [expanded, setExpanded] = useState({});

  const toggleCategory = cat => {
    setExpanded(prev => ({ ...prev, [cat]: !prev[cat] }));
  };

  return (
    <div className="learn-container">
      <aside className="sidebar">
        <div className="student-profile">
          <div className="profile-image-placeholder">
            {/* Replace with <img src={userImage} alt="Student" /> later */}
            <span>👤</span>
          </div>
          <div className="student-name">Student Name</div>
        </div>
        {Object.entries(contentTree).map(([category, pages]) =>
          <div key={category} className="category">
            <div
              className="category-title"
              onClick={() => toggleCategory(category)}
            >
              {category}
            </div>
            {expanded[category] &&
              <ul className="sub-list">
                {Object.entries(pages).map(([title, key]) =>
                  <li
                    key={key}
                    className={key === activeKey ? 'active' : ''}
                    onClick={() => setActiveKey(key)}
                  >
                    {title}
                  </li>
                )}
              </ul>}
          </div>
        )}
        <div className="logout-container">
          <button
            className="logout-button"
            onClick={() => console.log('Logout')}
          >
            <LuLogOut />
          </button>
        </div>
      </aside>

      <main className="learn-content">
        {contentMap[activeKey] || <p>Select a topic to start learning.</p>}
      </main>
    </div>
  );
};

export default Learn;
