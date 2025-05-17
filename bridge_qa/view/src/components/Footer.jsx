import React from "react";

const Footer = ({ isChinese }) => {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-column">
          <h3>{isChinese ? '研究' : 'Research'}</h3>
          <a href="/" className="footer-link">{isChinese ? '桥梁专业名词解释' : 'Sign Language Recognition Model'}</a>
          <a href="/" className="footer-link">{isChinese ? '桥面板开裂案例' : 'Cross-modal Alignment Technology'}</a>
          <a href="/" className="footer-link">{isChinese ? '多语言支持' : 'Multilingual Support'}</a>
          <a href="/" className="footer-link">{isChinese ? '学术合作' : 'Academic Collaboration'}</a>
        </div>
        <div className="footer-column">
          <h3>{isChinese ? '产品' : 'Products'}</h3>
          <a href="/" className="footer-link">{isChinese ? 'Web版翻译器' : 'Web Translator'}</a>
          <a href="/" className="footer-link">{isChinese ? '移动端SDK' : 'Mobile SDK'}</a>
          <a href="/" className="footer-link">{isChinese ? '企业定制服务' : 'Enterprise Customization Service'}</a>
          <a href="/" className="footer-link">{isChinese ? '开发者文档' : 'Developer Documentation'}</a>
        </div>
        <div className="footer-column">
          <h3>{isChinese ? '法务' : 'Legal'}</h3>
          <a href="/" className="footer-link">{isChinese ? '隐私政策' : 'Privacy Policy'}</a>
          <a href="/" className="footer-link">{isChinese ? '服务条款' : 'Terms of Service'}</a>
          <a href="/" className="footer-link">{isChinese ? '数据安全' : 'Data Security'}</a>
          <a href="/" className="footer-link">{isChinese ? '合规认证' : 'Compliance Certification'}</a>
        </div>
        <div className="footer-column">
          <h3>{isChinese ? '社区' : 'Community'}</h3>
          <a href="/" className="footer-link">{isChinese ? '开发者论坛' : 'Developer Forum'}</a>
          <a href="/" className="footer-link">{isChinese ? '案例展示' : 'Case Showcase'}</a>
          <a href="/" className="footer-link">{isChinese ? '贡献指南' : 'Contribution Guide'}</a>
          <a href="/" className="footer-link">{isChinese ? '加入我们' : 'Join Us'}</a>
        </div>
      </div>

      <div className="social-icons">
        <a href="/" className="social-icon" aria-label="WeChat">
          <img src="wechat.svg" alt="WeChat" />
        </a>
        <a href="/" className="social-icon" aria-label="GitHub">
          <img src="github.svg" alt="GitHub" />
        </a>
        <a href="/" className="social-icon" aria-label="Email">
          <img src="email.svg" alt="Email" />
        </a>
      </div>

      <div className="footer-bottom">
        <span>{isChinese ? '© 2023 Sign-LM 版权所有 | 京ICP备XXXXXX号 | ' : '&copy; 2023 Sign-LM All Rights Reserved | ICP No. XXXXXX | '}</span>
        <a href="/" className="footer-link" style={{ color: '#777', margin: '0 8px' }}>{isChinese ? '隐私政策' : 'Privacy Policy'}</a> |
        <a href="/" className="footer-link" style={{ color: '#777', margin: '0 8px' }}>{isChinese ? '服务条款' : 'Terms of Service'}</a>
      </div>
    </footer>
  );
};

export default Footer;