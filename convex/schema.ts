import { authTables } from '@convex-dev/auth/server';
import { defineSchema, defineTable } from 'convex/server';
import { Infer, v } from 'convex/values';

export const VFuncCodeSchema = v.union(
  v.literal('ADMIN'),
  v.literal('MEMBER'),
  v.literal('GUEST'),
  v.literal('BANNED')
);

export const VWordDataSchema = v.object({
  text: v.string(),
  userId: v.optional(v.id('users')),
  en_explanation: v.string(),
  cn_explanation: v.optional(v.string()),
  phonetic: v.optional(v.string()),
  mispronounced: v.boolean(),
  total_count: v.number(),
  correct_count: v.number(),
  type: v.union(v.literal('WORD'), v.literal('PHRASE')),
});

export const VUpdateWordDataSchema = v.object({
  en_explanation: v.optional(v.string()),
  cn_explanation: v.optional(v.string()),
  phonetic: v.optional(v.string()),
  mispronounced: v.optional(v.boolean()),
  total_count: v.optional(v.number()),
  correct_count: v.optional(v.number()),
});

export type VWordItemType = Infer<typeof VWordDataSchema>;

const schema = defineSchema({
  ...authTables,
  funcs: defineTable({
    userId: v.id('users'),
    code: VFuncCodeSchema,
  }).index('by_user_id', ['userId']),
  words: defineTable(VWordDataSchema).index('by_user_id', ['userId']),
  explanations: defineTable({
    wordId: v.id('words'),
    cn: v.string(),
    en: v.string(),
    isDictation: v.boolean(),
  }).index('by_word_id', ['wordId']),
});

export default schema;
