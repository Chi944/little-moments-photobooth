// Bundle tiny character images into the static HTML. No runtime image requests.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
let html = await readFile('index.html', 'utf8');
const marker = '<script id="characterAssets" type="application/json">';
const start = html.indexOf(marker);
if (start !== -1) {
  const from = start + marker.length;
  const end = html.indexOf('</script>', from);
  const assets = JSON.parse(html.slice(from, end));
  await Promise.all(Object.values(assets).map(async asset => {
    const url = new URL(asset.src);
    if (url.protocol !== 'https:' || !['corporate.sanrio.co.jp', 'prod-america-res.popmart.com'].includes(url.hostname)) throw Error('Unexpected artwork source');
    const response = await fetch(url, { signal: AbortSignal.timeout(15000), redirect: 'error' });
    if (!response.ok) throw Error('Artwork download failed: ' + response.status);
    const bytes = Buffer.from(await response.arrayBuffer());
    if (bytes.length > 100000 || bytes.subarray(0, 8).toString('hex') !== '89504e470d0a1a0a') throw Error('Invalid artwork PNG');
    asset.src = 'data:image/png;base64,' + bytes.toString('base64');
  }));
  html = html.slice(0, from) + JSON.stringify(assets) + html.slice(end);
}
await mkdir('public', { recursive: true });
await writeFile('public/index.html', html);
console.log('Static app bundled: ' + Buffer.byteLength(html) + ' bytes; no functions or runtime image services.');
