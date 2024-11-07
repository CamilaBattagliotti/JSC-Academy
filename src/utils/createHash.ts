import crypto from "node:crypto";

function createSaltAndHash(payload: string | Object, salt: string) {
  const hash = crypto
    .createHash("sha256")
    .update(salt + payload)
    .digest("hex");

  return `${salt}:${hash}`;
}

function UUID() {
  return crypto.randomUUID();
}

export { createSaltAndHash, UUID };
