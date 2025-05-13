import React from 'react';
import '../App.css';

const Header = ({ isChinese, switchLanguage }) => {
  return (
    <header className="header">
      <div className="logo">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7z"/>
        </svg>
        {isChinese ? '钢-混组合梁砼桥面板裂缝智能防治问答系统' : '钢-混组合梁砼桥面板裂缝智能防治问答系统'}
      </div>
      <nav className="nav-links">
        <a href="#" data-en="API Platform">{isChinese ? '长安大学公路学院指定合作平台' : 'API Platform'}</a>
        <button className="language-switcher" onClick={switchLanguage}>
          {isChinese ? 'English' : '中文'}
        </button>
      </nav>
    </header>
  );
};

export default Header;