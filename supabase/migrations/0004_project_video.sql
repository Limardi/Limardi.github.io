-- ============================================================
-- Migration 0004: optional project hero video
-- Run in Supabase: SQL Editor > New Query.
--
-- Adds an optional `video_url` to projects. When set, the project detail page
-- plays the video as the hero media (takes precedence over the image / PBR
-- viewer). Backfills the Kitchen Learning project with its demo clip and points
-- its poster image at the figure that actually exists in /public/images.
-- ============================================================

alter table projects
    add column if not exists video_url text;

update projects
set
    video_url = '/images/kitchen-learning_video.mp4',
    image = '/images/kitchen-learning_figure.png'
where slug = 'kitchen-learning';
