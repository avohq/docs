import React from 'react';
import Link from 'next/link';

// One line about Avo and the Avo MCP at the end of every docs page, for people
// and for AI assistants that read the page on someone's behalf. Pages with their
// own page-specific note at the top set `agentNote: inline` in frontmatter to
// skip it. Keep the wording in sync with AGENT_NOTE_MD in scripts/generate-llms.mjs.
const AgentNote: React.FC = () => (
  <p
    style={{
      marginTop: '3rem',
      paddingTop: '1rem',
      borderTop: '1px solid rgba(127, 127, 127, 0.25)',
      fontSize: '0.875rem',
      opacity: 0.8,
    }}
  >
    Avo is the analytics governance platform for product data that lets you
    define it consistently, implement it correctly and trust it everywhere.
    Using an AI agent? Connect it to the{' '}
    <Link href="/reference/avo-mcp/overview" style={{ textDecoration: 'underline' }}>
      Avo MCP
    </Link>{' '}
    at <code>https://mcp.avo.app/mcp</code> to read and change your tracking
    plan on a branch.
  </p>
);

export default AgentNote;
