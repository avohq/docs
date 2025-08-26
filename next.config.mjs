import nextra from 'nextra';

const nextConfig = {
  reactStrictMode: true,
  basePath: '/docs',
  async redirects() {
    return redirects;
  },
};

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  defaultShowCopyCode: true,
});

export default withNextra(nextConfig);

const redirects = [
  {
    source: '/',
    destination: '/docs',
    permanent: true,
    basePath: false,
  },
  {
    source: '/quickstart/',
    destination: '/docs',
    permanent: true,
    basePath: false,
  },
  {
    source: '/quickstart',
    destination: '/docs',
    permanent: true,
    basePath: false,
  },
  {
    source: '/datascope/state-of-tracking',
    destination: '/inspector/start-using-inspector',
    permanent: true,
  },
  {
    source: '/datascope/state-of-tracking/android',
    destination: '/implementation/inspector/sdk/android',
    permanent: true,
  },
  {
    source: '/datascope/state-of-tracking/ios',
    destination: '/implementation/inspector/sdk/ios',
    permanent: true,
  },
  {
    source: '/datascope/state-of-tracking/web',
    destination: '/implementation/inspector/sdk/web',
    permanent: true,
  },
  {
    source: '/datascope',
    destination: '/inspector/start-using-inspector',
    permanent: true,
  },
  {
    source: '/datascope/avo-inspector',
    destination: '/inspector/start-using-inspector',
    permanent: true,
  },
  {
    source: '/datascope/avo-inspector/android',
    destination: '/implementation/inspector/sdk/android',
    permanent: true,
  },
  {
    source: '/datascope/avo-inspector/ios',
    destination: '/implementation/inspector/sdk/ios',
    permanent: true,
  },
  {
    source: '/datascope/avo-inspector/web',
    destination: '/implementation/inspector/sdk/web',
    permanent: true,
  },
  {
    source: '/datascope/issue-identifier',
    destination: '/inspector/start-using-inspector',
    permanent: true,
  },
  {
    source: '/datascope/faq',
    destination: '/inspector/faq',
    permanent: true,
  },
  {
    source: '/inspector/sdk',
    destination: '/implementation/avo-inspector-sdk-reference',
    permanent: true,
  },
  {
    source: '/inspector/sdk/:sdk',
    destination: '/implementation/inspector/sdk/:sdk',
    permanent: true,
  },
  {
    source: '/inspector/',
    destination: '/implementation/avo-inspector-sdk-reference',
    permanent: true,
  },
  {
    source: '/inspector',
    destination: '/implementation/avo-inspector-sdk-reference',
    permanent: true,
  },
  {
    source: '/best-practices/avo-functions-alongside-existing-tracking',
    destination: '/implementation/start-using-avo-codegen',
    permanent: true,
  },
  {
    source: '/best-practices/avo-functions-alongside-existing-tracking/',
    destination: '/implementation/start-using-avo-codegen',
    permanent: true,
  },
  {
    source: '/commands',
    destination: '/implementation/cli',
    permanent: true,
  },
  {
    source: '/commands/',
    destination: '/implementation/cli',
    permanent: true,
  },
  {
    source: '/cli',
    destination: '/implementation/cli',
    permanent: true,
  },
  {
    source: '/cli/',
    destination: '/implementation/cli',
    permanent: true,
  },
  {
    source: '/analytics',
    destination: '/data-design/analytics',
    permanent: true,
  },
  {
    source: '/analytics/',
    destination: '/data-design/analytics',
    permanent: true,
  },
  {
    source: '/best-practices/day-to-day-workflow',
    destination: '/data-design/day-to-day-workflow',
    permanent: true,
  },
  {
    source: '/best-practices/day-to-day-workflow/',
    destination: '/data-design/day-to-day-workflow',
    permanent: true,
  },
  {
    source: '/best-practices/defining-descriptive-events-and-properties',
    destination: '/data-design/defining-descriptive-events-and-properties',
    permanent: true,
  },
  {
    source: '/best-practices/defining-descriptive-events-and-properties/',
    destination: '/data-design/defining-descriptive-events-and-properties',
    permanent: true,
  },
  {
    source: '/best-practices/documenting-downstream-dependancies',
    destination: '/data-design/documenting-downstream-dependancies',
    permanent: true,
  },
  {
    source: '/best-practices/documenting-downstream-dependancies/',
    destination: '/data-design/documenting-downstream-dependancies',
    permanent: true,
  },
  {
    source: '/best-practices/documenting-purpose-meetings-in-avo',
    destination: '/data-design/documenting-purpose-meetings-in-avo',
    permanent: true,
  },
  {
    source: '/best-practices/documenting-purpose-meetings-in-avo/',
    destination: '/data-design/documenting-purpose-meetings-in-avo',
    permanent: true,
  },
  {
    source: '/best-practices/multiple-sources-on-avo-branches',
    destination: '/data-design/multiple-sources-on-avo-branches',
    permanent: true,
  },
  {
    source: '/best-practices/multiple-sources-on-avo-branches/',
    destination: '/data-design/multiple-sources-on-avo-branches',
    permanent: true,
  },
  {
    source: '/best-practices/organizing-metrics-and-events',
    destination: '/data-design/organizing-metrics-and-events',
    permanent: true,
  },
  {
    source: '/best-practices/organizing-metrics-and-events/',
    destination: '/data-design/organizing-metrics-and-events',
    permanent: true,
  },
  {
    source: '/data-validation',
    destination: '/implementation/devs-101#data-validations',
    permanent: true,
  },
  {
    source: '/data-validation/',
    destination: '/implementation/devs-101#data-validations',
    permanent: true,
  },
  {
    source: '/devs-101#avo-functions-type-safe-analytics-wrappers/',
    destination: '/devs-101#avo-codegen-type-safe-analytics-wrappers',
    permanent: true,
  },
  {
    source: '/devs-101#avo-functions-type-safe-analytics-wrappers',
    destination: '/devs-101#avo-codegen-type-safe-analytics-wrappers',
    permanent: true,
  },
  {
    source: '/inspector/faq',
    destination: '/faqs/inspector-faq',
    permanent: true,
  },
  {
    source: '/inspector/faq/',
    destination: '/faqs/inspector-faq',
    permanent: true,
  },
  {
    source: '/help/faq',
    destination: '/faqs/yes-you-can-faq',
    permanent: true,
  },
  {
    source: '/help/faq/',
    destination: '/faqs/yes-you-can-faq',
    permanent: true,
  },
  {
    source: '/best-practices/avo-and-git',
    destination: '/implementation/avo-and-git',
    permanent: true,
  },
  {
    source: '/best-practices/avo-and-git/',
    destination: '/implementation/avo-and-git',
    permanent: true,
  },
  {
    source: '/best-practices/unit-tests',
    destination: '/implementation/avo-and-unit-tests',
    permanent: true,
  },
  {
    source: '/best-practices/unit-tests/',
    destination: '/implementation/avo-and-unit-tests',
    permanent: true,
  },
  {
    source: '/regression',
    destination: '/implementation/avo-in-the-ci',
    permanent: true,
  },
  {
    source: '/regression/',
    destination: '/implementation/avo-in-the-ci',
    permanent: true,
  },
  {
    source: '/custom-destinations',
    destination: '/implementation/destinations',
    permanent: true,
  },
  {
    source: '/custom-destinations/',
    destination: '/implementation/destinations',
    permanent: true,
  },
  {
    source: '/inspector/using-inspector-with-avo-functions',
    destination: '/implementation/start-using-inspector-with-avo-codegen',
    permanent: true,
  },
  {
    source: '/inspector/using-inspector-with-avo-functions/',
    destination: '/implementation/start-using-inspector-with-avo-codegen',
    permanent: true,
  },
  {
    source: '/languages',
    destination: '/implementation/supported-programming-languages',
    permanent: true,
  },
  {
    source: '/languages/',
    destination: '/implementation/supported-programming-languages',
    permanent: true,
  },
  {
    source: '/mobile-debuggers',
    destination: '/implementation/start-using-visual-debugger',
    permanent: true,
  },
  {
    source: '/mobile-debuggers/',
    destination: '/implementation/start-using-visual-debugger',
    permanent: true,
  },
  {
    source: '/workspace/publishing',
    destination: '/publishing/publishing/overview',
    permanent: true,
  },
  {
    source: '/workspace/publishing/',
    destination: '/publishing/publishing/overview',
    permanent: true,
  },
  {
    source: '/inspector/sdk/android',
    destination: '/implementation/inspector/sdk/android',
    permanent: true,
  },
  {
    source: '/inspector/sdk/android/',
    destination: '/implementation/inspector/sdk/android',
    permanent: true,
  },
  {
    source: '/inspector/sdk/ios',
    destination: '/implementation/inspector/sdk/ios',
    permanent: true,
  },
  {
    source: '/inspector/sdk/ios/',
    destination: '/implementation/inspector/sdk/ios',
    permanent: true,
  },
  {
    source: '/inspector/sdk/web',
    destination: '/implementation/inspector/sdk/web',
    permanent: true,
  },
  {
    source: '/inspector/sdk/web/',
    destination: '/implementation/inspector/sdk/web',
    permanent: true,
  },
  {
    source: '/data-design/import-tracking-plan/',
    destination: '/publishing/importing',
    permanent: true,
  },
  {
    source: '/data-design/import-tracking-plan',
    destination: '/publishing/importing',
    permanent: true,
  },
  {
    source: '/migrating-to-avo/',
    destination: '/legacy-migrating-to-avo',
    permanent: true,
  },
  {
    source: '/migrating-to-avo',
    destination: '/legacy-migrating-to-avo',
    permanent: true,
  },
  {
    source: '/workspace/tracking-plan/issue-reporter/',
    destination: '/audit/rules',
    permanent: true,
  },
  {
    source: '/workspace/tracking-plan/issue-reporter',
    destination: '/audit/rules',
    permanent: true,
  },
  {
    source:
      '/workspace/tracking-plan/implementation-status#avo-functions-implementation-status/',
    destination:
      '/workspace/tracking-plan/implementation-status#avo-codegen-implementation-status',
    permanent: true,
  },
  {
    source:
      '/workspace/tracking-plan/implementation-status#avo-functions-implementation-status',
    destination:
      '/workspace/tracking-plan/implementation-status#avo-codegen-implementation-status',
    permanent: true,
  },
  {
    source: '/data-design/start-publishing/',
    destination: '/publishing/publishing/overview',
    permanent: true,
  },
  {
    source: '/data-design/start-publishing',
    destination: '/publishing/publishing/overview',
    permanent: true,
  },
  {
    source: '/data-design/define-sources-and-destinations#avo-functions-setup/',
    destination:
      '/data-design/define-sources-and-destinations#avo-codegen-setup',
    permanent: true,
  },
  {
    source: '/data-design/define-sources-and-destinations#avo-functions-setup',
    destination:
      '/data-design/define-sources-and-destinations#avo-codegen-setup',
    permanent: true,
  },
  {
    source: '/workspace/connections/',
    destination: '/data-design/define-sources-and-destinations',
    permanent: true,
  },
  {
    source: '/workspace/connections',
    destination: '/data-design/define-sources-and-destinations',
    permanent: true,
  },
  {
    source: '/workspace/implement/',
    destination: '/implementation/start-using-avo-codegen',
    permanent: true,
  },
  {
    source: '/workspace/implement',
    destination: '/implementation/start-using-avo-codegen',
    permanent: true,
  },
  {
    source: '/implementation/destinations/managed-destinations',
    destination: '/implementation/destinations',
    permanent: true,
  },
  {
    source: '/implementation/destinations/managed-destinations/',
    destination: '/implementation/destinations',
    permanent: true,
  },
  {
    source: '/implementation/start-custom-destination',
    destination: '/implementation/destinations',
    permanent: true,
  },
  {
    source: '/implementation/avo-functions-overview/',
    destination: '/implementation/avo-codegen-overview',
    permanent: true,
  },
  {
    source: '/implementation/avo-functions-overview',
    destination: '/implementation/avo-codegen-overview',
    permanent: true,
  },
  {
    source:
      '/implementation/avo-functions-overview#whats-happening-inside-the-avo-functions/',
    destination:
      '/implementation/avo-codegen-overview#whats-happening-inside-the-avo-codegen',
    permanent: true,
  },
  {
    source:
      '/implementation/avo-functions-overview#whats-happening-inside-the-avo-functions',
    destination:
      '/implementation/avo-codegen-overview#whats-happening-inside-the-avo-codegen',
    permanent: true,
  },
  {
    source: '/implementation/start-using-avo-functions/',
    destination: '/implementation/start-using-avo-codegen',
    permanent: true,
  },
  {
    source: '/implementation/start-using-avo-functions',
    destination: '/implementation/start-using-avo-codegen',
    permanent: true,
  },
  {
    source: '/implementation/start-using-inspector-with-avo-functions/',
    destination: '/implementation/start-using-inspector-with-avo-codegen',
    permanent: true,
  },
  {
    source: '/implementation/start-using-inspector-with-avo-functions',
    destination: '/implementation/start-using-inspector-with-avo-codegen',
    permanent: true,
  },
  {
    source: '/faqs/faq/',
    destination: '/faqs/yes-you-can-faq',
    permanent: true,
  },
  {
    source: '/faqs/faq',
    destination: '/faqs/yes-you-can-faq',
    permanent: true,
  },
  {
    source: '/audit/index/',
    destination: '/audit/overview',
    permanent: true,
  },
  {
    source: '/audit/index',
    destination: '/audit/overview',
    permanent: true,
  },
  {
    source: '/data-design/day-to-day-workflow/',
    destination: '/workflow/overview',
    permanent: true,
  },
  {
    source: '/data-design/day-to-day-workflow',
    destination: '/workflow/overview',
    permanent: true,
  },
  {
    source: '/implementation/property-groups-unfolding/',
    destination: '/implementation/property-bundle-unbundling',
    permanent: true,
  },
  {
    source: '/implementation/property-groups-unfolding',
    destination: '/implementation/property-bundle-unbundling',
    permanent: true,
  },
  {
    source: '/workspace/tracking-plan/events',
    destination: '/data-design/avo-tracking-plan/events',
    permanent: true,
  },
  {
    source: '/workspace/tracking-plan/implementation-status',
    destination: '/data-design/avo-tracking-plan/implementation-status',
    permanent: true,
  },
  {
    source: '/workspace',
    destination: '/data-design/avo-tracking-plan',
    permanent: true,
  },
  {
    source: '/workspace/tracking-plan/metrics',
    destination: '/data-design/avo-tracking-plan/metrics',
    permanent: true,
  },
  {
    source: '/workspace/tracking-plan/properties',
    destination: '/data-design/avo-tracking-plan/properties',
    permanent: true,
  },
  {
    source: '/workspace/integrations',
    destination: '/publishing/integrations',
    permanent: true,
  },
  {
    source: '/workspace/tracking-plan/workbench',
    destination: '/data-design/avo-tracking-plan/workbench',
    permanent: true,
  },
  {
    source: '/data-design/defining-descriptive-events-and-properties',
    destination:
      '/data-design/best-practices/defining-descriptive-events-and-properties',
    permanent: true,
  },
  {
    source: '/data-design/global-namespace',
    destination: '/data-design/best-practices/global-namespace',
    permanent: true,
  },
  {
    source: '/data-design/groups',
    destination: '/data-design/best-practices/groups',
    permanent: true,
  },
  {
    source: '/data-design/naming-conventions',
    destination: '/data-design/best-practices/naming-conventions',
    permanent: true,
  },
  {
    source: '/workspace/approval-workflows',
    destination: '/data-design/branches/approval-workflows',
    permanent: true,
  },
  {
    source: '/workspace/code-changes',
    destination: '/data-design/branches/code-changes',
    permanent: true,
  },
  {
    source: '/workspace/branches',
    destination: '/data-design/branches',
    permanent: true,
  },
  {
    source: '/workspace/authentication',
    destination: '/data-design/collaboration/authentication',
    permanent: true,
  },
  {
    source: '/data-design/start-collaborating',
    destination: '/data-design/collaboration',
    permanent: true,
  },
  {
    source: '/workspace/members',
    destination: '/data-design/collaboration/members',
    permanent: true,
  },
  {
    source: '/workspace/archive-and-restore',
    destination: '/data-design/guides/archive-and-restore',
    permanent: true,
  },
  {
    source: '/data-design/documenting-downstream-dependancies',
    destination: '/data-design/guides/documenting-downstream-dependencies',
    permanent: true,
  },
  {
    source: '/data-design/documenting-purpose-meetings-in-avo',
    destination: '/data-design/guides/documenting-purpose-meetings-in-avo',
    permanent: true,
  },
  {
    source: '/data-design/event-triggers',
    destination: '/data-design/guides/event-triggers',
    permanent: true,
  },
  {
    source: '/workspace/implementation-instructions',
    destination: '/data-design/guides/implementation-instructions',
    permanent: true,
  },
  {
    source: '/data-design/multiple-sources-on-avo-branches',
    destination: '/data-design/guides/multiple-sources-on-avo-branches',
    permanent: true,
  },
  {
    source: '/data-design/name-mapping',
    destination: '/data-design/guides/name-mapping',
    permanent: true,
  },
  {
    source: '/data-design/object-properties',
    destination: '/data-design/guides/object-properties',
    permanent: true,
  },
  {
    source: '/data-design/organizing-metrics-and-events',
    destination: '/data-design/guides/organizing-metrics-and-events',
    permanent: true,
  },
  {
    source: '/data-design/organizing-multi-product-workspaces',
    destination: '/data-design/guides/organizing-multi-product-workspaces',
    permanent: true,
  },
  {
    source: '/data-design/pinned-properties',
    destination: '/data-design/guides/pinned-properties',
    permanent: true,
  },
  {
    source: '/workspace/reset-tracking-plan',
    destination: '/data-design/guides/reset-tracking-plan',
    permanent: true,
  },
  {
    source: '/workspace/tracking-plan',
    destination: '/data-design',
    permanent: true,
  },
  {
    source: '/implementation/avo-and-existing-tracking',
    destination: '/implementation/guides/avo-and-existing-tracking',
    permanent: true,
  },
  {
    source: '/implementation/avo-and-git',
    destination: '/implementation/guides/avo-and-git',
    permanent: true,
  },
  {
    source: '/implementation/avo-and-linters',
    destination: '/implementation/guides/avo-and-linters',
    permanent: true,
  },
  {
    source: '/implementation/avo-and-unit-tests',
    destination: '/implementation/guides/avo-and-unit-tests',
    permanent: true,
  },
  {
    source: '/implementation/avo-in-monorepo',
    destination: '/implementation/guides/avo-in-monorepo',
    permanent: true,
  },
  {
    source: '/implementation/avo-in-the-ci',
    destination: '/implementation/guides/avo-in-the-ci',
    permanent: true,
  },
  {
    source: '/explore-tracking-plan/download-or-copy-avo-file-manually',
    destination: '/implementation/guides/download-or-copy-avo-file-manually',
    permanent: true,
  },
  {
    source: '/implementation/explicit-null-in-codegen',
    destination: '/implementation/guides/explicit-null-in-codegen',
    permanent: true,
  },
  {
    source: '/implementation/property-bundles-unbundling',
    destination: '/implementation/guides/property-bundles-unbundling',
    permanent: true,
  },
  {
    source: '/implementation/start-implementing-tracking-changes',
    destination: '/implementation/guides/start-implementing-tracking-changes',
    permanent: true,
  },
  {
    source: '/implementation/start-using-inspector-with-avo-codegen',
    destination:
      '/implementation/guides/start-using-inspector-with-avo-codegen',
    permanent: true,
  },
  {
    source: '/explore-tracking-plan/start-using-visual-debuggers',
    destination: '/implementation/guides/start-using-visual-debuggers',
    permanent: true,
  },
  {
    source: '/workspace/add-events-from-inspector',
    destination: '/inspector/add-events-from-inspector',
    permanent: true,
  },
  {
    source: '/implementation/avo-inspector-overview',
    destination: '/inspector/avo-inspector-overview',
    permanent: true,
  },
  {
    source: '/workspace/inspector/configuring-inspector-sources',
    destination: '/inspector/configuring-inspector-sources',
    permanent: true,
  },
  {
    source: '/workspace/connect-inspector-to-gtm',
    destination: '/inspector/connect-inspector-to-gtm',
    permanent: true,
  },
  {
    source: '/workspace/connect-inspector-to-posthog',
    destination: '/inspector/connect-inspector-to-posthog',
    permanent: true,
  },
  {
    source: '/workspace/connect-inspector-to-rudderstack',
    destination: '/inspector/connect-inspector-to-rudderstack',
    permanent: true,
  },
  {
    source: '/workspace/connect-inspector-to-segment',
    destination: '/inspector/connect-inspector-to-segment',
    permanent: true,
  },
  {
    source: '/workspace/inspector/inspector-events-view',
    destination: '/inspector/inspector-events-view',
    permanent: true,
  },
  {
    source: '/workspace/inspector/inspector-issues-view',
    destination: '/inspector/inspector-issues-view',
    permanent: true,
  },
  {
    source: '/workspace/inspector',
    destination: '/inspector/inspector-overview',
    permanent: true,
  },
  {
    source: '/workspace/inspector/inspector-slack-alerts',
    destination: '/inspector/inspector-slack-alerts',
    permanent: true,
  },
  {
    source: '/explore-tracking-plan/issue-types-in-inspector',
    destination: '/inspector/issue-types-in-inspector',
    permanent: true,
  },
  {
    source: '/data-design/start-using-inspector',
    destination: '/inspector/start-using-inspector',
    permanent: true,
  },
  {
    source: '/workspace/tracking-plan/exporting',
    destination: '/publishing/exporting',
    permanent: true,
  },
  {
    source: '/workspace/tracking-plan/importing',
    destination: '/publishing/importing',
    permanent: true,
  },
  {
    source: '/publishing/amplitude-govern',
    destination: '/publishing/publishing/amplitude-data',
    permanent: true,
  },
  {
    source: '/publishing/publishing/amplitude-govern',
    destination: '/publishing/publishing/amplitude-data',
    permanent: true,
  },
  {
    source: '/publishing/amplitude-data',
    destination: '/publishing/publishing/amplitude-data',
    permanent: true,
  },
  {
    source: '/publishing/mixpanel-lexicon',
    destination: '/publishing/publishing/mixpanel-lexicon',
    permanent: true,
  },
  {
    source: '/publishing/mparticle-data-master',
    destination: '/publishing/publishing/mparticle-data-master',
    permanent: true,
  },
  {
    source: '/workspace/tracking-plan/publishing',
    destination: '/publishing/publishing/overview',
    permanent: true,
  },
  {
    source: '/publishing/rudderstack',
    destination: '/publishing/publishing/rudderstack',
    permanent: true,
  },
  {
    source: '/publishing/segment-protocols',
    destination: '/publishing/publishing/segment-protocols',
    permanent: true,
  },
  {
    source: '/publishing/snowplow-data-structures',
    destination: '/publishing/publishing/snowplow-data-structures',
    permanent: true,
  },
  {
    source: '/publishing/publishing-use-cases',
    destination: '/publishing/publishing/use-cases',
    permanent: true,
  },
  {
    source: '/publishing/webhook-publishing',
    destination: '/publishing/publishing/webhook-publishing',
    permanent: true,
  },
  {
    source: '/workspace/tracking-plan/webhook-signing',
    destination: '/publishing/webhook-signing',
    permanent: true,
  },
  {
    source: '/implementation/anonymous-user-id',
    destination: '/reference/avo-codegen/anonymous-user-id',
    permanent: true,
  },
  {
    source: '/implementation/custom-loggers',
    destination: '/reference/avo-codegen/custom-loggers',
    permanent: true,
  },
  {
    source: '/implementation/destinations',
    destination: '/reference/avo-codegen/destinations',
    permanent: true,
  },
  {
    source: '/implementation/reference/csharp',
    destination: '/reference/avo-codegen/programming-languages/csharp',
    permanent: true,
  },
  {
    source: '/implementation/supported-programming-languages',
    destination: '/reference/avo-codegen/programming-languages',
    permanent: true,
  },
  {
    source: '/implementation/reference/java',
    destination: '/reference/avo-codegen/programming-languages/java',
    permanent: true,
  },
  {
    source: '/implementation/reference/javascript',
    destination: '/reference/avo-codegen/programming-languages/javascript',
    permanent: true,
  },
  {
    source: '/implementation/reference/kotlin',
    destination: '/reference/avo-codegen/programming-languages/kotlin',
    permanent: true,
  },
  {
    source: '/implementation/reference/objc',
    destination: '/reference/avo-codegen/programming-languages/objc',
    permanent: true,
  },
  {
    source: '/implementation/reference/php',
    destination: '/reference/avo-codegen/programming-languages/php',
    permanent: true,
  },
  {
    source: '/implementation/reference/python',
    destination: '/reference/avo-codegen/programming-languages/python',
    permanent: true,
  },
  {
    source: '/implementation/reference/reasonml',
    destination: '/reference/avo-codegen/programming-languages/reasonml',
    permanent: true,
  },
  {
    source: '/implementation/reference/rescript',
    destination: '/reference/avo-codegen/programming-languages/rescript',
    permanent: true,
  },
  {
    source: '/implementation/reference/ruby',
    destination: '/reference/avo-codegen/programming-languages/ruby',
    permanent: true,
  },
  {
    source: '/implementation/reference/swift',
    destination: '/reference/avo-codegen/programming-languages/swift',
    permanent: true,
  },
  {
    source: '/implementation/reference/typescript',
    destination: '/reference/avo-codegen/programming-languages/typescript',
    permanent: true,
  },
  {
    source: '/implementation/setup-mobile-debugger',
    destination: '/reference/avo-debuggers/mobile',
    permanent: true,
  },
  {
    source: '/implementation/start-using-visual-debugger',
    destination: '/reference/avo-debuggers/overview',
    permanent: true,
  },
  {
    source: '/implementation/start-using-web-debugger',
    destination: '/reference/avo-debuggers/web',
    permanent: true,
  },
  {
    source: '/implementation/inspector/sdk/android',
    destination: '/reference/avo-inspector-sdks/android',
    permanent: true,
  },
  {
    source: '/implementation/inspector/sdk/dart',
    destination: '/reference/avo-inspector-sdks/dart',
    permanent: true,
  },
  {
    source: '/implementation/inspector/sdk/go',
    destination: '/reference/avo-inspector-sdks/go',
    permanent: true,
  },
  {
    source: '/implementation/inspector/sdk/ios',
    destination: '/reference/avo-inspector-sdks/ios',
    permanent: true,
  },
  {
    source: '/implementation/inspector/sdk/java',
    destination: '/reference/avo-inspector-sdks/java',
    permanent: true,
  },
  {
    source: '/implementation/inspector/sdk/node',
    destination: '/reference/avo-inspector-sdks/node',
    permanent: true,
  },
  {
    source: '/implementation/avo-inspector-sdk-reference',
    destination: '/reference/avo-inspector-sdks/overview',
    permanent: true,
  },
  {
    source: '/implementation/inspector/sdk/react-native',
    destination: '/reference/avo-inspector-sdks/react-native',
    permanent: true,
  },
  {
    source: '/implementation/inspector/sdk/web',
    destination: '/reference/avo-inspector-sdks/web',
    permanent: true,
  },
  {
    source: '/public-api/authentication',
    destination: '/reference/public-api/authentication',
    permanent: true,
  },
  {
    source: '/public-api/export-tracking-plan',
    destination: '/reference/public-api/export-tracking-plan',
    permanent: true,
  },
  {
    source: '/public-api/overview',
    destination: '/reference/public-api/overview',
    permanent: true,
  },
  {
    source: '/avo-intelligence/smart-search',
    destination: '/reference/avo-intelligence',
    permanent: true,
  },
  {
    source: '/data-design/documenting-downstream-dependancies',
    destination: '/data-design/documenting-downstream-dependencies',
    permanent: true,
  },
  {
    source: '/inspector/inspector-issues-beta',
    destination: '/inspector/inspector-issues-view',
    permanent: true,
  },
  {
    source: '/faqs/faq-inspector',
    destination: '/faqs/inspector-faq',
    permanent: true,
  },
  {
    source: '/inspector/inspector-overview',
    destination: '/inspector/start-using-inspector',
    permanent: true,
  },
  {
    source: '/inspector/avo-inspector-overview',
    destination: '/reference/avo-inspector-sdks/overview',
    permanent: true,
  },
  {
    source: '/audit/get-tracking-plan-into-avo',
    destination: '/publishing/import/get-tracking-plan-into-avo',
    permanent: true,
  },
  {
    source: '/publishing/importing',
    destination: '/publishing/import/importing',
    permanent: true,
  },
  {
    source: '/data-design/collaboration/members',
    destination: '/workspace-management/members',
    permanent: true,
  },
  {
    source: '/data-design/collaboration/authentication',
    destination: '/workspace-management/authentication',
    permanent: true,
  },
  {
    source: '/data-design/define-sources-and-destinations',
    destination:
      '/data-design/avo-tracking-plan/define-sources-and-destinations',
    permanent: true,
  },
  {
    source: '/data-design/guides/organizing-multi-product-workspaces',
    destination:
      '/data-design/guides/organizing-metrics-and-events',
    permanent: true,
  }
];
