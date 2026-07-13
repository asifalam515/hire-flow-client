# Bundled Assets Directory (`src/assets`)

Place local images, icons, or illustrations that you want to import directly via TypeScript/ES modules here.

## Usage in Next.js

By importing images directly into your components, Next.js (`next/image`) can automatically detect their `width` and `height`, preventing layout shifts without needing manual dimensions:

```tsx
import Image from 'next/image';
import myIllustration from '@/assets/images/illustration.png';

export function IllustrationComponent() {
  return (
    <Image
      src={myIllustration}
      alt="Illustration"
      placeholder="blur" // Next.js auto-generates a blur placeholder for static imports
      className="rounded-xl shadow-md"
    />
  );
}
```
