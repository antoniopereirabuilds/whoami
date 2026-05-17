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
  talks,
  recommendations,
  selectedClients,
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

  lines.push('## Selected clients (by industry)');
  lines.push('');
  for (const g of selectedClients) {
    lines.push(`- **${g.industry}** — ${g.brands.join(' · ')}`);
  }
  lines.push('');

  lines.push('## Experience');
  lines.push('');
  for (const e of experience) {
    const header = e.client ? `${e.role} · ${e.company} · ${e.client}` : `${e.role} — ${e.company}`;
    lines.push(`### ${header}`);
    lines.push(`*${e.period}${e.location ? ` · ${e.location}` : ''}${e.current ? ' · Current' : ''}*`);
    if (e.companyUrl) lines.push(`Company: ${e.companyUrl}`);
    if (e.via) lines.push(`Via: ${e.via}`);
    if (e.clientIndustry) lines.push(`Client industry: ${e.clientIndustry}`);
    if (e.clientDescription) lines.push(`Client: ${e.clientDescription}`);
    if (e.project) lines.push(`Project: ${e.project}`);
    if (e.projectDescription) lines.push(`Project description: ${e.projectDescription}`);
    if (e.technologies && e.technologies.length > 0) {
      lines.push(`Technologies: ${e.technologies.join(', ')}`);
    }
    if (e.liveUrl) lines.push(`Live result: ${e.liveUrl}`);
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

  lines.push('## Talks & speaking');
  lines.push('');
  if (talks.length === 0) {
    lines.push('_None yet._');
    lines.push('');
  } else {
    for (const t of talks) {
      const dateLabel = new Date(t.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
      lines.push(`### ${t.title}`);
      lines.push(`*${dateLabel}${t.venue ? ` · ${t.venue}` : ''}${t.partnership ? ` · ${t.partnership}` : ''}${t.location ? ` · ${t.location}` : ''}*`);
      if (t.coSpeaker) lines.push(`Co-speaker: ${t.coSpeaker}`);
      if (t.url) lines.push(`Link: ${t.url}`);
      if (t.description) {
        lines.push('');
        lines.push(t.description);
      }
      lines.push('');
    }
  }

  lines.push('## Recommendations');
  lines.push('');
  if (recommendations.length === 0) {
    lines.push('_None on file._');
    lines.push('');
  } else {
    lines.push(`${recommendations.length} LinkedIn recommendations on file.`);
    lines.push('');
    for (const r of recommendations) {
      const dateLabel = r.date
        ? new Date(r.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
        : null;
      const header = [r.name, r.role && r.company ? `${r.role} at ${r.company}` : r.role || r.company]
        .filter(Boolean)
        .join(' — ');
      lines.push(`### ${header}`);
      if (r.relationship || dateLabel) {
        lines.push(`*${[r.relationship, dateLabel].filter(Boolean).join(' · ')}*`);
      }
      lines.push('');
      lines.push(r.text.trim());
      lines.push('');
    }
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
