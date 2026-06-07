const REPORTS_API_BASE = "http://localhost:8000/api/v1/reports";

export function buildReportDownloadUrl(orderId: string): string {
  return `${REPORTS_API_BASE}/${orderId}/download`;
}
