import { supabase, isConfigured } from './supabase';
import staticPosts from '../constants/blogPosts';

const VIEW_TTL = 24 * 60 * 60 * 1000; // 24 hours

function normalizePost(p) {
  return {
    ...p,
    readTime: p.read_time ?? p.readTime,
    date: p.published_at
      ? new Date(p.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
      : p.date,
  };
}

// ── Public ──────────────────────────────────────────────────

export async function fetchPosts() {
  if (!isConfigured) return { data: staticPosts, error: null };
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('is_published', true)
    .order('published_at', { ascending: false });
  return { data: data?.map(normalizePost) ?? [], error };
}

export async function fetchPost(slug) {
  if (!isConfigured) {
    const post = staticPosts.find((p) => p.slug === slug) ?? null;
    return { data: post, error: post ? null : { message: 'Not found' } };
  }
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single();
  return { data: data ? normalizePost(data) : null, error };
}

// ── Admin ────────────────────────────────────────────────────

export async function fetchAllPosts() {
  if (!isConfigured) return { data: staticPosts, error: null };
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('published_at', { ascending: false });
  return { data: data?.map(normalizePost) ?? [], error };
}

export async function createPost(payload) {
  const { data, error } = await supabase.from('posts').insert(payload).select().single();
  return { data, error };
}

export async function updatePost(id, payload) {
  const { data, error } = await supabase.from('posts').update(payload).eq('id', id).select().single();
  return { data, error };
}

export async function deletePost(id) {
  const { error } = await supabase.from('posts').delete().eq('id', id);
  return { error };
}

export async function togglePublish(id, isPublished) {
  const { error } = await supabase.from('posts').update({ is_published: isPublished }).eq('id', id);
  return { error };
}

export async function seedInitialPosts() {
  if (!isConfigured) return { error: { message: 'Supabase not configured' } };
  const { count } = await supabase.from('posts').select('*', { count: 'exact', head: true });
  if (count > 0) return { error: { message: 'Posts already exist' } };

  const rows = staticPosts.map((p) => ({
    slug: p.slug,
    title: p.title,
    subtitle: p.subtitle,
    excerpt: p.excerpt,
    category: p.category,
    tags: p.tags,
    read_time: p.readTime,
    content: p.content,
    is_published: true,
    published_at: new Date(p.date).toISOString(),
  }));

  const { error } = await supabase.from('posts').insert(rows);
  return { error };
}

// ── Views ────────────────────────────────────────────────────

export async function trackView(slug) {
  if (!isConfigured) return;
  const key = `view_${slug}`;
  const last = localStorage.getItem(key);
  if (last && Date.now() - Number(last) < VIEW_TTL) return;
  localStorage.setItem(key, Date.now().toString());
  await supabase.from('post_views').insert({ post_slug: slug });
}

export async function fetchAllViewCounts() {
  if (!isConfigured) return {};
  const { data } = await supabase.from('post_views').select('post_slug');
  if (!data) return {};
  return data.reduce((acc, row) => {
    acc[row.post_slug] = (acc[row.post_slug] ?? 0) + 1;
    return acc;
  }, {});
}

export async function fetchViewCount(slug) {
  if (!isConfigured) return 0;
  const { count } = await supabase
    .from('post_views')
    .select('*', { count: 'exact', head: true })
    .eq('post_slug', slug);
  return count ?? 0;
}

// ── Reactions ────────────────────────────────────────────────

export async function fetchReactions(slug) {
  if (!isConfigured) return {};
  const { data } = await supabase.from('post_reactions').select('reaction').eq('post_slug', slug);
  if (!data) return {};
  return data.reduce((acc, row) => {
    acc[row.reaction] = (acc[row.reaction] ?? 0) + 1;
    return acc;
  }, {});
}

export async function addReaction(slug, reaction) {
  if (!isConfigured) return { error: null };
  const key = `reacted_${slug}_${reaction}`;
  if (localStorage.getItem(key)) return { error: 'already_reacted' };
  const { error } = await supabase.from('post_reactions').insert({ post_slug: slug, reaction });
  if (!error) localStorage.setItem(key, '1');
  return { error };
}

export async function fetchAllReactionCounts() {
  if (!isConfigured) return {};
  const { data } = await supabase.from('post_reactions').select('post_slug, reaction');
  if (!data) return {};
  return data.reduce((acc, row) => {
    if (!acc[row.post_slug]) acc[row.post_slug] = {};
    acc[row.post_slug][row.reaction] = (acc[row.post_slug][row.reaction] ?? 0) + 1;
    return acc;
  }, {});
}
