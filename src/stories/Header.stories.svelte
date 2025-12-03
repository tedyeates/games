<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Header from '$lib/components/Header.svelte';

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    title: 'Component/Header',
    component: Header,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    parameters: {
      // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
      layout: 'fullscreen',
    },
    args: {}
  });
</script>

<Story name="Welcome" args={{ children: "Welcome", color: "#ffffff" }} />

