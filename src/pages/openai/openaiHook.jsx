import React, { useState } from "react";
const prePrompt = `Can you read the essay below and list down:
1. Sentences containing grammar error(s). Please include: a brief explanation of the grammar rule(s) and a sentence correction.
2. Sentences containing spelling errors. Please include: a specific word correction.
3. General comments for improvement of the essay. Please include: examples from the given essay.`;

export default function useOpenai(openai) {
  const [loading, setLoading] = useState(false);
  const [imageEssay, setImageEssay] = useState("");
  const [apiResponse, setApiResponse] = useState("");
  const [apiResponseImage, setApiResponseImage] = useState("");

  const handleSubmitImage = async (image, type = "text") => {
    setLoading(true);
    const result = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "This is an image of a handwritten essay. give me the text from it",
            },
            {
              type: "image_url",
              image_url: {
                url: image,
              },
            },
          ],
        },
      ],
      model: "gpt-4-vision-preview",
      max_tokens: 1500,
    });
    setImageEssay(result.choices[0]?.message?.content);
    await handleSubmitText(result.choices[0]?.message?.content, type);
    setLoading(false);
  };

  const handleSubmitText = async (textInput, type = "text") => {
    setLoading(true);
    try {
      const prompt = `${prePrompt}: ${textInput}`;
      const result = await openai.chat.completions.create({
        messages: [{ role: "system", content: prompt }],
        model: "gpt-4",
        // response_format: { type: "json_object" },
      });
      if (type === "image") {
        setApiResponseImage(result.choices[0].message.content);
      } else setApiResponse(result.choices[0].message.content);
    } catch (e) {
      setApiResponse("Something is going wrong, Please try again.");
    }
    setLoading(false);
  };
  console.log("apiResponseImage", apiResponseImage);
  console.log("apiResponse", apiResponse);
  return {
    handleSubmitImage,
    handleSubmitText,
    loading,
    imageEssay,
    apiResponse,
    apiResponseImage,
  };
}
