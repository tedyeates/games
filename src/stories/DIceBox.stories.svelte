<script module>
    import { defineMeta } from '@storybook/addon-svelte-csf';
    import DiceBox from '$lib/components/DiceBox.svelte';

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
    const { Story } = defineMeta({
        title: 'Component/DiceBox',
        component: DiceBox,
        tags: ['autodocs'],
        argTypes: {
        },
        args: {
        }
    });
</script>

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
<Story name="Primary" args={{ 
    dice: [
        {
            sides: ['1', '2', '3', '4', '5', '6'],
            result: 1,
            color: '#000000'
        }
    ]
}} />
