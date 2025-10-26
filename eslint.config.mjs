const eslintConfig = [
  {
    ignores: [
      "docs/**",
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "*.config.*",
    ],
  },
  {
    files: ["src/**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  }
];

export default eslintConfig;
