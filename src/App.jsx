import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import imageCompression from "browser-image-compression";

function App() {
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const [result, setResult] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [customPrompt, setCustomPrompt] = useState("Describe this image in 50 words");

  async function analyzeImage(file) {
    try {
      setLoading(true);
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
      });

      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          const base64 = reader.result.split(",")[1];
          const genAI = new GoogleGenerativeAI(API_KEY);
          const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
          
          const result = await model.generateContent([
            customPrompt,
            { inlineData: { data: base64, mimeType: compressedFile.type } }
          ]);
          
          setResult(result.response.text());
        } catch (error) {
          console.error('Error in generateContent:', error);
          setResult("Error analyzing image");
        } finally {
          setLoading(false);
        }
      };
      
      reader.onerror = () => {
        console.error('Error reading file');
        setResult("Error reading file");
        setLoading(false);
      };
      
      reader.readAsDataURL(compressedFile);
    } catch (error) {
      console.error('Error in analyzeImage:', error);
      setResult("Error analyzing image");
      setLoading(false);
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      analyzeImage(file);
    }
  };

  return (
    <div style={{ 
      maxWidth: '500px', 
      margin: '50px auto', 
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>
        Image Analyzer
      </h1>
      
      <div style={{ 
        border: '2px dashed #ccc', 
        padding: '40px', 
        textAlign: 'center',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
          id="fileInput"
        />
        <label 
          htmlFor="fileInput" 
          style={{ 
            cursor: 'pointer', 
            color: '#007bff',
            fontSize: '16px'
          }}
        >
          Click to upload image
        </label>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ 
          display: 'block', 
          marginBottom: '8px', 
          fontWeight: 'bold' 
        }}>
          Custom Prompt:
        </label>
        <input
          type="text"
          value={customPrompt}
          onChange={(e) => setCustomPrompt(e.target.value)}
          placeholder="Enter your custom prompt (e.g., Describe this image in 200 words)"
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '14px',
            boxSizing: 'border-box'
          }}
        />
      </div>

      {image && (
        <img 
          src={image} 
          alt="Uploaded" 
          style={{ 
            width: '100%', 
            maxHeight: '300px', 
            objectFit: 'contain',
            marginBottom: '20px',
            borderRadius: '8px'
          }} 
        />
      )}

      {loading && (
        <div style={{ textAlign: 'center', color: '#666' }}>
          Analyzing...
        </div>
      )}

      {result && !loading && (
        <div style={{ 
          padding: '15px', 
          backgroundColor: '#f8f9fa', 
          borderRadius: '8px',
          lineHeight: '1.5'
        }}>
          {result}
        </div>
      )}
    </div>
  );
}

export default App;