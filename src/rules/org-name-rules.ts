export const OrgNameRules: Array<Function> = [
  v => !!v?.trim() || 'Corporation or firm name is required',
  v => (v?.length <= 150) || 'Cannot exceed 150 characters' // maximum character count
]
