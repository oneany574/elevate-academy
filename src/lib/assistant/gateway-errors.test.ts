import { test } from "node:test";
import assert from "node:assert/strict";
import { gatewayMessage, mustPauseGateway } from "./gateway-errors";
test("credit exhaustion and access denial pause new calls", () => {
  assert.equal(mustPauseGateway(402), true);
  assert.equal(mustPauseGateway(403), true);
  assert.equal(mustPauseGateway(429), false);
});
test("upstream safe denial reason is preserved", () => {
  assert.equal(gatewayMessage({ error: { message: "Vendor access is disabled." } }, 403), "Vendor access is disabled.");
});