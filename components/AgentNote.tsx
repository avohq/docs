import React from 'react';
import Link from 'next/link';

const LEAD =
  'Avo is the analytics governance platform for product data that lets you define it consistently, implement it correctly and trust it everywhere.';
const DEFAULT_TASK = 'read and change your tracking plan on a branch';

// One quiet line at the end of every docs page, for people and for AI
// assistants that read the page on someone's behalf. A page can say what an
// agent can do there with `agentTask` in its frontmatter. Keep the wording in
// sync with agentNoteMarkdown in scripts/generate-llms.mjs.
const AgentNote: React.FC<{ task?: string }> = ({ task }) => (
  <p style={{ marginTop: '2.5rem', fontSize: '0.8125rem', opacity: 0.6 }}>
    {LEAD} Using an AI agent? Connect it to the{' '}
    <Link href="/reference/avo-mcp/overview" style={{ textDecoration: 'underline' }}>
      Avo MCP
    </Link>{' '}
    at <code>https://mcp.avo.app/mcp</code> and it can {task || DEFAULT_TASK}.
  </p>
);

export default AgentNote;
