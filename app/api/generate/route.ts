import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { image, prompt, mode } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: "提示词不能为空" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "API Key 未配置" },
        { status: 500 }
      );
    }

    // 构建请求内容
    const parts: Array<{ text?: string; inline_data?: { mime_type: string; data: string } }> = [];

    if (mode === "image-to-image" && image) {
      // 图生图模式：发送图片 + 提示词
      const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
      const mimeTypeMatch = image.match(/^data:(image\/\w+);base64,/);
      const mimeType = mimeTypeMatch ? mimeTypeMatch[1] : "image/jpeg";

      parts.push({
        inline_data: {
          mime_type: mimeType,
          data: base64Data,
        },
      });
      parts.push({
        text: `Edit this image according to the following instructions: ${prompt}. Generate a new image based on this.`,
      });
    } else {
      // 文生图模式：仅发送提示词
      parts.push({
        text: `Generate an image based on this description: ${prompt}`,
      });
    }

    const contents = [
      {
        role: "user",
        parts,
      },
    ];

    console.log("Calling Gemini API with mode:", mode);

    // 调用 Gemini API - 使用 gemini-2.0-flash-exp-image-generation 模型
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp-image-generation:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents,
          generationConfig: {
            responseModalities: ["TEXT", "IMAGE"],
          },
        }),
      }
    );

    const responseText = await response.text();
    console.log("Gemini API Response status:", response.status);

    let data;
    try {
      data = JSON.parse(responseText);
    } catch {
      console.error("Failed to parse response:", responseText);
      return NextResponse.json(
        { error: "API 响应解析失败" },
        { status: 500 }
      );
    }

    if (!response.ok) {
      console.error("Gemini API Error:", data);
      return NextResponse.json(
        { error: data.error?.message || "API 调用失败" },
        { status: response.status }
      );
    }

    // 解析响应，提取生成的图片
    const candidates = data.candidates;
    if (!candidates || candidates.length === 0) {
      console.error("No candidates in response:", data);
      return NextResponse.json(
        { error: "未生成任何内容" },
        { status: 500 }
      );
    }

    const parts2 = candidates[0].content?.parts || [];
    let generatedImage = null;
    let textResponse = "";

    for (const part of parts2) {
      if (part.inlineData) {
        generatedImage = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
      if (part.inline_data) {
        generatedImage = `data:${part.inline_data.mime_type};base64,${part.inline_data.data}`;
      }
      if (part.text) {
        textResponse += part.text;
      }
    }

    console.log("Generated image:", generatedImage ? "Yes" : "No");
    console.log("Text response:", textResponse);

    if (!generatedImage) {
      // 如果没有图片，返回文本作为错误信息
      return NextResponse.json(
        { error: textResponse || "未能生成图片，请尝试修改提示词" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      image: generatedImage,
      text: textResponse,
    });
  } catch (error) {
    console.error("Generate API Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "服务器错误" },
      { status: 500 }
    );
  }
}

