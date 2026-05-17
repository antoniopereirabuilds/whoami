// Variant-aware loader for content/cv.yaml.
//
// Reads the full content pool from YAML at build time, then resolves a
// requested variant into the same shape src/data/profile.ts used to export
// inline. Variant filtering rules:
//
//   - Items can declare `variants: [name, ...]`. Omitted = appears in ALL
//     defined variants (the common case).
//   - String fields (headline, summary, ...) can be either a plain string
//     (applies to all) or a per-variant map keyed by variant name.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const YAML_PATH = path.resolve(__dirname, '..', '..', 'content', 'cv.yaml');

export type VariantName = string;

interface VariantDef {
  label: string;
  description: string;
}

type Variantable<T> = T | Record<string, T>;

interface RawProfile {
  name: string;
  givenName: string;
  familyName: string;
  shortName: string;
  initials: string;
  headline: Variantable<string>;
  summary: Variantable<string>;
  subheadline: string;
  location: string;
  locationDetail: { locality: string; region: string; country: string; countryCode: string };
  nationality: string;
  availability: string;
  availabilityIso: string | Date;
  remote: string;
  email: string;
  linkedin: string;
  github: string;
  outsystems: string;
  photoUrl: string;
  resumeUrl: string;
  quote: string;
}

interface Tagged {
  variants?: VariantName[];
}

interface RawCV {
  variants: Record<string, VariantDef>;
  site: { url: string; name: string; description: string; locale: string };
  profile: RawProfile;
  metrics: (Tagged & { value: string; label: string })[];
  about: (Tagged & { text: string })[];
  experience: (Tagged & {
    company: string;
    companyUrl?: string;
    via?: string;
    client?: string;
    brand?: string;
    clientIndustry?: string;
    clientDescription?: string;
    project?: string;
    projectDescription?: string;
    liveUrl?: string;
    role: string;
    period: string;
    startDate: string | Date;
    endDate?: string | Date;
    location?: string;
    current?: boolean;
    technologies?: string[];
    summary: string;
    highlights: string[];
  })[];
  skillGroups: (Tagged & { title: string; skills: string[] })[];
  knowsAbout: string[];
  certifications: (Tagged & {
    name: string;
    platform: 'ODC' | 'O11';
    date: string;
    isoDate: string | Date;
    highlight?: boolean;
  })[];
  specializations: (Tagged & {
    name: string;
    platform: 'ODC' | 'O11';
    date: string;
    isoDate: string | Date;
    highlight?: boolean;
  })[];
  commercialCredentials: (Tagged & { name: string })[];
  honors: (Tagged & {
    name: string;
    since: string;
    sinceIso: string | Date;
    issuer: string;
    url?: string;
    description: string;
  })[];
  publications: (Tagged & {
    title: string;
    description: string;
    url: string;
    publisher: string;
  })[];
  talks: (Tagged & {
    title: string;
    venue?: string;
    partnership?: string;
    location?: string;
    date: string | Date;
    coSpeaker?: string;
    description?: string;
    url?: string;
  })[];
  recommendations: (Tagged & {
    name: string;
    role?: string;
    company?: string;
    relationship?: string;
    date?: string;
    url?: string;
    text: string;
  })[];
  education: (Tagged & {
    school: string;
    schoolUrl?: string;
    degree: string;
    studyType: string;
    area: string;
    period: string;
    startDate: string | Date;
    endDate: string | Date;
    detail: string;
  })[];
  languages: (Tagged & { name: string; level: string; cefr: string; code: string })[];
  principles: (Tagged & { title: string; body: string })[];
  faq: (Tagged & { q: string; a: string })[];
}

const raw = yaml.load(fs.readFileSync(YAML_PATH, 'utf8')) as RawCV;
const ALL_VARIANTS: VariantName[] = Object.keys(raw.variants);

const isoStr = (v: string | Date | undefined): string => {
  if (!v) return '';
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  return String(v);
};

const inVariant = <T extends Tagged>(item: T, name: VariantName): boolean =>
  (item.variants ?? ALL_VARIANTS).includes(name);

const pick = <T>(value: Variantable<T>, name: VariantName): T => {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) return value as T;
  const map = value as Record<string, T>;
  return map[name] ?? map.site ?? (Object.values(map)[0] as T);
};

const strip = <T extends Tagged>(item: T): Omit<T, 'variants'> => {
  const { variants: _v, ...rest } = item;
  return rest;
};

// Strip trailing parentheticals and "ACRONYM — Full Name" expansions so the
// client wall reads compactly. "IRN — Instituto dos…" → "IRN".
// "EuroBic (now ABANCA Portugal)" → "EuroBic".
const cleanBrand = (client: string): string => {
  let s = client.replace(/\s*\([^)]*\)\s*$/, '');
  const dashIdx = s.indexOf(' — ');
  if (dashIdx > 0) s = s.substring(0, dashIdx);
  return s.trim();
};

// Aggregate unique clients from the full experience pool, grouped by primary
// industry (the part before the first " · "). Used by the Selected Clients wall.
function aggregateClients(experience: RawCV['experience']) {
  const groups = new Map<string, { industry: string; brands: string[] }>();
  const seen = new Set<string>();

  for (const e of experience) {
    if (!e.client || !e.clientIndustry) continue;
    const brand = e.brand ?? cleanBrand(e.client);
    if (seen.has(brand)) continue;
    seen.add(brand);

    const industryRoot = e.clientIndustry.split(' · ')[0].trim();
    const existing = groups.get(industryRoot);
    if (existing) {
      existing.brands.push(brand);
    } else {
      groups.set(industryRoot, { industry: industryRoot, brands: [brand] });
    }
  }

  // Sort: largest groups first, alphabetical for ties
  return Array.from(groups.values()).sort((a, b) => {
    if (b.brands.length !== a.brands.length) return b.brands.length - a.brands.length;
    return a.industry.localeCompare(b.industry);
  });
}

export function resolveVariant(name: VariantName) {
  if (!ALL_VARIANTS.includes(name)) {
    throw new Error(
      `Unknown CV variant "${name}". Defined: ${ALL_VARIANTS.join(', ')}.`,
    );
  }

  const certs = raw.certifications.filter((c) => inVariant(c, name)).map((c) => ({
    ...strip(c),
    isoDate: isoStr(c.isoDate),
  }));

  const specs = raw.specializations.filter((s) => inVariant(s, name)).map((s) => ({
    ...strip(s),
    isoDate: isoStr(s.isoDate),
  }));

  return {
    site: raw.site,
    profile: {
      ...raw.profile,
      headline: pick(raw.profile.headline, name),
      summary: pick(raw.profile.summary, name),
      availabilityIso: isoStr(raw.profile.availabilityIso),
      metrics: raw.metrics.filter((m) => inVariant(m, name)).map(strip),
    },
    about: {
      paragraphs: raw.about.filter((a) => inVariant(a, name)).map((a) => a.text),
    },
    experience: raw.experience
      .filter((e) => inVariant(e, name))
      .map((e) => ({
        ...strip(e),
        startDate: isoStr(e.startDate),
        endDate: e.endDate === undefined ? undefined : isoStr(e.endDate),
      }))
      .sort((a, b) => {
        // Current entries always first
        if (a.current && !b.current) return -1;
        if (!a.current && b.current) return 1;
        // Then by start date, most recent first
        return b.startDate.localeCompare(a.startDate);
      }),
    skillGroups: raw.skillGroups.filter((g) => inVariant(g, name)).map(strip),
    selectedClients: aggregateClients(raw.experience),
    knowsAbout: raw.knowsAbout,
    certifications: certs,
    specializations: specs,
    commercialCredentials: raw.commercialCredentials
      .filter((c) => inVariant(c, name))
      .map(strip),
    honors: raw.honors.filter((h) => inVariant(h, name)).map((h) => ({
      ...strip(h),
      sinceIso: isoStr(h.sinceIso),
    })),
    publications: raw.publications.filter((p) => inVariant(p, name)).map(strip),
    talks: (raw.talks ?? []).filter((t) => inVariant(t, name)).map((t) => ({
      ...strip(t),
      date: isoStr(t.date),
    })),
    recommendations: (raw.recommendations ?? []).filter((r) => inVariant(r, name)).map(strip),
    education: raw.education.filter((e) => inVariant(e, name)).map((e) => ({
      ...strip(e),
      startDate: isoStr(e.startDate),
      endDate: isoStr(e.endDate),
    })),
    languages: raw.languages.filter((l) => inVariant(l, name)).map(strip),
    principles: raw.principles.filter((p) => inVariant(p, name)).map(strip),
    faq: raw.faq.filter((f) => inVariant(f, name)).map(strip),
  };
}

export const variants = raw.variants;
export const variantNames = ALL_VARIANTS;

export type ResolvedCV = ReturnType<typeof resolveVariant>;
export type Experience = ResolvedCV['experience'][number];
export type Credential = ResolvedCV['certifications'][number];
