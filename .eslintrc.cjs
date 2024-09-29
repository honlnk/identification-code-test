/* eslint-env node */
module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    // 禁用 "no-unused-vars" 规则
    'no-unused-vars': 'off',
    // 禁用 "component-names" 规则
    'vue/multi-word-component-names': 'off',
  },
}
