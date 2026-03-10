const fs = require('fs');
const path = require('path');
const https = require('https');

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error('Error: GEMINI_API_KEY environment variable is not set.');
  process.exit(1);
}

// Arguments
const prompt = process.argv[2];
const outputPath = process.argv[3];

if (!prompt || !outputPath) {
  console.error('Usage: node scripts/nanobanana.js "<prompt>" "<output_path>"');
  process.exit(1);
}

const MODEL_ID = 'gemini-3-pro-image-preview';
const GENERATE_CONTENT_API = 'streamGenerateContent';
const URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_ID}:${GENERATE_CONTENT_API}?key=${API_KEY}`;

const requestBody = {
  contents: [
    {
      role: 'user',
      parts: [
        { text: prompt }
      ]
    }
  ],
  generationConfig: {
    responseModalities: ["IMAGE", "TEXT"],
    imageConfig: {
      image_size: "1K"
    }
  },
  tools: [
    {
      googleSearch: {}
    }
  ]
};

const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
};

console.log(`Generating image for prompt: "${prompt}" using ${MODEL_ID}...`);

const req = https.request(URL, options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    if (res.statusCode !== 200) {
      console.error(`API Error: ${res.statusCode} - ${res.statusMessage}`);
      console.error(data);
      process.exit(1);
    }

    try {
      // The API might return multiple chunks if it's a stream, but we need to parse valid JSON.
      // Since we used streamGenerateContent, the response is a JSON array of objects or multiple JSON objects.
      let responseObj;
      try {
        responseObj = JSON.parse(data);
      } catch (e) {
        console.error("Failed to parse JSON response:", e);
        console.error("Raw data:", data);
        process.exit(1);
      }

      let base64Image = null;

      const candidates = Array.isArray(responseObj) ? responseObj.flatMap(r => r.candidates || []) : (responseObj.candidates || []);

      for (const candidate of candidates) {
        if (candidate.content && candidate.content.parts) {
          for (const part of candidate.content.parts) {
            if (part.inlineData && part.inlineData.data) {
              base64Image = part.inlineData.data;
              break;
            }
          }
        }
        if (base64Image) break;
      }

      if (!base64Image) {
        console.error('No image data found in response.');
        // console.log("Full Response:", JSON.stringify(responseObj, null, 2));
        process.exit(1);
      }

      const buffer = Buffer.from(base64Image, 'base64');

      // Ensure directory exists
      const dir = path.dirname(outputPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      fs.writeFileSync(outputPath, buffer);
      console.log(`Image saved to ${outputPath}`);

    } catch (error) {
      console.error('Error processing response:', error);
      process.exit(1);
    }
  });
});

req.on('error', (error) => {
  console.error('Request error:', error);
  process.exit(1);
});

req.write(JSON.stringify(requestBody));
req.end();
