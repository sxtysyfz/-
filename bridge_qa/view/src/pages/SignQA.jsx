import React, { useState } from 'react';
import Chat, { Bubble, useMessages } from "@chatui/core";
import "@chatui/core/dist/index.css";
import { TypingBubble } from '@chatui/core';


// 获取时间，格式为10:30:00
const now = new Date();
const hours = now.getHours().toString().padStart(2, '0');
const minutes = now.getMinutes().toString().padStart(2, '0');
const seconds = now.getSeconds().toString().padStart(2, '0');
const time = `${hours}:${minutes}:${seconds}`;

const initialMessages = [
  {
    type: 'system',
    content: { text: time},      // 调用时间
  },
  {
    type: 'text',
    content: { text: 'Hi，我是桥梁名词解释助手,很高兴为您服务' },
    user: {
      avatar: 'https://gw.alicdn.com/imgextra/i2/O1CN01fPEB9P1ylYWgaDuVR_!!6000000006619-0-tps-132-132.jpg',
    },
  },
];


const SignQA = () => {
  const { messages, appendMsg, updateMsg } = useMessages(initialMessages);
  const [isStreaming, setIsStreaming] = useState(false);


  const defaultQuickReplies = [
  {
    name: '桥面板',
    isNew: true,
    isHighlight: true,
  },
  {
    name: '面板开裂',
    isNew: true,
  },
  {
    name: '钢混组合梁',
    isHighlight: true,
  },
];

  async function handleSend(type, val) {
    if (type === "text" && val.trim()) {
      appendMsg({
        type: "text",
        content: { text: val },
        position: "right",
        user: {
          avatar: 'https://iconfont.alicdn.com/p/illus_3d/file/CfQEcKFxiKhC/e9bb7e6d-5436-4f5d-989a-5eaa457bce6f.png',
        }
      });

      // 输出
      console.log("用户输入:", val);

      setIsStreaming(true);


      const response = await fetch("http://127.0.0.1:8001/deepseek_qa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ query: val })
      });

      if (!response.ok) throw new Error("网络响应异常");

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      // 清除首尾空格，防止格式问题
      const result = data.result.trim();
      const aiMsgId = appendMsg({
        type: "text",
        content: { text: result},
        position: "left"
      });

      console.log("用户输入:", val);
    }
  }

  function handleQuickReplyClick(item) {
    handleSend('text', item.name);
  }


  function renderMessageContent(msg) {
    return <Bubble content={msg.content.text} />;
  }

  return (
    <div style={{ height: '98vh' }}>
      <Chat
        navbar={{ title: "桥梁专业名词解释专家" }}
        messages={messages}
        renderMessageContent={renderMessageContent}
        onSend={handleSend}
        quickReplies={defaultQuickReplies}
        onQuickReplyClick={handleQuickReplyClick}
        placeholder="请输入您想了解的桥梁专业名词"
      />
    </div>
  );
};

export default SignQA;