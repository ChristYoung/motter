import { getAuthUserId } from '@convex-dev/auth/server';
import { v } from 'convex/values';

import { mutation, query } from './_generated/server';

export const getUserWords = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return null;
    }
    const words = await ctx.db
      .query('words')
      .withIndex('by_user_id', (q) => q.eq('userId', userId))
      .collect();
    return words;
  },
});

export const addWord = mutation({
  args: {
    text: v.string(),
    phonetic: v.string(),
    en_explanation: v.string(),
    cn_explanation: v.string(),
    mispronounced: v.boolean(),
    total_count: v.number(),
    correct_count: v.number(),
    type: v.union(v.literal('WORD'), v.literal('PHRASE')),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return null;
    }
    const wordId = await ctx.db.insert('words', {
      userId,
      ...args,
    });
    return wordId;
  },
});
