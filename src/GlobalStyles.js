import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
:root {
    /* color */
    --color-bg: #f3f4f6;
    --color-cyan-500: #06b6d4;
    --color-cyan-600: #0891b2;
    --color-amber-300: #fcd34d;
    --color-amber-400: #fbbf24;
    --color-amber-500: #f59e0b;

    /* gray */
    --color-gray-0: #fff;
    --color-gray-50: #f9fafb;
    --color-gray-100: #f3f4f6;
    --color-gray-200: #e5e7eb;
    --color-gray-300: #d1d5db;
    --color-gray-400: #9ca3af;
    --color-gray-500: #6b7280;
    --color-gray-600: #4b5563;
    --color-gray-700: #374151;
    --color-gray-800: #1f2937;
    --color-gray-900: #111827;

    /* shadow */
    --color-shadow:var(--color-gray-300);
    --box-shadow: 0 0 8px var(--color-shadow);

    --divider:1px solid var(--color-gray-200);

}
*,
*::before,
*::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
body {
    font-family: sans-serif,system-ui, Arial, Avenir, Inter, Helvetica;
    line-height: 1.5;
    font-weight: 400;
    font-size: 1rem;
    color:var(--color-gray-500)
}
h1,h2,h3,h4{
    color: var(--color-gray-900);
}
a,a:visited{
    text-decoration: none;
}

`;
export default GlobalStyle;
