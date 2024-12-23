import { z } from "zod";

import { rooms } from "./rooms.ts";

type ProfilesList = z.infer<typeof profilesListSchema>;

type Room = z.infer<typeof roomStrictSchema>;

/**
 * Normalizes a room string by removing special characters.
 *
 * @param room - The room string to be normalized.
 * @returns The normalized room string.
 */
function normalizeRoomString(room: string): string {
  return room
    .normalize()
    .replaceAll("-", "")
    .replaceAll("_", "")
    .replaceAll("#", "")
    .replaceAll("/", "");
}

/**
 * Represents the custom schema for a room.
 *
 * This schema is used to validate if a value is a valid room.
 * A valid room, well, exists in the list of rooms.
 */
const roomStrictSchema = z.custom<keyof typeof rooms>(
  (val) =>
    z
      .string()
      .toUpperCase()
      .trim()
      .transform(normalizeRoomString)
      .refine((val2: string): val2 is keyof typeof rooms =>
        Object.hasOwn(rooms, val2),
      )
      .safeParse(val).success,
  (val) => ({ message: `${val} is not a room` }),
);

/**
 * Represents the custom schema for a room.
 *
 * This schema is used to validate if a value is a valid room.
 * A valid room, well, exists in the list of rooms.
 * In addition, this allows an empty string to pass, so that that validation can be caught better.
 */
const roomSchema = z.union([roomStrictSchema, z.literal("")]).readonly();

/**
 * Coerces a null value to undefined.
 *
 * @param val - Something possibly nullable.
 * @returns Something, but the null value is coerced to undefined.
 */
function coerceNullToUndefined(val: unknown): unknown {
  return val ?? undefined;
}

/**
 * Represents the schema for profiles data.
 */
const profilesSchema = z.union([
  z
    .tuple([z.preprocess(coerceNullToUndefined, z.undefined())])
    .rest(z.string()),
  z.tuple([]),
]);

/**
 * Represents the schema for an individual profile.
 */
const profileSchema = z.tuple([z.string(), z.string()]);

/**
 * Represents the schema for a list of profiles.
 */
const profilesListSchema = z.union([
  z.tuple([profilesSchema]).rest(profileSchema.array()),
  z.tuple([]),
]);

export { type ProfilesList, profilesListSchema, type Room, roomSchema };
