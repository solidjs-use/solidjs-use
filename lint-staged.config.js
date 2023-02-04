const path = require('path')

module.exports = {
  'packages/**/*.ts?(x)': () => 'npm run type-check',
  '*.{js,jsx,ts,tsx,md}': ['prettier --write', 'eslint --fix'],
  'packages/*/src/*/index.test.ts?(x)': filenames => {
    const files = filenames
      .map(filePath => (filePath.includes('test.') ? filePath : filePath.replace('index.', 'index.test.')))
      .map(item => path.relative(__dirname, item))
    return `npm run test:ci -- -s "${files.join(',')}"`
  },
  'packages/**/*.ts?(x)': () => 'yarn tsx scripts/update.ts'
}
