# Build Scripts

Node scripts used to generate the `.pptx` decks in `docs/`. Kept for reproducibility — not run automatically, and `node_modules` is never checked in.

To regenerate a deck:

```bash
npm install pptxgenjs
node prototype-testing-deck.build.js   # -> docs/prototype-testing-deck.pptx
node quarterly-review-deck.build.js    # -> docs/quarterly-review-deck.pptx
```

Both scripts use absolute output paths, so they can be run from anywhere as long as `pptxgenjs` is installed in the working directory.
