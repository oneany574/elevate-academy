import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { csvCell, searchRecords, searchEditorialRecords, searchSchema } from "./catalogue";

const records = [
  { title: "Computing", category: "Computing", level: "Undergraduate" },
  { title: "Advanced Computing", category: "Computing", level: "Postgraduate" },
  { title: "Business", category: "Business", level: "Undergraduate" },
];

describe("validated catalogue retrieval", () => {
  test("filters level and category together", () => {
    assert.deepEqual(
      searchRecords(records, { query: null, category: "Computing", level: "Postgraduate" }),
      [records[1]],
    );
  });
  test("rejects model-supplied user or organization identities", () => {
    assert.equal(
      searchSchema.safeParse({ query: null, category: null, level: null, userId: "other-user" })
        .success,
      false,
    );
  });
  test("does not manufacture unavailable records", () => {
    assert.deepEqual(
      searchRecords(records, { query: "outstanding fees", category: null, level: null }),
      [],
    );
  });
  test("bounds retrieval", () => {
    assert.equal(
      searchRecords(
        Array.from({ length: 25 }, () => records[0]).filter((row) => row !== undefined),
        { query: null, category: null, level: null },
      ).length,
      20,
    );
  });
  test("rejects oversized search terms", () => {
    assert.throws(() =>
      searchRecords(records, { query: "a".repeat(201), category: null, level: null }),
    );
  });
  test("neutralizes spreadsheet formulas during export", () => {
    assert.equal(csvCell('=HYPERLINK("unsafe")'), '"\'=HYPERLINK(""unsafe"")"');
  });
  test("finds event listings by type rather than editorial category", () => {
    const editorial = [
      { title: "Open Campus", excerpt: "Meet faculty", category: "Open Day", type: "event" },
      { title: "Announcement", excerpt: "College news", category: "Announcement", type: "news" },
    ];
    assert.deepEqual(
      searchEditorialRecords(editorial, { query: null, category: "events", level: null }),
      [editorial[0]],
    );
  });
});
