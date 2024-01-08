import {
  int,
  timestamp,
  mysqlTable,
  primaryKey,
  varchar,
  serial,
  text,
  decimal,
  json,
} from "drizzle-orm/mysql-core";
import type { AdapterAccount } from "@auth/core/adapters";
import { relations, sql } from "drizzle-orm";

export const users = mysqlTable("user", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
    fsp: 3,
  }),
  password: varchar("password", { length: 255 }),
  image: varchar("image", { length: 255 }),
});

export const securityLogs = mysqlTable("securityLog", {
  id: serial("id").notNull().primaryKey(),
  userId: varchar("userId", { length: 255 }).notNull(),
  date: timestamp("date", { mode: "date" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  type: varchar("type", { length: 255 }),
  provider: varchar("provider", { length: 255 }),
  ip: varchar("ipAdress", { length: 255 }),
  country: varchar("country", { length: 255 }),
});

export const passwordResetToken = mysqlTable("passwordResetToken", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  email: varchar("email", { length: 255 }).notNull(),
  token: varchar("token", { length: 255 }).notNull(),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationToken = mysqlTable("verificationToken", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  email: varchar("email", { length: 255 }).notNull(),
  token: varchar("token", { length: 255 }).notNull(),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const accounts = mysqlTable(
  "account",
  {
    userId: varchar("userId", { length: 255 }).notNull(),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: varchar("refresh_token", { length: 255 }),
    access_token: varchar("access_token", { length: 255 }),
    expires_at: int("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: varchar("id_token", { length: 2048 }),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: (account.provider, account.providerAccountId),
  })
);

export const sessions = mysqlTable("session", {
  sessionToken: varchar("sessionToken", { length: 255 }).notNull().primaryKey(),
  userId: varchar("userId", { length: 255 }).notNull(),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const trip = mysqlTable("trip", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  userId: varchar("userId", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  created_at: timestamp("created_at", { mode: "date" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  city: varchar("city", { length: 255 }),
  description: text("description"),
  photo_reference: varchar("photo_reference", { length: 255 }).notNull(),
  width: int("width").notNull(),
  height: int("height").notNull(),
});

export const location = mysqlTable("location", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  tripId: varchar("tripId", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  rating: decimal("rating", { precision: 3, scale: 1 }),
  photos: json("photos"),
  opening_hours: json("opening_hours"),
});

export const locationReviews = mysqlTable("locationReviews", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  locationId: varchar("locationId", { length: 255 }).notNull(),
  tripId: varchar("tripId", { length: 255 }).notNull(),
  author_name: varchar("author_name", { length: 255 }).notNull(),
  rating: decimal("rating", { precision: 3, scale: 1 }).notNull(),
  relative_time_description: varchar("relative_time_description", {
    length: 255,
  }),
  text: text("text").notNull(),
  profile_photo_url: varchar("profile_photo_url", { length: 255 }),
  author_url: varchar("author_url", { length: 255 }),
});

export const tripRelations = relations(trip, ({ one, many }) => ({
  user: one(users, {
    fields: [trip.userId],
    references: [users.id],
  }),
  location: many(location),
}));

export const locationRelations = relations(location, ({ one, many }) => ({
  trip: one(trip, {
    fields: [location.tripId],
    references: [trip.id],
  }),
  reviews: many(locationReviews),
}));

export const locationReviewsRelations = relations(
  locationReviews,
  ({ one }) => ({
    location: one(location, {
      fields: [locationReviews.locationId],
      references: [location.id],
    }),
  })
);
