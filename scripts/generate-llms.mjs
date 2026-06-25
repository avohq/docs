/**
 * Generates the AI-consumable surface for the Avo docs (GEO):
 *
 *   public/<slug>.md      one clean-markdown variant per docs page
 *   public/llms.txt       categorized index of the .md pages (llmstxt.org format)
 *   public/llms-full.txt  every page's markdown concatenated into one file
 *
 * Everything is derived from the existing MDX source in pages/ and the Nextra
 * _meta.js navigation files, so there is no second copy to maintain and no
 * content drift. With basePath '/docs', a file at public/foo/bar.md is served
 * at /docs/foo/bar.md — i.e. the page URL with a .md suffix.
 *
 * Run via `yarn generate:llms` (also runs automatically before `next build`).
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PAGES_DIR = path.join(ROOT, 'pages');
const PUBLIC_DIR = path.join(ROOT, 'public');

const SITE = 'https://www.avo.app';
const DOCS_BASE = `${SITE}/docs`; // basePath in next.config.mjs

// Official Avo description, kept in sync with the canonical avo.app/llms.txt.
const SITE_DESCRIPTION =
  'Avo is the data governance platform that keeps every analytics event defined consistently, implemented reliably, and trusted across every team. Built for both humans and AI agents, Avo lets product, data, and engineering teams design a single source of truth tracking plan (events, properties, metrics, journeys), audit it for quality and naming consistency, generate type-safe tracking code, monitor live data quality, and publish definitions to tools like Amplitude, Mixpanel, and Segment. Through the Avo MCP, agents like Claude, Codex, and Cursor can search the tracking plan, design tracking from a PRD or Figma onto a branch using your existing patterns and rules, generate the code snippets and instructions so developers and their agents implement correctly without opening their tracking plan in another tool, and query product data accurately because Avo knows your metric definitions.';

// ---------------------------------------------------------------------------
// Curated index (llms.txt)
// ---------------------------------------------------------------------------
//
// llms.txt is a CURATED map to the canonical page for each concept — this is
// what AI answer engines read first, so it should be concise (the llmstxt.org
// convention, and what avo.app/llms.txt already does). It is NOT every page:
// every page still gets a .md file and is included in llms-full.txt, so full
// coverage is preserved.
//
// To add/remove a page from the index, edit the slug lists below. A slug is the
// page URL minus the /docs prefix and any .md suffix (the homepage is ''). The
// build validates every slug exists and warns on any that don't, so a renamed
// page surfaces as a warning instead of a dead link.
const CURATED_SECTIONS = [
  { title: 'Getting started', slugs: ['', 'faqs/yes-you-can-faq'] },
  {
    title: 'Adopting Avo with AI agents',
    slugs: [
      'adopting-avo-with-ai-agents',
      'adopting-avo-with-ai-agents/setting-up-a-tracking-plan',
      'adopting-avo-with-ai-agents/governing-ai-generated-analytics',
    ],
  },
  {
    title: 'Avo MCP',
    slugs: ['reference/avo-mcp/overview', 'reference/avo-mcp/tools'],
  },
  {
    title: 'The tracking plan',
    slugs: [
      'data-design',
      'data-design/start-data-design',
      'data-design/avo-tracking-plan',
      'data-design/avo-tracking-plan/events',
      'data-design/avo-tracking-plan/properties',
      'data-design/avo-tracking-plan/metrics',
      'data-design/avo-tracking-plan/journeys',
      'data-design/branches',
    ],
  },
  { title: 'Workflow', slugs: ['workflow/overview'] },
  {
    title: 'Quality and governance',
    slugs: [
      'audit/overview',
      'audit/quickstart',
      'audit/rules',
      'data-design/best-practices/naming-conventions',
    ],
  },
  {
    title: 'Observability',
    slugs: [
      'inspector/start-using-inspector',
      'inspector/inspector-installation-overview',
      'reference/avo-inspector-sdks/overview',
    ],
  },
  {
    title: 'Type-safe implementation',
    slugs: [
      'implementation/avo-codegen-overview',
      'implementation/start-using-avo-codegen',
      'implementation/cli',
      'reference/avo-codegen/programming-languages',
    ],
  },
  {
    title: 'Publishing',
    slugs: [
      'publishing/publishing/overview',
      'publishing/exporting',
      'publishing/import/get-tracking-plan-into-avo',
    ],
  },
  {
    title: 'Reference',
    slugs: [
      'reference/public-api/overview',
      'reference/avo-debuggers/overview',
      'reference/avo-intelligence',
    ],
  },
];

// ---------------------------------------------------------------------------
// File discovery
// ---------------------------------------------------------------------------

/** Walk pages/ and return every routable .md/.mdx file (skips _meta, _app, api/...). */
function findContentFiles(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'api') continue;
      findContentFiles(full, acc);
    } else if (/\.mdx?$/.test(entry.name) && !entry.name.startsWith('_')) {
      acc.push(full);
    }
  }
  return acc;
}

/** pages/foo/bar.mdx -> "foo/bar"; pages/foo/index.mdx -> "foo"; pages/index.mdx -> "". */
function fileToSlug(file) {
  const rel = path.relative(PAGES_DIR, file).replace(/\\/g, '/');
  return rel.replace(/\.mdx?$/, '').replace(/\/index$/, '').replace(/^index$/, '');
}

/** Page URL (no .md) for a slug. */
function slugToPageUrl(slug) {
  return slug === '' ? DOCS_BASE : `${DOCS_BASE}/${slug}`;
}

/** Companion .md URL for a slug. */
function slugToMdUrl(slug) {
  return slug === '' ? `${DOCS_BASE}/index.md` : `${DOCS_BASE}/${slug}.md`;
}

/** public/ path the .md is written to. */
function slugToMdFile(slug) {
  return path.join(PUBLIC_DIR, slug === '' ? 'index.md' : `${slug}.md`);
}

// ---------------------------------------------------------------------------
// Frontmatter (minimal YAML — only need title/description)
// ---------------------------------------------------------------------------

function parseFrontmatter(src) {
  if (!src.startsWith('---\n') && !src.startsWith('---\r\n')) {
    return { data: {}, body: src };
  }
  const end = src.indexOf('\n---', 3);
  if (end === -1) return { data: {}, body: src };
  const raw = src.slice(src.indexOf('\n') + 1, end);
  const body = src.slice(src.indexOf('\n', end + 1) + 1);
  const data = {};
  for (const line of raw.split('\n')) {
    const m = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!m) continue;
    let v = m[2].trim();
    if (
      (v.startsWith("'") && v.endsWith("'")) ||
      (v.startsWith('"') && v.endsWith('"'))
    ) {
      v = v.slice(1, -1);
    }
    data[m[1]] = v;
  }
  return { data, body };
}

// ---------------------------------------------------------------------------
// JSX attribute extraction
// ---------------------------------------------------------------------------

/** Read an attr from a JSX tag string, handling foo="x", foo='x', foo={'x'}, foo={"x"}. */
function getAttr(tag, name) {
  // `(?<![\w-])` anchors the attribute name on a word boundary so e.g.
  // getAttr(tag, 'src') doesn't accidentally match `data-src="…"`.
  const patterns = [
    new RegExp(`(?<![\\w-])${name}=\\{\\s*['"\`]([^'"\`]*)['"\`]\\s*\\}`),
    new RegExp(`(?<![\\w-])${name}="([^"]*)"`),
    new RegExp(`(?<![\\w-])${name}='([^']*)'`),
  ];
  for (const re of patterns) {
    const m = tag.match(re);
    if (m) return m[1];
  }
  return undefined;
}

// ---------------------------------------------------------------------------
// Link rewriting
// ---------------------------------------------------------------------------

/**
 * Rewrite a single link/asset target to an absolute URL.
 * Internal doc routes that resolve to a known page become .md links.
 */
function rewriteTarget(target, slugSet) {
  const t = target.trim();
  if (/^(https?:|mailto:|tel:|#)/.test(t)) return t; // external / anchor
  if (t.startsWith('/docs/')) return `${SITE}${t}`; // already-absolute asset (images, etc.)
  if (!t.startsWith('/')) return t; // relative — leave untouched

  const hashIdx = t.indexOf('#');
  const pathPart = hashIdx === -1 ? t : t.slice(0, hashIdx);
  const hash = hashIdx === -1 ? '' : t.slice(hashIdx);
  const slug = pathPart.replace(/^\//, '').replace(/\/$/, '');

  if (slugSet.has(slug)) return `${slugToMdUrl(slug)}${hash}`;
  // Unknown internal path (e.g. a route that only exists via a redirect):
  // keep it as an absolute HTML link rather than inventing a broken .md URL.
  return `${DOCS_BASE}${pathPart}${hash}`;
}

function rewriteMarkdownLinks(text, slugSet) {
  return text.replace(/(\]\()([^)\s]+)(\))/g, (_, open, target, close) => {
    return `${open}${rewriteTarget(target, slugSet)}${close}`;
  });
}

// ---------------------------------------------------------------------------
// MDX -> clean Markdown
// ---------------------------------------------------------------------------

function imageToMarkdown(tag) {
  const src = getAttr(tag, 'src');
  if (!src) return '';
  const alt = getAttr(tag, 'alt') || '';
  const url = src.startsWith('/') ? `${SITE}${src}` : src;
  return `![${alt}](${url})`;
}

function transformTextSegment(text, slugSet) {
  let out = text;

  // Strip ESM import/export statements (these only appear outside code fences).
  // Match only ESM-shaped imports (`import x from '...'` / `import '...'`) so a
  // prose line that merely starts with the word "import" isn't dropped.
  out = out.replace(/^[ \t]*import\s+[^\n]*\bfrom\b\s*['"][^\n]*\n?/gm, '');
  out = out.replace(/^[ \t]*import\s+['"][^\n]*\n?/gm, '');
  out = out.replace(/^[ \t]*export\s+(default\s+)?[^\n]*\n?/gm, '');

  // <Callout ...>inner</Callout> -> blockquote (optionally led by its emoji).
  out = out.replace(/<Callout([^>]*)>([\s\S]*?)<\/Callout>/g, (_, attrs, inner) => {
    const emoji = getAttr(attrs, 'emoji');
    const lines = inner.trim().split('\n');
    const quoted = lines
      .map((l, i) => `> ${i === 0 && emoji ? `${emoji} ` : ''}${l.trim()}`)
      .join('\n');
    return `\n${quoted}\n`;
  });

  // <PageLink .../> -> a markdown link bullet (title + optional description).
  const pageLink = (tag) => {
    const title = getAttr(tag, 'title') || 'Read more';
    const href = getAttr(tag, 'href') || '';
    const description = getAttr(tag, 'description');
    const url = rewriteTarget(href, slugSet);
    return `- [${title}](${url})${description ? `: ${description}` : ''}`;
  };
  // Anchor to line start so the bullet is emitted flush-left rather than
  // inheriting the indentation the tag had inside a <TwoCol> wrapper.
  out = out.replace(/^[ \t]*<PageLink\b[^>]*?\/>/gm, (tag) => pageLink(tag));
  out = out.replace(/^[ \t]*<PageLink\b[\s\S]*?<\/PageLink>/gm, (tag) => pageLink(tag));

  // Images: <Image .../> and <img .../> -> ![alt](url)
  out = out.replace(/^[ \t]*<(?:Image|img)\b[^>]*?\/?>/gm, (tag) => imageToMarkdown(tag));
  out = out.replace(/<(?:Image|img)\b[^>]*?\/?>/g, (tag) => imageToMarkdown(tag));

  // <video ...>...</video> (or self-closing) -> a link to the video source.
  out = out.replace(/<video\b([^>]*)>([\s\S]*?)<\/video>/g, (_, attrs, inner) => {
    const src = getAttr(attrs, 'src') || getAttr(inner, 'src');
    return src ? `[▶ Watch video](${src.startsWith('/') ? SITE + src : src})` : '';
  });
  out = out.replace(/<video\b[^>]*\/>/g, (tag) => {
    const src = getAttr(tag, 'src');
    return src ? `[▶ Watch video](${src.startsWith('/') ? SITE + src : src})` : '';
  });

  // <details>/<summary> -> bold lead line, keep the body. Strip any inner
  // emphasis tags first so we don't end up with doubled-up `****`.
  out = out.replace(/<summary>([\s\S]*?)<\/summary>/g, (_, s) => {
    const inner = s.replace(/<\/?(?:strong|b|em|i)>/g, '').trim();
    return `**${inner}**\n`;
  });
  out = out.replace(/<\/?details\b[^>]*>/g, '');

  // Inline emphasis tags -> markdown.
  out = out.replace(/<strong>([\s\S]*?)<\/strong>/g, (_, s) => `**${s}**`);
  out = out.replace(/<b>([\s\S]*?)<\/b>/g, (_, s) => `**${s}**`);
  out = out.replace(/<(?:em|i)>([\s\S]*?)<\/(?:em|i)>/g, (_, s) => `*${s}*`);

  // Line breaks.
  out = out.replace(/<br\s*\/?>/g, '\n');

  // Unwrap layout-only wrappers (keep their children).
  out = out.replace(/<\/?(?:TwoCol|Zoom|center|div|p)\b[^>]*>/g, '');

  // Rewrite internal links to .md companions.
  out = rewriteMarkdownLinks(out, slugSet);

  // Tidy whitespace.
  out = out.replace(/[ \t]+$/gm, '');
  out = out.replace(/\n{3,}/g, '\n\n');

  return out;
}

/** Convert an MDX body to clean markdown, leaving fenced code blocks untouched. */
function mdxBodyToMarkdown(body, slugSet) {
  const lines = body.split('\n');
  const segments = [];
  let buf = [];
  let inFence = false;
  let fence = '';

  const flush = (type) => {
    if (buf.length) segments.push({ type, content: buf.join('\n') });
    buf = [];
  };

  for (const line of lines) {
    const m = line.match(/^(\s*)(```+|~~~+)/);
    if (!inFence && m) {
      flush('text');
      inFence = true;
      fence = m[2][0];
      buf.push(line);
    } else if (inFence && line.trim().startsWith(fence)) {
      buf.push(line);
      flush('code');
      inFence = false;
    } else {
      buf.push(line);
    }
  }
  flush(inFence ? 'code' : 'text');

  return segments
    .map((s) => (s.type === 'code' ? s.content : transformTextSegment(s.content, slugSet)))
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

// ---------------------------------------------------------------------------
// Titles
// ---------------------------------------------------------------------------

function deriveTitle(data, body) {
  if (data.title) return data.title;
  const m = body.match(/^#\s+(.+)$/m);
  return m ? m[1].trim() : '';
}

// ---------------------------------------------------------------------------
// Navigation (_meta.js) — drives the llms.txt ordering and categories
// ---------------------------------------------------------------------------

// The _meta.js files are plain data modules (`export default { ... }`) with no
// JSX, imports, or functions. Parse the object literal directly instead of
// dynamic-importing them, which avoids Node's MODULE_TYPELESS_PACKAGE_JSON
// warning on every build.
function loadMeta(dir) {
  const metaPath = path.join(dir, '_meta.js');
  if (!fs.existsSync(metaPath)) return null;
  const src = fs.readFileSync(metaPath, 'utf8');
  const objText = src
    .replace(/^[\s\S]*?export\s+default\s*/, '')
    .replace(/;?\s*$/, '');
  try {
    return new Function(`return (${objText});`)();
  } catch (err) {
    console.warn(`[generate-llms] could not parse ${metaPath}: ${err.message}`);
    return null;
  }
}

/** Should a _meta.js entry be skipped from the .md listing? */
function isListableEntry(value) {
  if (value && typeof value === 'object') {
    if (value.display === 'hidden') return false;
    if (value.type === 'separator') return false;
    if (value.href) return false; // external / nav-only link
  }
  return true;
}

function entryLabel(key, value) {
  if (typeof value === 'string') return value;
  if (value && typeof value === 'object' && value.title) return value.title;
  return null;
}

/**
 * Build an ordered list of pages under a directory, following _meta.js order
 * and recursing into subdirectories. Returns [{ slug, navLabel }].
 */
async function collectPages(dir) {
  const result = [];
  const meta = loadMeta(dir);
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  const dirSet = new Set(entries.filter((e) => e.isDirectory()).map((e) => e.name));
  const fileBase = new Set(
    entries
      .filter((e) => e.isFile() && /\.mdx?$/.test(e.name) && !e.name.startsWith('_'))
      .map((e) => e.name.replace(/\.mdx?$/, '')),
  );

  const orderedKeys = [];
  const seen = new Set();
  if (meta) {
    for (const key of Object.keys(meta)) {
      orderedKeys.push(key);
      seen.add(key);
    }
  }
  // Append anything on disk that _meta.js didn't mention (alphabetical).
  for (const name of [...dirSet, ...fileBase].sort()) {
    if (!seen.has(name)) orderedKeys.push(name);
  }

  for (const key of orderedKeys) {
    const value = meta ? meta[key] : undefined;
    if (meta && key in meta && !isListableEntry(value)) continue;
    const label = entryLabel(key, value);

    if (fileBase.has(key)) {
      const file = fs.existsSync(path.join(dir, `${key}.mdx`))
        ? path.join(dir, `${key}.mdx`)
        : path.join(dir, `${key}.md`);
      result.push({ slug: fileToSlug(file), navLabel: label });
    } else if (dirSet.has(key)) {
      const child = await collectPages(path.join(dir, key));
      result.push(...child);
    }
  }
  return result;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const files = findContentFiles(PAGES_DIR);
  const slugSet = new Set(files.map(fileToSlug));

  // Convert every page once; keep results keyed by slug.
  const pages = new Map(); // slug -> { title, description, markdown }
  for (const file of files) {
    const src = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
    const { data, body } = parseFrontmatter(src);
    const markdown = mdxBodyToMarkdown(body, slugSet);
    pages.set(fileToSlug(file), {
      title: deriveTitle(data, body),
      description: data.description || '',
      markdown,
    });
  }

  // 1. Write one .md per page.
  let written = 0;
  for (const [slug, page] of pages) {
    const dest = slugToMdFile(slug);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, `${page.markdown}\n`, 'utf8');
    written += 1;
  }

  // 2. Build the curated llms.txt from CURATED_SECTIONS (see notes there).
  const llms = [
    `# Avo`,
    ``,
    `> ${SITE_DESCRIPTION}`,
    ``,
    `Every documentation page is also available as clean Markdown: append \`.md\` to any page URL (e.g. ${DOCS_BASE}/data-design/avo-tracking-plan/events.md). For the entire documentation concatenated into one file, see ${DOCS_BASE}/llms-full.txt.`,
    ``,
    `## Documentation`,
    ``,
  ];

  const missing = [];
  for (const section of CURATED_SECTIONS) {
    const lines = [];
    for (const slug of section.slugs) {
      const page = pages.get(slug);
      if (!page) {
        missing.push(slug);
        continue;
      }
      const label = page.title || slug || 'Get Started';
      const desc = page.description ? `: ${page.description}` : '';
      lines.push(`- [${label}](${slugToMdUrl(slug)})${desc}`);
    }
    if (lines.length) {
      llms.push(`### ${section.title}`, ``, ...lines, ``);
    }
  }
  if (missing.length) {
    console.warn(
      `[generate-llms] WARNING: ${missing.length} curated slug(s) in CURATED_SECTIONS no longer exist and were skipped:\n  ${missing.join('\n  ')}`,
    );
  }
  fs.writeFileSync(path.join(PUBLIC_DIR, 'llms.txt'), `${llms.join('\n').trim()}\n`, 'utf8');

  // 3. Build llms-full.txt: every page concatenated, in navigation order.
  const navOrder = await collectPages(PAGES_DIR);
  const orderedSlugs = [];
  const placed = new Set();
  for (const { slug } of navOrder) {
    if (pages.has(slug) && !placed.has(slug)) {
      orderedSlugs.push(slug);
      placed.add(slug);
    }
  }
  for (const slug of pages.keys()) {
    if (!placed.has(slug)) orderedSlugs.push(slug);
  }

  const full = [
    `# Avo Documentation`,
    ``,
    `> ${SITE_DESCRIPTION}`,
    ``,
    `This file concatenates the full text of every Avo documentation page.`,
    ``,
  ];
  for (const slug of orderedSlugs) {
    const page = pages.get(slug);
    full.push(
      `---`,
      ``,
      `Source: ${slugToMdUrl(slug)}`,
      ``,
      page.markdown,
      ``,
    );
  }
  fs.writeFileSync(
    path.join(PUBLIC_DIR, 'llms-full.txt'),
    `${full.join('\n').trim()}\n`,
    'utf8',
  );

  console.log(
    `[generate-llms] wrote ${written} .md pages + llms.txt + llms-full.txt to public/`,
  );
}

main().catch((err) => {
  console.error('[generate-llms] failed:', err);
  process.exit(1);
});
