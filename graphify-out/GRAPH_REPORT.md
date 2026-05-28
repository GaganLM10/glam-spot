# Graph Report - salon-haven-main  (2026-05-29)

## Corpus Check
- 34 files · ~10,302 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 91 nodes · 114 edges · 13 communities (9 shown, 4 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b171f81b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

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
- [[_COMMUNITY_Community 10|Community 10]]

## God Nodes (most connected - your core abstractions)
1. `Button()` - 12 edges
2. `SALONS_DATA` - 5 edges
3. `CITIES_DATA` - 3 edges
4. `cn()` - 3 edges
5. `buttonVariants` - 2 edges
6. `SERVICES` - 2 edges
7. `CITIES` - 2 edges
8. `OFFER` - 2 edges
9. `SERVICES_DATA` - 2 edges
10. `Getting Started` - 2 edges

## Surprising Connections (you probably didn't know these)
- `Button()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/button.tsx → src/lib/utils.ts

## Communities (13 total, 4 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.12
Nodes (6): STATS, CITIES, OFFER, SERVICES, SECTIONS, SECTIONS

### Community 1 - "Community 1"
Cohesion: 0.19
Nodes (4): Tab, cn(), Button(), buttonVariants

### Community 2 - "Community 2"
Cohesion: 0.14
Nodes (4): STEPS, STATS, TESTIMONIALS, SALONS

### Community 3 - "Community 3"
Cohesion: 0.23
Nodes (6): CITIES_DATA, SALONS_DATA, SERVICES_DATA, CATEGORIES, RATINGS, SORT_OPTIONS

### Community 4 - "Community 4"
Cohesion: 0.2
Nodes (4): geist, metadata, FOOTER_LINKS, NAV_LINKS

### Community 5 - "Community 5"
Cohesion: 0.4
Nodes (4): code:bash (npm run dev), Deploy on Vercel, Getting Started, Learn More

### Community 6 - "Community 6"
Cohesion: 0.5
Nodes (3): City, Offer, Service

## Knowledge Gaps
- **25 isolated node(s):** `eslintConfig`, `nextConfig`, `config`, `geist`, `metadata` (+20 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Button()` connect `Community 1` to `Community 0`, `Community 2`, `Community 3`, `Community 4`?**
  _High betweenness centrality (0.153) - this node is a cross-community bridge._
- **Why does `SALONS_DATA` connect `Community 3` to `Community 1`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `nextConfig`, `config` to the rest of the system?**
  _25 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.12 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.14 - nodes in this community are weakly interconnected._