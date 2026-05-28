# Graph Report - salon-haven-main  (2026-05-29)

## Corpus Check
- 23 files · ~3,543 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 59 nodes · 69 edges · 11 communities (6 shown, 5 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]

## God Nodes (most connected - your core abstractions)
1. `Button()` - 8 edges
2. `cn()` - 3 edges
3. `buttonVariants` - 2 edges
4. `SERVICES` - 2 edges
5. `CITIES` - 2 edges
6. `OFFER` - 2 edges
7. `Getting Started` - 2 edges
8. `eslintConfig` - 1 edges
9. `nextConfig` - 1 edges
10. `config` - 1 edges

## Surprising Connections (you probably didn't know these)
- `Button()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/button.tsx → src/lib/utils.ts

## Communities (11 total, 5 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.26
Nodes (4): SALONS, cn(), Button(), buttonVariants

### Community 1 - "Community 1"
Cohesion: 0.18
Nodes (3): STEPS, STATS, TESTIMONIALS

### Community 2 - "Community 2"
Cohesion: 0.27
Nodes (3): CITIES, OFFER, SERVICES

### Community 4 - "Community 4"
Cohesion: 0.4
Nodes (4): code:bash (npm run dev), Deploy on Vercel, Getting Started, Learn More

### Community 5 - "Community 5"
Cohesion: 0.5
Nodes (3): City, Offer, Service

## Knowledge Gaps
- **16 isolated node(s):** `eslintConfig`, `nextConfig`, `config`, `geist`, `metadata` (+11 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Button()` connect `Community 0` to `Community 2`, `Community 3`?**
  _High betweenness centrality (0.061) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `nextConfig`, `config` to the rest of the system?**
  _16 weakly-connected nodes found - possible documentation gaps or missing edges._