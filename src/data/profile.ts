// Thin re-export from the YAML content pool.
//
// All editable CV/site content lives in content/cv.yaml.
// This file resolves the "site" variant and re-exports the resulting fields
// under the names the rest of the codebase already uses.

import { resolveVariant } from './cv-loader';

const resolved = resolveVariant('site');

export const site = resolved.site;
export const profile = resolved.profile;
export const about = resolved.about;
export const experience = resolved.experience;
export const selectedClients = resolved.selectedClients;
export const skillGroups = resolved.skillGroups;
export const knowsAbout = resolved.knowsAbout;
export const certifications = resolved.certifications;
export const specializations = resolved.specializations;
export const commercialCredentials = resolved.commercialCredentials;
export const honors = resolved.honors;
export const publications = resolved.publications;
export const talks = resolved.talks;
export const recommendations = resolved.recommendations;
export const education = resolved.education;
export const languages = resolved.languages;
export const principles = resolved.principles;
export const faq = resolved.faq;

export type { Experience, Credential } from './cv-loader';
