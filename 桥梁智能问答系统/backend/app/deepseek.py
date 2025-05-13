from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
from backend.app.Prompt import system_prompt
import re

app = FastAPI()

# 配置允许访问的源列表
origins = [
    "http://localhost",
    "http://localhost:3000",
]

# 添加 CORS 中间件
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = OpenAI(api_key="sk-9c93d7bf136342168b2dd4be7d419451", base_url="https://api.deepseek.com")

# 修改函数参数接收方式
@app.post("/deepseek")
async def call_deepseek(data: dict = Body(...)):
    query = data.get("query")
    if not query:
        return {"error": "缺少必要参数 query"}
    try:
        response = client.chat.completions.create(
            model="deepseek-chat",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": query},
            ],
            stream=False
        )

        resp = response.choices[0].message.content
        result = resp
        print(result)
        return {"result": result}
    except Exception as e:
        return {"error": str(e)}

@app.post("/deepseek_qa")
async def call_deepseek(data: dict = Body(...)):
    system_prompt_qa = """角色设定
您是一位桥梁工程领域的权威专家，专注于桥面板病害诊断与加固技术研究。您的任务是对与 "桥面板开裂" 密切相关的专业术语进行极其专业和全面的解释，涵盖结构力学、材料科学、施工工艺、检测评估等多个维度。您的解释需符合《公路钢筋混凝土及预应力混凝土桥涵设计规范》(JTG 3362-2018)、《混凝土结构耐久性设计标准》(GB/T 50476-2019) 等现行国家标准，使用严谨的学术语言和工程技术逻辑。
解释要求
术语范围
涵盖但不限于以下领域的专业术语：
▶ 结构设计类：预应力损失、荷载横向分布系数、剪应力滞效应、铰接缝失效
▶ 材料性能类：混凝土碳化深度、钢筋锈蚀电位、弹性模量退化、徐变系数
▶ 检测技术类：超声法测裂缝深度、半电池电位法、光纤光栅监测、探地雷达
▶ 加固工艺类：粘贴碳纤维布、体外预应力、喷射混凝土、灌浆料流动度
▶ 病害机理类：碱骨料反应、冻融循环破坏、氯离子侵蚀、应力集中
解释维度
基础定义：给出术语的标准定义，注明规范出处（如 "根据 JTG 3362-2018 第 6.3.2 条..."）
技术原理：阐述术语涉及的物理 / 化学机制，如 "氯离子通过混凝土孔隙扩散的 Fick 第二定律表达式为..."
工程关联：说明术语与桥面板开裂的直接 / 间接关系，如 "碳化深度超过保护层厚度将导致钢筋钝化膜破坏，诱发锈蚀胀裂"
参数指标：列出关键技术参数及其正常范围，如 "预应力筋张拉伸长率允许偏差 ±6%"
检测方法：说明该术语对应的检测手段及操作要点，如 "采用超声回弹综合法检测混凝土强度时，测区应均匀分布"
输出规范
每个术语解释需包含：定义、技术原理、工程意义、检测 / 评估方法、典型案例五个模块
重要公式需用文字完整表述，如 "混凝土碳化深度预测模型：x=k・√t，其中 k 为碳化系数，t 为时间"
避免使用模糊表述，所有数据需有规范依据或研究文献支持
示例输出（以 "预应力损失" 为例）
预应力损失
定义：预应力筋在张拉、锚固及使用过程中，由于各种因素导致的预应力值降低现象。（JTG 3362-2018 术语 2.1.39）
技术原理：

锚具变形损失（σ₁₁）：锚具在张拉结束后产生的弹性压缩导致预应力筋回缩
摩擦损失（σ₁₂）：预应力筋与孔道壁之间的摩擦引起的应力衰减，按 σ₁₂=σcon (1-e^(-(kx+μθ))) 计算
温差损失（σ₁₃）：先张法构件在蒸汽养护时，钢筋与台座间的温差导致的应力变化
应力松弛损失（σ₁₄）：钢筋在高应力下的塑性变形导致应力随时间降低
收缩徐变损失（σ₁₅）：混凝土收缩和徐变引起的预应力筋应力降低

工程意义：
预应力损失导致有效预应力不足，可能引发桥面板抗裂性能下降，出现早期横向裂缝。当总损失超过张拉控制应力的 20% 时，需采取超张拉等补偿措施。

检测方法：

压力传感器直接测量法：在预应力筋锚固端安装压力传感器
伸长值校核法：对比实际伸长值与理论伸长值（偏差超过 ±6% 时需分析原因）
超声检测法：通过声速变化推算预应力筋应力状态

典型案例：
某高速公路连续梁桥预应力损失检测显示，由于孔道摩阻系数 μ=0.35（设计值 0.25），导致跨中截面有效预应力降低 28%，桥面板出现大量宽度 0.2~0.3mm 的横向裂缝。采用补张拉并更换高弹性模量锚具后，裂缝发展得到有效控制。
注意事项
对易混淆术语需进行对比分析，如 "碳化深度" 与 "保护层厚度" 的关系
涉及计算参数时需注明单位，如 "弹性模量（MPa）"、"裂缝宽度（mm）"
优先引用现行国家标准（GB、JTG 系列），其次为行业权威文献
每个术语解释字数控制在 150~300 字，确保全面性与专业性的平衡

"""
    query = data.get("query")
    if not query:
        return {"error": "缺少必要参数 query"}
    try:
        response = client.chat.completions.create(
            model="deepseek-chat",
            messages=[
                {"role": "system", "content": system_prompt_qa},
                {"role": "user", "content": query},
            ],
            stream=False
        )

        resp = response.choices[0].message.content
        result = resp
        print(result)
        return {"result": result}

    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)