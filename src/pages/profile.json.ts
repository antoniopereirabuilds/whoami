import type { APIRoute } from 'astro';
import {
  profile,
  site,
  experience,
  education,
  skillGroups,
  certifications,
  specializations,
  commercialCredentials,
  honors,
  publications,
  languages,
  talks,
  recommendations,
  selectedClients,
} from '~/data/profile';

// JSON Resume v1.0.0 — https://jsonresume.org/schema/
// Single canonical machine-readable CV. Linked from <link rel="alternate">
// in <head> and from /llms.txt so agents can discover it cheaply.

export const GET: APIRoute = () => {
  const allCerts = [
    ...certifications.map((c) => ({
      name: `${c.name} (${c.platform})`,
      date: c.isoDate,
      issuer: 'OutSystems',
      url: profile.outsystems,
    })),
    ...specializations.map((c) => ({
      name: `${c.name} (${c.platform}) — Specialization`,
      date: c.isoDate,
      issuer: 'OutSystems',
      url: profile.outsystems,
    })),
    ...commercialCredentials.map((c) => ({
      name: c.name,
      issuer: 'OutSystems',
      url: profile.outsystems,
    })),
  ];

  const resume = {
    $schema: 'https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json',
    basics: {
      name: profile.name,
      label: profile.headline,
      image: `${site.url}/${profile.photoUrl}`,
      email: profile.email,
      url: site.url,
      summary: profile.summary,
      location: {
        city: profile.locationDetail.locality,
        region: profile.locationDetail.region,
        countryCode: profile.locationDetail.countryCode,
      },
      profiles: [
        {
          network: 'LinkedIn',
          username: 'antonioppereira',
          url: profile.linkedin,
        },
        {
          network: 'OutSystems',
          username: 'olcy67xggw',
          url: profile.outsystems,
        },
        {
          network: 'GitHub',
          username: 'antonioppereira',
          url: profile.github,
        },
      ],
    },
    work: experience.map((e) => ({
      name: e.company,
      position: e.role,
      url: e.companyUrl,
      location: e.location,
      startDate: e.startDate,
      endDate: e.endDate,
      summary: e.summary,
      highlights: [...e.highlights],
    })),
    education: education.map((e) => ({
      institution: e.school,
      url: e.schoolUrl,
      area: e.area,
      studyType: e.studyType,
      startDate: e.startDate,
      endDate: e.endDate,
      summary: e.detail || undefined,
    })),
    awards: honors.map((h) => ({
      title: h.name,
      date: h.sinceIso,
      awarder: h.issuer,
      summary: h.description,
    })),
    certificates: allCerts,
    publications: publications.map((p) => ({
      name: p.title,
      publisher: p.publisher,
      url: p.url,
      summary: p.description,
    })),
    skills: skillGroups.map((g) => ({
      name: g.title,
      keywords: [...g.skills],
    })),
    languages: languages.map((l) => ({
      language: l.name,
      fluency: l.level,
    })),
    references: recommendations.map((r) => ({
      name: `${r.name}${r.role || r.company ? ` — ${[r.role, r.company].filter(Boolean).join(', ')}` : ''}`,
      reference: r.text.trim(),
    })),
    meta: {
      canonical: `${site.url}/profile.json`,
      version: '1.0.0',
      lastModified: new Date().toISOString(),
      // Non-standard JSON Resume extensions for AI agents and richer parsers
      x_selectedClients: selectedClients,
      x_talks: talks.map((t) => ({
        title: t.title,
        date: t.date,
        venue: t.venue,
        partnership: t.partnership,
        location: t.location,
        coSpeaker: t.coSpeaker,
        description: t.description,
        url: t.url,
      })),
    },
  };

  return new Response(JSON.stringify(resume, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=300, s-maxage=300',
    },
  });
};
