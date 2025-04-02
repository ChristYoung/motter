import { authTables } from '@convex-dev/auth/server';
import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export const VFuncCodeType = v.union(
  v.literal('ADMIN'),
  v.literal('MEMBER'),
  v.literal('GUEST'),
  v.literal('BANNED')
);

const schema = defineSchema({
  ...authTables,
  funcs: defineTable({
    userId: v.id('users'),
    code: VFuncCodeType,
  }).index('by_user_id', ['userId']),
  words: defineTable({
    userId: v.id('users'),
    text: v.string(),
    phonetic: v.string(),
    en_explanation: v.string(),
    cn_explanation: v.string(),
    mispronounced: v.boolean(),
    total_count: v.int64(),
    correct_count: v.int64(),
    type: v.union(v.literal('WORD'), v.literal('PHRASE')),
  }).index('by_user_id', ['userId']),
  explanations: defineTable({
    wordId: v.id('words'),
    cn: v.string(),
    en: v.string(),
    isDictation: v.boolean(),
  }),
});

export default schema;
