# Graph Report - frontend  (2026-05-30)

## Corpus Check
- 39 files · ~13,807 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 113 nodes · 164 edges · 19 communities (13 shown, 6 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `1aed9a6c`
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
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]

## God Nodes (most connected - your core abstractions)
1. `Button()` - 13 edges
2. `useAuthStore` - 11 edges
3. `SALONS_DATA` - 5 edges
4. `salonsApi` - 4 edges
5. `authApi` - 3 edges
6. `bookingsApi` - 3 edges
7. `CITIES_DATA` - 3 edges
8. `cn()` - 3 edges
9. `AuthPage()` - 2 edges
10. `BookingsPage()` - 2 edges

## Surprising Connections (you probably didn't know these)
- `AuthPage()` --calls--> `useAuthStore`  [EXTRACTED]
  src/app/auth/page.tsx → src/lib/auth-store.ts
- `Header()` --calls--> `useAuthStore`  [EXTRACTED]
  src/components/common/Header.tsx → src/lib/auth-store.ts
- `BookingsPage()` --calls--> `useAuthStore`  [EXTRACTED]
  src/app/bookings/page.tsx → src/lib/auth-store.ts
- `SalonDetailPage()` --calls--> `useAuthStore`  [EXTRACTED]
  src/app/salons/[slug]/page.tsx → src/lib/auth-store.ts
- `Button()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/button.tsx → src/lib/utils.ts

## Communities (19 total, 6 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.12
Nodes (6): STATS, CITIES, OFFER, SERVICES, SECTIONS, SECTIONS

### Community 1 - "Community 1"
Cohesion: 0.2
Nodes (5): SALONS, salonsApi, cn(), Button(), buttonVariants

### Community 2 - "Community 2"
Cohesion: 0.23
Nodes (6): CITIES_DATA, SALONS_DATA, SERVICES_DATA, CATEGORIES, RATINGS, SORT_OPTIONS

### Community 3 - "Community 3"
Cohesion: 0.18
Nodes (3): STEPS, STATS, TESTIMONIALS

### Community 4 - "Community 4"
Cohesion: 0.29
Nodes (3): geist, metadata, FOOTER_LINKS

### Community 5 - "Community 5"
Cohesion: 0.33
Nodes (5): Booking, Review, Salon, Service, Staff

### Community 6 - "Community 6"
Cohesion: 0.53
Nodes (4): BookingsPage(), bookingsApi, useAuthStore, SalonDetailPage()

### Community 8 - "Community 8"
Cohesion: 0.4
Nodes (3): apiClient, failedQueue, { user, setAuth }

### Community 9 - "Community 9"
Cohesion: 0.4
Nodes (4): code:bash (npm run dev), Deploy on Vercel, Getting Started, Learn More

### Community 10 - "Community 10"
Cohesion: 0.5
Nodes (3): AuthPage(), Tab, authApi

### Community 11 - "Community 11"
Cohesion: 0.5
Nodes (3): City, Offer, Service

## Knowledge Gaps
- **33 isolated node(s):** `eslintConfig`, `nextConfig`, `config`, `geist`, `metadata` (+28 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Button()` connect `Community 1` to `Community 0`, `Community 2`, `Community 6`, `Community 10`, `Community 12`?**
  _High betweenness centrality (0.100) - this node is a cross-community bridge._
- **Why does `useAuthStore` connect `Community 6` to `Community 8`, `Community 10`, `Community 12`, `Community 7`?**
  _High betweenness centrality (0.052) - this node is a cross-community bridge._
- **Why does `SALONS_DATA` connect `Community 2` to `Community 6`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `nextConfig`, `config` to the rest of the system?**
  _33 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.12 - nodes in this community are weakly interconnected._