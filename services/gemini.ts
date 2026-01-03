
import { GoogleGenAI } from "@google/genai";

// Verificação segura para evitar que o app quebre se process.env não estiver definido
const getApiKey = () => {
  try {
    return process.env.API_KEY || '';
  } catch (e) {
    return '';
  }
};

export const getFinancialInsights = async (context: string) => {
  try {
    const apiKey = getApiKey();
    if (!apiKey) {
      return "A chave da API (API_KEY) não foi configurada. Por favor, adicione-a às variáveis de ambiente.";
    }

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Aja como um analista financeiro experiente. Analise os seguintes dados de simulação e forneça 3 dicas práticas e uma breve conclusão sobre a viabilidade ou impacto financeiro. Use português brasileiro.

Dados da Simulação:
${context}`,
      config: {
        temperature: 0.7,
      }
    });

    return response.text || "Não foi possível gerar insights no momento.";
  } catch (error) {
    console.error("Error fetching Gemini insights:", error);
    return "Ocorreu um erro ao consultar o especialista de IA. Verifique sua conexão ou a validade da API Key.";
  }
};
