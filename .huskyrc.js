const tasks = arr => arr.join(' && ')

module.exports = {
  "hooks": {
    "pre-commit": tasks([
      "npm run type-check",
      "npm run lint",
      "lint-staged",
    ]),
  }
}
