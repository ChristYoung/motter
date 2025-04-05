import { getAuthUserId } from '@convex-dev/auth/server';
import { v } from 'convex/values';

import { mutation, query } from './_generated/server';
import { VWordDataSchema } from './schema';

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

export const getWordById = query({
  args: {
    wordId: v.id('words'),
  },
  handler: async (ctx, { wordId }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return null;
    }
    const word = await ctx.db.get(wordId);
    if (word?.userId !== userId) {
      return null;
    }
    return word;
  },
});

export const addWord = mutation({
  args: VWordDataSchema,
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
