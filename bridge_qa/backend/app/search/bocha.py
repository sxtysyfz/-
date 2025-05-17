import requests
import json


def bocha_search(query):
    url = "https://api.bochaai.com/v1/web-search"
    payload = json.dumps({
        "query": query,
        "summary": True,
        "count": 10,
        "page": 1
    })


    headers = {
        'Authorization': 'Bearer sk-216e782bd22f47dc9bef062040638ea5',
        'Content-Type': 'application/json'
    }

    response = requests.request("POST", url, headers=headers, data=payload)

    result = response.json()

    # 形成知识的格式
    knowledge = ""
    url = ""
    i = 1
    for item in result['data']['webPages']['value']:
        knowledge += f"标题: {item['name']}\n"
        knowledge += f"总结: {item['summary']}\n"
        knowledge += f"链接: {item['url']}\n\n"
        url+=f"- NO.{i}: {item['url']}\n"
        i+=1

    print(knowledge)
    print(url)

    return knowledge, url



if __name__ == "__main__":
    bocha_search("如何预防钢混组合梁混凝土桥面板锚固区开裂")

