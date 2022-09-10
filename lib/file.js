// file functions
import { join, pathParse, fmExtract, mdRender, ejsRenderFile, minifyHTML } from '../deps.js';

const { readDir, readTextFile, writeTextFile, remove, mkdir } = Deno;


// clean folder - wipe all files and create if necessary
export async function clean(path) {

  path = join(path);

  try {
    await remove(path, { recursive: true });
  }
  catch (e) {}

  try {
    await mkdir(path, { recursive: true });
    return true;
  }
  catch (e) {}

  return false;

}


// find every nested file in a directory
export async function getFiles(srcPath, buildPath) {

  srcPath = join(srcPath);
  buildPath = join(buildPath);

  return (await recurseDir(srcPath));

  // recurse paths
  async function recurseDir(p) {

    let file = {}, dir = [];

    for await (const f of readDir(p)) {

      const name = f.name;

      if (name.startsWith('_')) continue;

      // process file
      if (f.isFile) {

        const
          src = join(p, name),
          fp = pathParse( src ),
          build = join(
            fp.dir.replace(new RegExp(`^${ srcPath }`), ''),
            fp.name,
            (fp.name === 'index' ? '' : 'index')
          ) + '.html',
          bp = pathParse( build ),
          fileContent = await readTextFile(src),
          fileParse = fmExtract(fileContent);

        let url = bp.dir.replace(/\\+/g, '/');
        url = (url && !url.startsWith('/') ? '/' : '') + url + '/';

        const data = fileParse.attrs;
        data.content = fileParse.body;
        if (fp.ext === '.md') data.content = mdRender(data.content, '/');

        file[url] = {
          src,
          build: join(buildPath, build),
          buildPath: join(buildPath, bp.dir),
          url,
          ext: fp.ext,
          data
        };

      }

      if (f.isDirectory) {
        dir.push( recurseDir( join(p, name) ));
      }

    }

    // load sub-directories
    (await Promise.allSettled(dir)).forEach(f => file = Object.assign(file, f.value));

    return file;

  }

}


// render file content
export async function render(file, templatePath) {

  let out = '';

  // render EJS or copy content
  if (file?.data?.layout) {

    const template = join(templatePath, file.data.layout);
    out = await ejsRenderFile( template, file.data);

  }
  else {

    out = file.data.content;

  }

  // minify HTML
  if (out && file.build.endsWith('.html')) {

    out = minifyHTML(
      out,
      {
        minifyCSS: true,
        minifyJS: true,
      }
    );

  }

  // save to file
  if (out && file.build) {

    try {
      await mkdir( file.buildPath, { recursive: true });
    }
    catch (e) {
      console.log(e);
    }

    try {
      await writeTextFile( file.build, out );
    }
    catch(e) {
      console.log(e);
    }

  }

}
