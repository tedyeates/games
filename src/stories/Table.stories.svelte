<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Table from '$lib/components/Table.svelte';

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    title: 'Component/Table',
    component: Table,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    parameters: {
      // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
      layout: 'fullscreen',
    },
    args: {}
  });
</script>

<Story 
    name="Player List" 
    args={{ 
        headers: [{display: "Name", value:"name"}, {display: "Ready", name: "ready"}], 
        body: [
            {name: "Ted", ready: "✅"},
            {name: "Raf", ready: "✅"},
            {name: "Phil", ready: "❌"},
            {name: "Pat", ready: "❌"},
            {name: "Farooq", ready: "✅"},
        ],
        backgroundColor: "#111111",
        color: "#ffffff"
    }}
/>
