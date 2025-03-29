import { getAuthUserId } from '@convex-dev/auth/server';

import { query } from './_generated/server';

export const current = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return null;
    }
    return await ctx.db.get(userId);
  },
});

export const getUsers = query({
  args: {},
  handler: async (ctx) => {
    const users = await ctx.db.query('users').collect();
    const usersWithFuncs = await Promise.all(
      users.map(async (user) => {
        const funcs = await ctx.db
          .query('funcs')
          .withIndex('by_user_id', (q) => q.eq('userId', user._id))
          .unique();
        return { ...user, funcs };
      })
    );
    return usersWithFuncs;
  },
});
