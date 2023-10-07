import {
  int,
  timestamp,
  mysqlTable,
  primaryKey,
  varchar,
  serial,
  foreignKey,
  text,
  decimal,
  json,
} from "drizzle-orm/mysql-core";
import type { AdapterAccount } from "@auth/core/adapters";
import { config } from "process";
import { relations } from "drizzle-orm";

export const users = mysqlTable("user", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
    fsp: 3,
  }).defaultNow(),
  image: varchar("image", { length: 255 }),
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
    compoundKey: primaryKey(account.provider, account.providerAccountId),
  })
);

export const sessions = mysqlTable("session", {
  sessionToken: varchar("sessionToken", { length: 255 }).notNull().primaryKey(),
  userId: varchar("userId", { length: 255 }).notNull(),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = mysqlTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  })
);

export const trip = mysqlTable("trip", {
  tripId: varchar("tripId", { length: 255 }).notNull().primaryKey(),
  userId: varchar("userId", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  created_at: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
});

export const tripRelations = relations(trip, ({ one }) => ({
  user: one(users, { fields: [trip.userId], references: [users.id] }),
}));

export const Location = mysqlTable("location", {
  locationId: varchar("locationId", { length: 255 }).notNull().primaryKey(),
  tripId: varchar("tripId", { length: 255 }).notNull(),
  userId: varchar("userId", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  rating: decimal("rating", { precision: 3, scale: 1 }),
  photos: json("photos"),
});

export const LocationReviews = mysqlTable(
  "locationReviews",
  {
    locationId: varchar("locationId", { length: 255 }).notNull(),
    tripId: varchar("tripId", { length: 255 }).notNull(),
    userId: varchar("userId", { length: 255 }).notNull(),
    authorName: varchar("author_name", { length: 255 }).notNull(),
    rating: decimal("rating", { precision: 3, scale: 1 }).notNull(),
    reviewText: text("review_text").notNull(),
    created_at: timestamp("created_at", { mode: "date" })
      .notNull()
      .defaultNow(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.locationId, vt.userId),
  })
);

export const locationReviewsRelations = relations(
  LocationReviews,
  ({ one }) => ({
    user: one(users, {
      fields: [LocationReviews.userId],
      references: [users.id],
    }),
    trip: one(trip, {
      fields: [LocationReviews.tripId],
      references: [trip.tripId],
    }),
  })
);

export const locationRelations = relations(Location, ({ one }) => ({
  user: one(users, { fields: [Location.userId], references: [users.id] }),
  trip: one(trip, { fields: [Location.tripId], references: [trip.tripId] }),
}));
