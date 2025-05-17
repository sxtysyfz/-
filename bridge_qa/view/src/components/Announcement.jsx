import React from 'react';
import './Announcement.css';
import { Notice } from '@chatui/core';

const Announcement = ({ isChinese }) => {
  return (
    <div className="announcement">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" style={{ marginRight: '1rem' }}>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
        </svg>
        <span>{isChinese ? '钢-混组合梁砼桥面板裂缝智能防治问答系统-V2 即将模型更新，新增对桥梁裂缝的检测识别。' : 'Sign-LM-V2 model updated. New gesture recognition accuracy increased by 30%. Supports multi-country sign language conversion. Experience the new features now.'}</span>
      </div>
      <button style={{ background: 'var(--primary)', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '8px' }}>
        {isChinese ? '了解更多' : 'Learn More'}
      </button>
    </div>
  );
};

export default Announcement;