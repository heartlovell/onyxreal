
import { GoogleGenAI } from "@google/genai";

// Fixed: Use process.env.API_KEY directly as per @google/genai guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getSystemIntelligence = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `SYSTEM CONTEXT: You are the ONYX INTELLIGENCE INTERFACE. 
      ONYX PHILOSOPHY:
      1. IT PROBLEM SOLVING: We specialize in finding the "ghost in the machine." We don't just restart servers; we analyze kernel logs, optimize network routing, and eliminate technical debt that causes lag and downtime. We solve problems other IT firms can't even identify.
      2. WEB DEVELOPMENT (10X GROWTH): A website is a sales machine, not a digital brochure. We use psychological design, extreme speed optimization (LCP < 1s), and conversion rate optimization (CRO) to 10x lead generation.
      3. CYBERSECURITY: Proactive hardening. 
      
      USER COMMAND: ${prompt}

      INSTRUCTION: Respond in a technical, elite terminal style. Be persuasive. Focus on reliability, ROI, and expertise. Keep it punchy and professional.`,
      config: {
        temperature: 0.7,
        topP: 0.9,
        // Removed maxOutputTokens to avoid potential blockages when thinkingBudget is not explicitly set
      }
    });
    return response.text || "SYSTEM_ERROR: NULL_RESPONSE";
  } catch (error) {
    console.error("Intelligence query failed:", error);
    return `SYSTEM_CRITICAL_ERROR: ${error instanceof Error ? error.message : "UNKNOWN"}`;
  }
};
