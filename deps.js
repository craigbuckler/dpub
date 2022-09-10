// standard lib module dependencies
export { parse as parseArg } from 'https://deno.land/std@0.154.0/flags/mod.ts';
export { join, parse as pathParse, extname } from 'https://deno.land/std@0.154.0/path/mod.ts';
export { extract as fmExtract } from 'https://deno.land/std@0.154.0/encoding/front_matter.ts';

// third-party module dependencies
export { renderMarkdown as mdRender } from 'https://deno.land/x/markdown_renderer/mod.ts';
export { renderFileToString as ejsRenderFile } from 'https://deno.land/x/dejs@0.10.3/mod.ts';
export { minifyHTML } from 'https://deno.land/x/minifier/mod.ts';

// code block parsers
import 'https://esm.sh/prismjs@1.28.0/components/prism-markdown?no-check';
import 'https://esm.sh/prismjs@1.28.0/components/prism-yaml?no-check';
import 'https://esm.sh/prismjs@1.28.0/components/prism-ini?no-check';
import 'https://esm.sh/prismjs@1.28.0/components/prism-csv?no-check';
import 'https://esm.sh/prismjs@1.28.0/components/prism-json?no-check';
import 'https://esm.sh/prismjs@1.28.0/components/prism-xml-doc?no-check';
import 'https://esm.sh/prismjs@1.28.0/components/prism-regex?no-check';
import 'https://esm.sh/prismjs@1.28.0/components/prism-css?no-check';
import 'https://esm.sh/prismjs@1.28.0/components/prism-css-extras?no-check';
import 'https://esm.sh/prismjs@1.28.0/components/prism-scss?no-check';
import 'https://esm.sh/prismjs@1.28.0/components/prism-js-templates.js?no-check';
import 'https://esm.sh/prismjs@1.28.0/components/prism-typescript.js?no-check';
import 'https://esm.sh/prismjs@1.28.0/components/prism-bash?no-check';
import 'https://esm.sh/prismjs@1.28.0/components/prism-docker?no-check';
import 'https://esm.sh/prismjs@1.28.0/components/prism-sql?no-check';
import 'https://esm.sh/prismjs@1.28.0/components/prism-mongodb?no-check';
