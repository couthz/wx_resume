export type Font = {
  family: string;
  alias: string;
  category: string;
  subsets: string[];
  variants: string[];
  files: { [key: string]: string };
};

export const fonts: Font[] = [
  {
    family: "Noto Sans SC",
    alias: "思源黑体",
    category: "sans-serif",
    subsets: [],
    variants: [
      "400",
    ],
    files: {
      "400": "https://gstatic.loli.net/s/notosanssc/v36/k3kCo84MPvpLmixcA63oeAL7Iqp5IZJF9bmaG9_FrYVHbd7X9HBZ8Q9t.woff2"
    }
  },
  {
    family: "Noto Serif SC",
    alias: "思源宋体",
    category: "serif",
    subsets: [],
    variants: [
      "400",
    ],
    files: {
      "400": "https://gstatic.loli.net/s/notoserifsc/v22/H4chBXePl9DZ0Xe7gG9cyOj7oqOcaThrVMcaeccjhXXDsOyAEEmuIi6j7j64sLjgBtMI1z49XW4.4.woff2"
    }
  },
];


export const getFontUrls = (family: string, variants: string[]): string[] => {
  const font = fonts.find((font) => font.family === family);

  if (!font) return [];

  return Object.entries(font.files)
    .filter(([variant]) => variants.includes(variant))
    .map(([, url]) => url);
};
