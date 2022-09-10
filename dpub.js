// third-party dependencies
import { parseArg, join } from './deps.js';

// project dependencies
import { log } from './lib/log.js';
import { clean, getFiles, render } from './lib/file.js';

// command-line arguments
const
  { exit, args, permissions, watchFs } = Deno,

  arg = parseArg(
    args,
    {
      boolean: ['watch', 'production'],
      string: ['src', 'build'],
      default: {
        src: './src',
        layout: '_layout',
        build: './build'
      }
    }
  );

// check permissions
const
  canRead = (await permissions.query({ name: 'read', path: arg.src })).state === 'granted',
  canWrite = (await permissions.query({ name: 'write', path: arg.build })).state === 'granted';

if (!canRead) {
  log('error', `add --allow-read=${ arg.src } to command to grant read permission`);
}

if (!canWrite) {
  log('error', `add --allow-write=${ arg.build } to command to grant write permission`);
}

if (!canRead || !canWrite) exit(1);

// first render
run();

// watch for changes
if (arg.watch) {

  let debounce;

  log(null, `watching for file changes at ${ arg.src }`);

  // watch for file changes
  for await (const e of watchFs(join(arg.src))) {

    debounce = debounce || setTimeout(() => {
      debounce = null;
      run();
    }, 300);

  }

}


// render site
async function run() {

  performance.mark('render:start');

  // clean build folder
  if (!(await clean( arg.build ))) {
    log('error', `cannot write to ${ arg.build }`);
    exit(1);
  }

  // get input file data
  const file = await getFiles( arg.src, arg.build );

  // render
  const processRender = [], template = join(arg.src, arg.layout);

  for (const f in file) {
    processRender.push(render(file[f], template));
  }

  await Promise.allSettled(processRender);

  // output performance log
  performance.mark('render:end');
  performance.measure('render', 'render:start', 'render:end');

  log(null, `> rendered site in ${ performance.getEntriesByType('measure')[0].duration }ms`);

  performance.clearMarks('render:start');
  performance.clearMarks('render:end');
  performance.clearMeasures('render');

}
