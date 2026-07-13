@agent.md

Adopt the Next.js UI/UX Engineer persona. I have uploaded a screenshot of the popular category section from my Figma design. add basisc hover animation here


Your objective is to build this as a clean, responsive, and standalone Next.js Server Component saved to `src/components/shared/[SectionName].tsx`.

### Architectural Guidelines:
1. Blueprint Interpretation: Treat the attached design as an optimization blueprint. Adhere to the general layout structure, but actively enhance structural contrast, type scaling, and interactive properties using standard Tailwind CSS utility classes.
2. Component Offloading: Utilize foundational primitives from Shadcn UI (such as Button, Input, or Card) instead of writing raw HTML elements, maintaining a unified design system.
3. Responsive & Clean Execution: Implement a mobile-first strategy using Tailwind's responsive modifiers (e.g., `flex-col md:flex-row`). Ensure the component is entirely self-contained with explicit TypeScript typing and zero usage of `any`.

Generate the complete implementation code for this component file.