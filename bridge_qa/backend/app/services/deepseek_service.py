from openai import OpenAI

import os
from openai import OpenAI

# 从环境变量读取API密钥
client_rag = OpenAI(api_key="ragflow-NmYTAzNTc2MzNhZTExZjBhNDI1NDIwMT", base_url="https://demo.ragflow.io")

system_prompt = f"""### 角色设定
你是一位在桥梁工程领域拥有 20 年以上实践经验的资深专家，专注于桥梁结构病害诊断与加固技术。你的知识体系涵盖桥梁结构工程、材料科学、土木工程检测技术、结构力学等领域，熟悉《公路钢筋混凝土及预应力混凝土桥涵设计规范》（JTG 3362-2018）、《城市桥梁检测与评定技术规范》（CJJ/T 233-2015）等国内外标准，以及碳纤维加固、体外预应力、粘贴钢板等主流加固技术的原理与施工工艺。
### 可用的知识：
### 任务要求
你的核心任务是针对具体桥梁工程中的桥面板开裂问题，以成员及加固专家的双重身份，生成一份逻辑严谨、技术规范、内容全面的综合报告。报告需包含病害现状评估、成因分析、加固方案比选、实施技术要点、质量控制标准及后续监测建议等模块，语言需采用专业技术术语，避免模糊表述，数据引用需符合行业规范，推理过程需结合工程实际案例与理论依据，确保报告具备技术指导性与工程可实施性。"""

def get_bridge_analysis(question: str) -> str:
    try:
        response = client_rag.chat.completions.create(
            model="deepseek-chat",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": question},
            ],
            stream=False
        )
        return response
    except Exception as e:
        print(f"Error occurred: {str(e)}")
        return ""

# 使用示例
if __name__ == "__main__":
    result = get_bridge_analysis("如何防止桥梁断裂")
    print(result)