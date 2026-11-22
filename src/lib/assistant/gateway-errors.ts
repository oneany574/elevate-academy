export function gatewayMessage(body: unknown, status: number) {
  if (body && typeof body === "object") {
    if ("message" in body && typeof body.message === "string") return body.message.slice(0, 1200);
    if ("error" in body && body.error && typeof body.error === "object" && "message" in body.error && typeof body.error.message === "string") return body.error.message.slice(0, 1200);
  }
  return `The AI service could not complete this request (${status}).`;
}
export function mustPauseGateway(status: number) { return status === 402 || status === 403; }