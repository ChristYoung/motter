import { getAuthUserId } from '@convex-dev/auth/server';
import { v } from 'convex/values';

import { mutation, query } from './_generated/server';
import { VFuncCodeType } from './schema';

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

export const getUserFuncs = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return null;
    }
    const funcs = await ctx.db
      .query('funcs')
      .withIndex('by_user_id', (q) => q.eq('userId', userId))
      .unique();
    return funcs;
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

export const setUserRole = mutation({
  args: {
    userId: v.id('users'),
    code: VFuncCodeType,
  },
  handler: async (ctx, args) => {
    await ctx.db.insert('funcs', {
      userId: args.userId,
      code: args.code,
    });
  },
});
