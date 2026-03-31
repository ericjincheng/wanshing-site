import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import product from './schemas/product'

export default defineConfig({
  name: 'default',
  title: 'WanShing Machinery',
  projectId: '7rppd6fc',
  dataset: 'production',

  plugins: [structureTool()],

  schema: {
    types: [product],
  },
})