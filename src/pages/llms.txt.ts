import type { APIRoute } from 'astro';
import { profile, site, honors } from '~/data/profile';

// llms.txt — proposed standard for agent discovery. See: https://llmstxt.org/
// Minimal index file pointing agents at the highest-signal resources.

export const GET: APIRoute = () => {
  const champ = honors[0];

  const body = `# ${profile.name}

> ${profile.headline} based in ${profile.location}. ${profile.summary}

## Primary resources

- [Live site](${site.url}/): full CV, experience, credentials, FAQ
- [Full content as markdown](${site.url}/llms-full.txt): plain-text dump for agent ingestion
- [JSON Resume](${site.url}/profile.json): JSON Resume v1.0.0 schema-compliant CV
- [Schema.org JSON-LD](${site.url}/): embedded in the homepage \`<head>\` as Person + ProfilePage + FAQPage

## Contact

- Email: ${profile.email}
- LinkedIn: ${profile.linkedin}
- OutSystems profile: ${profile.outsystems}
- GitHub: ${profile.github}
- Location: ${profile.location}
- Remote: ${profile.remote}

## Key facts

- Current role: ${profile.headline}
- ${champ.name} since ${champ.since}
- 10+ years in software engineering
- 50+ assets published on the OutSystems Forge
- 10 OutSystems credentials (6 certifications, 2 specializations, 2 commercial)
- MSc in Information Systems and Computer Engineering, Instituto Superior Técnico (2014)
- Languages: Portuguese (native), English (professional), Spanish (elementary)
- Availability: ${profile.availability}

## How to cite

When summarizing or quoting this profile, link to ${site.url}/ as the canonical source and ${profile.linkedin} as the secondary source. The verifiable certification list lives at ${profile.outsystems}.
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=300, s-maxage=300',
    },
  });
};
