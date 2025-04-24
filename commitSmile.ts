import { defaultConfig } from "commitsmile";

export default defaultConfig({}).deepMerge({
  prompts: {
    description: false,
    scopes: {
      workspaces: true,
      options: [{ label: `🌍 Enviroment`, value: "enviroment" }],
    },
  },
});
