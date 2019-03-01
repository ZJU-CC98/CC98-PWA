module.exports = {
  "hooks": {
    "pre-commit": [
      "npm run type-check",
      "npm run lint",
      "lint-staged",
    ],
  }
}
