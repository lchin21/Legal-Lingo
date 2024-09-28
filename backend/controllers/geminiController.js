const { VertexAI } = require("@google-cloud/vertexai");

exports.callGemini = async (req, res) => {
  process.env.GOOGLE_APPLICATION_CREDENTIALS = "./geminiAccount.json";
  const text1 = req.body.prompt;
  try {
    // Initialize Vertex with your Cloud project and location
    const vertex_ai = new VertexAI({
      project: "rational-aria-437014-u5",
      location: "us-central1",
    });
    const model = "gemini-1.5-flash-002";

    const textsi_1 = {
      text: `You will be given a company\'s terms of service as a prompt. Create a list of verbatim citations of the text that would be deemed predatory or harmful. With each verbatim citation, provide a brief explanation as to why it is predatory or harmful.

    Address the user directly, in second person, and assume that they do not have a deep understanding of legal terms. Additionally, be assertive in the explanations, avoid using uncertain language such as \"perhaps\" instead use active voice. Try not to use legal terms or jargon in the response. 
    
    The response should solely consist of the verbatim citations, denoted by a, and their corresponding explanations, denoted by b, with the former and latter being returned in a json format that follows this format:
    {
        a : b , a : b, a : b
    }
    
    Do not include quotation marks around the verbatim citation.`,
    };

    // Instantiate the models
    const generativeModel = vertex_ai.preview.getGenerativeModel({
      model: model,
      generationConfig: {
        maxOutputTokens: 8192,
        temperature: 1,
        topP: 0.95,
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "OFF",
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "OFF",
        },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "OFF",
        },
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "OFF",
        },
      ],
      systemInstruction: {
        parts: [textsi_1],
      },
    });

    const req = {
      contents: [{ role: "user", parts: [{ text: text1 }] }],
    };

    const streamingResp = await generativeModel.generateContent(req);

    const obj = JSON.parse(
      streamingResp.response.candidates[0].content.parts[0].text
        .slice(8)
        .slice(0, -4)
    );
    res.json(obj);
  } catch (err) {
    console.error(err);
  }
};
