import { getAuthUserId } from '@convex-dev/auth/server';

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
