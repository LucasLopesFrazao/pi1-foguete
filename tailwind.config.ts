import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-radial-login":
          "radial-gradient(circle at 3% 100%, rgba(16,11,31,1) 0%, rgba(55,25,111,0.84) 50%, rgba(0,0,0,1) 100%)",
        "gradient-radial-sensor":
          "radial-gradient(circle at 3% 100%, rgba(16,11,31,1) 0%, rgba(26,112,34,0.84) 50%, rgba(0,0,0,1) 100%)",
        "gradient-radial-lancamento":
          "radial-gradient(circle at 3% 100%, rgba(16,11,31,1) 0%, rgba(253,29,29,0.84) 50%, rgba(0,0,0,1) 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
