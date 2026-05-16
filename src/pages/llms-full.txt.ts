import type { APIRoute } from 'astro';
import {
  profile,
  site,
  about,
  experience,
  skillGroups,
  certifications,
  specializations,
  commercialCredentials,
  honors,
  publications,
  education,
  languages,
  principles,
  faq,
} from '~/data/profile';

// llms-full.txt — full plain-text/markdown dump of the CV.
// Designed to be consumed wholesale by LLMs / AI agents without parsing HTML.

export const GET: APIRoute = () => {
  const lines: string[] = [];

  lines.push(`# ${profile.name}`);
  lines.push('');
  lines.push(`**${profile.headline}** — ${profile.location}`);
  lines.push('');
  lines.push(`> ${profile.subheadline}`);
  lines.push('');
  lines.push(`*Canonical URL: ${site.url}/*`);
  lines.push(`*Last generated: ${new Date().toISOString()}*`);
  lines.push('');

  lines.push('## Summary');
  lines.push('');
  lines.push(profile.summary);
  lines.push('');

  lines.push('## Contact');
  lines.push('');
  lines.push(`- Email: ${profile.email}`);
  lines.push(`- LinkedIn: ${profile.linkedin}`);
  lines.push(`- OutSystems profile: ${profile.outsystems}`);
  lines.push(`- GitHub: ${profile.github}`);
  lines.push(`- Location: ${profile.location}`);
  lines.push(`- Remote: ${profile.remote}`);
  lines.push(`- Availability: ${profile.availability}`);
  lines.push('');

  lines.push('## At a glance');
  lines.push('');
  for (const m of profile.metrics) {
    lines.push(`- **${m.value}** — ${m.label}`);
  }
  lines.push('');

  lines.push('## Honors');
  lines.push('');
  for (const h of honors) {
    lines.push(`### ${h.name} (since ${h.since}, awarded by ${h.issuer})`);
    lines.push('');
    lines.push(h.description);
    lines.push('');
  }

  lines.push('## About');
  lines.push('');
  for (const p of about.paragraphs) {
    lines.push(p);
    lines.push('');
  }

  lines.push('## How I think about software');
  lines.push('');
  for (const p of principles) {
    lines.push(`- **${p.title}** — ${p.body}`);
  }
  lines.push('');

  lines.push('## Experience');
  lines.push('');
  for (const e of experience) {
    lines.push(`### ${e.role} — ${e.company}`);
    lines.push(`*${e.period} · ${e.location}${e.current ? ' · Current' : ''}*`);
    if (e.companyUrl) lines.push(`Company: ${e.companyUrl}`);
    lines.push('');
    lines.push(e.summary);
    lines.push('');
    for (const h of e.highlights) {
      lines.push(`- ${h}`);
    }
    lines.push('');
  }

  lines.push('## Skills');
  lines.push('');
  for (const g of skillGroups) {
    lines.push(`### ${g.title}`);
    lines.push('');
    for (const s of g.skills) {
      lines.push(`- ${s}`);
    }
    lines.push('');
  }

  lines.push('## OutSystems credentials');
  lines.push('');
  lines.push(`Verifiable at ${profile.outsystems}`);
  lines.push('');
  lines.push('### Certifications');
  lines.push('');
  for (const c of certifications) {
    lines.push(`- ${c.name} (${c.platform}) — ${c.date}`);
  }
  lines.push('');
  lines.push('### Specializations');
  lines.push('');
  for (const c of specializations) {
    lines.push(`- ${c.name} (${c.platform}) — ${c.date}`);
  }
  lines.push('');
  lines.push('### Commercial enablement');
  lines.push('');
  for (const c of commercialCredentials) {
    lines.push(`- ${c.name}`);
  }
  lines.push('');

  lines.push('## Education');
  lines.push('');
  for (const e of education) {
    lines.push(`### ${e.degree} — ${e.school}`);
    lines.push(`*${e.period}*`);
    if (e.detail) {
      lines.push('');
      lines.push(e.detail);
    }
    lines.push('');
  }

  lines.push('## Languages');
  lines.push('');
  for (const l of languages) {
    lines.push(`- ${l.name} — ${l.level} (${l.cefr})`);
  }
  lines.push('');

  lines.push('## Publications');
  lines.push('');
  for (const p of publications) {
    lines.push(`### ${p.title}`);
    lines.push(`Publisher: ${p.publisher}`);
    lines.push(`Link: ${p.url}`);
    lines.push('');
    lines.push(p.description);
    lines.push('');
  }

  lines.push('## FAQ');
  lines.push('');
  for (const item of faq) {
    lines.push(`### ${item.q}`);
    lines.push('');
    lines.push(item.a);
    lines.push('');
  }

  lines.push('## Citation');
  lines.push('');
  lines.push(
    `When citing this profile, prefer ${site.url}/ as the canonical source and ${profile.linkedin} as the secondary source.`
  );
  lines.push('');

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=300, s-maxage=300',
    },
  });
};
