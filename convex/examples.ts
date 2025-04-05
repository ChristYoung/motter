import { getAuthUserId } from '@convex-dev/auth/server';
import { v } from 'convex/values';

import { query, mutation } from './_generated/server';

export const getExamplesByWordId = query({
  args: {
    wordId: v.id('words'),
  },
  handler: async (ctx, { wordId }) => {
    const examples = await ctx.db
      .query('examples')
      .withIndex('by_word_id', (q) => q.eq('wordId', wordId))
      .collect();
    return examples;
  },
});

export const addExampleByWordId = mutation({
  args: {
    wordId: v.id('words'),
    cn: v.string(),
    en: v.string(),
    isDictation: v.boolean(),
  },
  handler: async (ctx, { wordId, cn, en, isDictation }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return null;
    }
    const exampleId = await ctx.db.insert('examples', {
      wordId,
      cn,
      en,
      isDictation,
    });
    return exampleId;
  },
});

export const deleteExampleById = mutation({
  args: {
    exampleId: v.id('examples'),
  },
  handler: async (ctx, { exampleId }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return null;
    }
    await ctx.db.delete(exampleId);
    return exampleId;
  },
});

export const updateExampleById = mutation({
  args: {
    exampleId: v.id('examples'),
    data: v.object({
      cn: v.optional(v.string()),
      en: v.optional(v.string()),
      isDictation: v.optional(v.boolean()),
    }),
  },
  handler: async (ctx, { exampleId, data }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return null;
    }
    await ctx.db.patch(exampleId, data);
    return exampleId;
  },
});
