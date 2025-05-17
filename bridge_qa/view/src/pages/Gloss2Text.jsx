import React, { useState } from 'react';
import Chat, { Bubble, useMessages } from "@chatui/core";
import { Flex, FlexItem } from '@chatui/core';
import "@chatui/core/dist/index.css";

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
    content: { text: 'Hi，我是桥梁智能助手,很高兴为您服务' },
    user: {
      avatar: 'https://gw.alicdn.com/imgextra/i2/O1CN01fPEB9P1ylYWgaDuVR_!!6000000006619-0-tps-132-132.jpg',
    },
  },
];


const Gloss2Text = () => {
  const { messages, prependMsgs, appendMsg, updateMsg, deleteMsg, resetList, setTyping} = useMessages(initialMessages);
  const [isStreaming, setIsStreaming] = useState(false);

  const defaultQuickReplies = [
  {
    name: '桥面板开裂案例',
    isNew: true,
    isHighlight: true,
  },
  {
    name: '桥面板开裂成因',
    isNew: true,
  },
  {
    name: '如何预防桥面板开裂',
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

      // 输出<Button loading>加载中...</Button>
      appendMsg({
        _id: "loading1",
        type: "system",
        content: {text:"正在【全网+专业知识库】综合搜索..."},
        // content: "正在检索相关专业知识...",
        position: "center",
        // user: {
        //   avatar: 'https://gw.alicdn.com/imgextra/i2/O1CN01fPEB9P1ylYWgaDuVR_!!6000000006619-0-tps-132-132.jpg'
        // }
      })

      const search_word = await fetch("http://127.0.0.1:8001/search_word", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ query: val })
      });

      if (!search_word.ok) throw new Error("网络响应异常");

      const search = await search_word.json();
      if (search.error) throw new Error(search.error);

      // 清除首尾空格，防止格式问题
      const search_result = search.result.trim();


      // 删除
      deleteMsg("loading1");

      // 输出检索词
      appendMsg({
        _id: "search",
        type: "system",
        content: { text: "🎉已检索如下关键词,找到10篇专业知识：\n"+search_result },
        position: "center",
        // user: {
        //   avatar: 'https://gw.alicdn.com/imgextra/i2/O1CN01fPEB9P1ylYWgaDuVR_!!6000000006619-0-tps-132-132.jpg'
        // }
      })


      appendMsg({
        _id: "loading2",
        type: "text",
        content: {text:"正在生成专业报告..."},
        position: "center",
        // user: {
        //   avatar: 'https://gw.alicdn.com/imgextra/i2/O1CN01fPEB9P1ylYWgaDuVR_!!6000000006619-0-tps-132-132.jpg'
        // }
      })



      setIsStreaming(true);


      const response = await fetch("http://127.0.0.1:8001/deepseek", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ query: val , search_result: search_result})
      });

      // 删除
      deleteMsg("loading2");

      if (!response.ok) throw new Error("网络响应异常");

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      // 清除首尾空格，防止格式问题
      const result = data.result.trim();

      const aiMsgId = appendMsg({
        type: "text",
        content: { text: result},
        position: "left",
        user: {
          avatar: 'https://gw.alicdn.com/imgextra/i2/O1CN01fPEB9P1ylYWgaDuVR_!!6000000006619-0-tps-132-132.jpg',
        },
      });

      // 生成链接
      const url = data.url;
      // 输出链接
      appendMsg({
        _id: "url",
        type: "system",
        content: { text: "📚相关参考文献：\n"+url },
        position: "center",
        // user: {
        //    avatar: 'https://gw.alicdn.com/imgextra/i2/O1CN01fPEB9P1ylYWgaDuVR_!!6000000006619-0-tps-132-132.jpg'
        // }
      })
      // 输出
      console.log("用户输入:", val);
    }
  }

  function handleQuickReplyClick(item) {
    handleSend('text', item.name);
  }

  function renderMessageContent(msg) {
    return (
          <Bubble content={msg.content.text} />
    );
  }

  return (
    <Flex>
      <FlexItem alignSelf={"baseline"} style={{ height: '98vh'}}>
        <Chat
          navbar={{ title: "桥面板开裂案例，成因及加固专家" }}
          messages={messages}
          renderMessageContent={renderMessageContent}
          placeholder="请输入您要解决的桥面板开裂问题"
          quickReplies={defaultQuickReplies}
          onQuickReplyClick={handleQuickReplyClick}
          onSend={handleSend}
        />
      </FlexItem>
    </Flex>
  );
};

export default Gloss2Text;