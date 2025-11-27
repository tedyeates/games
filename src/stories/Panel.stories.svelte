<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Panel from '$lib/components/Panel.svelte';

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
    const { Story } = defineMeta({
        title: 'Component/Panel',
        component: Panel,
        tags: ['autodocs'],
        argTypes: {
        },
        args: {
        }
    });
</script>

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
<Story name="Primary" args={{ backgroundColor: '#111111', width: "50vw", height: "90vh" }} />