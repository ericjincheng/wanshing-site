import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'wanshing-studio',
  title: 'Wanshing Machinery',
  projectId: '7rppd6fc',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Equipment Catalog')
              .icon(() => '🏗️')
              .child(S.documentTypeList('equipment').title('All Equipment')),
          ]),
    }),
    // Vision lets you test GROQ queries directly in the Studio
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
