-- Run this entire file in your Supabase SQL Editor (supabase.com → your project → SQL Editor)

-- ============================================================
-- TABLES
-- ============================================================

create table if not exists posts (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  title text not null,
  subtitle text not null default '',
  excerpt text not null default '',
  category text not null default '',
  tags text[] not null default '{}',
  read_time text not null default '5 min read',
  content jsonb not null default '[]',
  is_published boolean not null default true,
  published_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists post_views (
  id bigint generated always as identity primary key,
  post_slug text not null,
  viewed_at timestamptz not null default now()
);

create table if not exists post_reactions (
  id bigint generated always as identity primary key,
  post_slug text not null,
  reaction text not null check (reaction in ('fire', 'clap', 'insightful', 'thinking')),
  created_at timestamptz not null default now()
);

-- ============================================================
-- AUTO-UPDATE updated_at
-- ============================================================

create or replace function update_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger posts_updated_at
  before update on posts
  for each row execute function update_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table posts enable row level security;
alter table post_views enable row level security;
alter table post_reactions enable row level security;

-- Posts: anonymous users read published only; authenticated (you) can do everything
create policy "anon_read_published" on posts
  for select to anon using (is_published = true);

create policy "auth_select_all" on posts
  for select to authenticated using (true);

create policy "auth_insert" on posts
  for insert to authenticated with check (true);

create policy "auth_update" on posts
  for update to authenticated using (true) with check (true);

create policy "auth_delete" on posts
  for delete to authenticated using (true);

-- Views: anyone can insert; authenticated can read (for analytics)
create policy "anon_insert_views" on post_views
  for insert to anon with check (true);

create policy "auth_insert_views" on post_views
  for insert to authenticated with check (true);

create policy "auth_select_views" on post_views
  for select to authenticated using (true);

-- Reactions: anyone can insert or read (counts are public)
create policy "anyone_insert_reactions" on post_reactions
  for insert with check (true);

create policy "anyone_read_reactions" on post_reactions
  for select using (true);

-- ============================================================
-- AFTER SETUP: go to Authentication → Users → Add User
-- and create your account with your email + a strong password.
-- Then log into /admin on your site.
-- ============================================================
