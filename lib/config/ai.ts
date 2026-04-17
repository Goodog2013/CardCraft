export type AiMode = "local" | "api";

export interface AiConfig {
  mode: AiMode;
  baseUrl: string;
  model: string;
}

const DEFAULT_LOCAL_BASE = "http://192.168.1.66:3131/v1";
const DEFAULT_LOCAL_MODEL = "local-model";

export function getAiConfig(): AiConfig {
  const mode = (process.env.NEXT_PUBLIC_AI_MODE || "local") as AiMode;

  return {
    mode,
    baseUrl: process.env.NEXT_PUBLIC_OPENAI_BASE_URL || DEFAULT_LOCAL_BASE,
    model: process.env.NEXT_PUBLIC_OPENAI_MODEL || DEFAULT_LOCAL_MODEL,
  };
}

export function canUseRemoteApi() {
  const config = getAiConfig();
  return config.mode === "api" && Boolean(config.baseUrl && config.model);
}
