import { GeneratedName, UserInput } from "../types";

export const generateBabyNames = async (input: UserInput): Promise<GeneratedName[]> => {
  // Using the provided DeepSeek API key
  const apiKey = "sk-f533f03a95f943cbbb9803ad9f193567";
  
  if (!apiKey) {
    console.error("API Key is missing.");
    throw new Error("API Key is missing");
  }

  const genderText = input.gender === 'boy' ? '男孩' : input.gender === 'girl' ? '女孩' : '不限性别';
  const nameLengthText = input.wordCount === '1' ? '单字名 (不含姓)' : '双字名 (不含姓)';

  let baziContext = "";
  if (input.useBazi && input.birthDate) {
      baziContext = `
      【生辰八字信息】
      出生日期：${input.birthDate}
      出生时间：${input.birthTime || "未知"}
      出生地点：${input.birthPlace || "未知"}
      
      请结合生辰八字（四柱），专业地分析五行旺衰，找出"喜用神"（对宝宝命运最有帮助的五行）。
      推荐的名字必须：
      1. 在字形、字义或五行属性上包含喜用神对应的五行，以平衡命局。
      2. 在"meaning"字段中明确说明："八字喜[某五行]，此名属[某五行]，可[补救/增强]..."。
      3. 在"elements"字段中标注名字中每个字的五行属性（如："火木"）。
      `;
  }

  const systemPrompt = `你是一位精通中国传统文化、诗词歌赋、周易八字和起名学的国学大师。
请根据用户提供的姓氏、性别、生辰八字等信息进行起名。

【输出格式要求】
必须返回符合 JSON 标准的响应。
返回一个包含 'names' 字段的 JSON 对象，'names' 是一个数组，包含 10 个名字对象。
每个名字对象结构如下：
{
  "name": "名字（不含姓氏）",
  "pinyin": "名字拼音",
  "source": "出处（书名/作者）",
  "quote": "原文诗句",
  "meaning": "详细寓意解析及八字补益说明",
  "elements": "名字的五行属性（如'火木'）"
}

请确保 JSON 格式严格合法，不要输出 Markdown 代码块标记。`;

  const userPrompt = `
    请为姓氏为"${input.surname}"的${genderText}宝宝，起 10 个${nameLengthText}。
    
    ${baziContext}
    
    家长寄语与期望：${input.wishes || "寓意吉祥，平安健康，知书达理，有正能量"}。
    
    【起名要求】：
    1. 名字必须出自中国经典古籍（如《诗经》、《楚辞》、《唐诗》、《宋词》、《论语》、《周易》等）。
    2. 寓意必须积极向上、充满正能量、喜庆吉祥。
    3. 名字要优美动听，避免生僻字和歧义。
    4. 即使分析八字，也要优先保证名字的文化内涵和美感。
  `;

  try {
    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        stream: false,
        response_format: { type: "json_object" },
        temperature: 1.1 
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`DeepSeek API Error: ${response.status} ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    
    if (!content) throw new Error("No content returned from DeepSeek API");

    // Clean up potential markdown code blocks just in case
    const cleanedContent = content.replace(/```json/g, '').replace(/```/g, '').trim();

    let parsedData;
    try {
       parsedData = JSON.parse(cleanedContent);
    } catch (e) {
       console.error("Failed to parse JSON:", cleanedContent);
       throw new Error("Invalid JSON response from API");
    }
    
    if (parsedData && Array.isArray(parsedData.names)) {
        return parsedData.names;
    }
    
    // Fallback if the model returns a direct array
    if (Array.isArray(parsedData)) {
        return parsedData;
    }

    return [];

  } catch (error) {
    console.error("Error generating names:", error);
    throw error;
  }
};