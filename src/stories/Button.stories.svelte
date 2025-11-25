<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Button from '$lib/components/Button.svelte';
  import { fn } from 'storybook/test';

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
    const { Story } = defineMeta({
        title: 'Component/Button',
        component: Button,
        tags: ['autodocs'],
        argTypes: {
        },
        args: {
            onclick: fn(),
        }
    });
</script>

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
<Story name="Primary" args={{ label: 'Button', backgroundColor: '#000000', color: "#ffffff", borderColor: "grey" }} />
