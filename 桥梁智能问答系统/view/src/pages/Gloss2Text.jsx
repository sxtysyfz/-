import React, { useState } from 'react';
import Chat, { Bubble, useMessages } from "@chatui/core";
import "@chatui/core/dist/index.css";

const Gloss2Text = () => {
  const { messages, appendMsg, updateMsg } = useMessages([]);
  const [isStreaming, setIsStreaming] = useState(false);

  async function deepseek(msg, aiMsgId) {
    try {
      const response = await fetch("http://127.0.0.1:8001/deepseek", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ query: msg })
      });

      if (!response.ok) throw new Error("网络响应异常");

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      // 清除首尾空格，防止格式问题
      const result = data.result.trim();
      const parts = result.split('&&');

      updateMsg(aiMsgId, {
        type: "text",
        content: { text: result },
        position: "left"
      });

      return result;
    } catch (error) {
      console.error('请求出错:', error);
      updateMsg(aiMsgId, {
        type: "text",
        content: { text: '服务暂时不可用，请稍后重试' }
      });
      return '';
    }
  }

  async function handleSend(type, val) {
    if (type === "text" && val.trim()) {
      appendMsg({
        type: "text",
        content: { text: val },
        position: "right"
      });

      // 输出
      console.log("用户输入:", val);

      setIsStreaming(true);


      const response = await fetch("http://127.0.0.1:8001/deepseek", {
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

  function renderMessageContent(msg) {
    return <Bubble content={msg.content.text} />;
  }

  return (
    <div style={{ height: '100vh' }}>
      <Chat
        navbar={{ title: "桥面板开裂案例，成因及加固专家" }}
        messages={messages}
        renderMessageContent={renderMessageContent}
        onSend={handleSend}
        placeholder="请输入您要解决的桥面板开裂问题"
      />
    </div>
  );
};

export default Gloss2Text;