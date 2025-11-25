<script module>
    import { defineMeta } from '@storybook/addon-svelte-csf';
    import Textbox from '$lib/components/Textbox.svelte';

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
    const { Story } = defineMeta({
        title: 'Component/Textbox',
        component: Textbox,
        tags: ['autodocs'],
        argTypes: {
        },
    });
</script>

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
<Story name="Textbox" args={{ placeholder: 'Textbox', backgroundColor: '#111111', color: "#ffffff" }} />
