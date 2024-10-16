/** @type {import('tailwindcss').Config} */
import { SPACING, } from "./src/constants/spacing";
import { BGCOLOR,TEXTCOLOR,COLUMNBG } from "./src/constants/colors";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        mainBg: BGCOLOR,
        columnBg: COLUMNBG,
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const btnUtilities = {
        ".btnTasks": {
          display: "flex",
          gap: SPACING / 8 + "px",
          alignItems: "center",
          padding: SPACING + "px",
          borderRadius: SPACING + "px",
          border:"2px solid"+COLUMNBG
        },

        ".btnTasks:hover": {
          background: "#0D1117",
          color: TEXTCOLOR,
        },
      };

      addUtilities(btnUtilities);
    },
  ],
};
