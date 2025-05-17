import React from 'react';
import FeatureCard from '../components/FeatureCard';
import Header from '../components/Header';
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';

const features = [
  {
    title: { zh: '桥梁专业名词解释专家', en: 'Sign Language Q&A' },
    description: {
      zh: '通过RAG检索增强技术，结合小组论文收集与阅读心得，以极其专业的角度来解释关于桥面板开裂的各种名词',
      en: 'Capture gesture movements through the camera and generate natural language answers in real-time. Supports multiple scene mode switching for a smooth interaction experience.'
    },
    link: '/sign_qa',
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="60" height="60">
        <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
      </svg>
    )
  },
  {
    title: { zh: '桥面板开裂案例，成因及加固专家', en: 'Gloss2Text' },
    description: {
      zh: '通过rag检索增强技术，结合小组搜集搜集到的大量案例，成因，加固办法，形成专业报告',
      en: 'Convert sign language symbol sequences (gloss) into natural language text. Supports batch processing and format export to meet professional needs.'
    },
    link: '/gloss2text',
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="60" height="60">
        <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
      </svg>
    )
  },
  {
    title: { zh: '桥梁裂缝检测', en: 'Bridge Crack Detection' },
    description: {
      zh: '使用先进的深度学习模型，对桥梁裂缝进行检测，提供准确的检测结果和建议，帮助用户及时采取预防措施，确保桥梁的安全和稳定性。',
      en: 'Generate corresponding sign language symbol sequences from natural language text. Built-in visual preview function supports multi-language synchronous output.'
    },
    link: '/BridgeCrackDetection',
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="60" height="60">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 10h2v7H7zm4-3h2v10h-2zm4 6h2v4h-2z"/>
      </svg>
    )
  }
];

const Home = ({ isChinese, switchLanguage }) => {

  return (
    <div className="App">
      <Header isChinese={isChinese} switchLanguage={switchLanguage} />
      <Announcement isChinese={isChinese} />
      <section className="main-section">
        <div className="section-header">
          <h1>{isChinese ? '钢-混组合梁砼桥面板裂缝智能防治多模态系统' : 'Sign-LM - Intelligent Sign Language Interaction System'}</h1>
          <p>{isChinese ? '基于rag检索增强技术的钢-混组合梁砼桥面板裂缝智能防治多模态系统，为专业的桥梁人服务' : 'A sign language translation and Q&A system based on the Transformer architecture, supporting bidirectional conversion and real-time interaction.'}</p>
        </div>
        <div className="features-container">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              link={feature.link}
              svg={feature.svg}
              isChinese={isChinese}
            />
          ))}
        </div>
      </section>
      <Footer isChinese={isChinese} />
    </div>
  );
}

export default Home;