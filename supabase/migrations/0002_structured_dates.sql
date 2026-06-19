-- ============================================================
-- Migration 0002: structured dates for reliable ordering
-- Run in Supabase: SQL Editor > New Query.
--
-- Adds machine-sortable start/end dates to experience & organizations so the
-- app can order entries reverse-chronologically without parsing the free-text
-- `period` label. `end_date IS NULL` means "Present / ongoing". The `period`
-- column stays as the human-readable display string.
-- ============================================================

alter table experience
    add column if not exists start_date date,
    add column if not exists end_date date;

alter table organizations
    add column if not exists start_date date,
    add column if not exists end_date date;

-- Backfill from the existing seed rows (matched by slug). end_date NULL = present.
update experience set start_date = date '2023-07-01', end_date = date '2023-09-30' where slug = 'icode-intern';
update experience set start_date = date '2024-10-01', end_date = null            where slug = 'research-assistant';
update experience set start_date = date '2024-06-01', end_date = date '2024-07-31' where slug = 'teaching-assistant';

update organizations set start_date = date '2024-03-01', end_date = null            where slug = 'eecs-gsa';
update organizations set start_date = date '2024-08-01', end_date = null            where slug = 'ppi-hsinchu';
update organizations set start_date = date '2024-06-01', end_date = date '2024-07-31' where slug = 'nthu-ibp';

-- Helpful for ordering once the table grows.
create index if not exists experience_order_idx    on experience (end_date desc nulls first, start_date desc);
create index if not exists organizations_order_idx on organizations (end_date desc nulls first, start_date desc);
