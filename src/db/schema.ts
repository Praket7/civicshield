import { pgTable, serial, text, timestamp, integer, boolean } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at').defaultNow(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  name: text('name'),
  cityId: text('city_id').default('buffalo-ny'),
  postalCode: text('postal_code'),
  role: text('role').default('tenant'),
});

export const evictionLogs = pgTable('eviction_logs', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at').defaultNow(),
  userId: integer('user_id'),
  cityId: text('city_id'),
  postalCode: text('postal_code'),
  violationType: text('violation_type'),
  tenantName: text('tenant_name'),
  landlordName: text('landlord_name'),
  address: text('address'),
  riskScore: integer('risk_score'),
});

export const incidentReports = pgTable('incident_reports', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at').defaultNow(),
  userId: integer('user_id'),
  cityId: text('city_id').notNull(),
  postalCode: text('postal_code').notNull(),
  neighborhood: text('neighborhood'),
  incidentType: text('incident_type').notNull(),
  description: text('description'),
  severity: text('severity'),
  verified: boolean('verified').default(false),
  upvotes: integer('upvotes').default(0),
});

export const communityAlerts = pgTable('community_alerts', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at').defaultNow(),
  cityId: text('city_id').notNull(),
  alertType: text('alert_type').notNull(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  postalCode: text('postal_code'),
  relatedNodeIds: text('related_node_ids').array(),
});

export const savedCases = pgTable('saved_cases', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at').defaultNow(),
  userId: integer('user_id'),
  caseToken: text('case_token').notNull(),
  cityId: text('city_id').notNull(),
  tenantName: text('tenant_name'),
  landlordName: text('landlord_name'),
  address: text('address'),
  postalCode: text('postal_code'),
  defenseDocument: text('defense_document'),
  riskScore: integer('risk_score'),
  status: text('status').default('active'),
  courtDate: text('court_date'),
  notes: text('notes'),
});

export const statutes = pgTable('statutes', {
  id: serial('id').primaryKey(),
  code: text('code').notNull(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  keywords: text('keywords').array(),
  relevanceScore: integer('relevance_score').default(0),
});

export const anomalies = pgTable('anomalies', {
  id: serial('id').primaryKey(),
  type: text('type').notNull(),
  description: text('description').notNull(),
  severity: text('severity'),
  relatedNodes: text('related_nodes').array(),
});
