-- ============================================================
-- Migration 0003: model all contact socials in personal_info
-- Run in Supabase: SQL Editor > New Query.
--
-- Makes personal_info the single source of truth for the header + contact
-- section. Adds `instagram` and backfills `linkedin` / `instagram`, which the
-- UI previously hardcoded in ContactSection.tsx.
-- ============================================================

alter table personal_info
    add column if not exists instagram text;

update personal_info
set
    linkedin = coalesce(linkedin, 'https://www.linkedin.com/in/vincent-limardi'),
    instagram = coalesce(instagram, 'https://www.instagram.com/v.limardi');
