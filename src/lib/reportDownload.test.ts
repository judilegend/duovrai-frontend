import { describe, expect, it } from "vitest";
import { buildReportDownloadUrl } from "./reportDownload";

describe("buildReportDownloadUrl", () => {
  it("builds the correct PDF download endpoint", () => {
    expect(buildReportDownloadUrl("abc-123")).toBe(
      "http://localhost:8000/api/v1/reports/abc-123/download",
    );
  });
});
