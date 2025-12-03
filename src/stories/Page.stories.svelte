<script module>
// @ts-nocheck

    import { defineMeta, Meta } from '@storybook/addon-svelte-csf';
    import Page from '$lib/components/Page.svelte';
    import Textbox from '$lib/components/Textbox.svelte';
    import Button from '$lib/components/Button.svelte';

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
    const { Story } = defineMeta({
        title: 'Component/Page',
        component: Page,
        tags: ['autodocs'],
        argTypes: {
        },
        args: {
            backgroundColor: "#111111",
            color: "#ffffff"
        }
    });
</script>


<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
<Story 
    name="Home Page" 
    args={{
        backgroundColor: "#111111",
        color: "#ffffff"
    }}
>
    {#snippet template(args)}
        <Page
            {...args}
            title="Secret Santa"
            body="Save Christmas and help Santa with his illegal communistic present giving scheme"
        >
            {#snippet buttons(color, backgroundColor)}
                <Button
                    label="Join Room"
                    backgroundColor={backgroundColor}
                    color={color}
                />
                <Button
                    label="Create Room"
                    backgroundColor={backgroundColor}
                    color={color}
                />
            {/snippet}
        </Page>
    {/snippet}
</Story>

<Story 
    name="Join Room" 
>
    {#snippet template(args)}
        <Page
            backgroundColor="#111111"
            textboxBackgroundColor="#333333"
            color="#ffffff"
            title="Join Room"
            body="Enter room code below"
        >
            {#snippet inputs(color, textboxBackgroundColor)}
                <Textbox 
                    backgroundColor={textboxBackgroundColor}
                    color={color}
                />
            {/snippet}
            {#snippet buttons(color, backgroundColor)}
                <Button
                    label="Join Room"
                    backgroundColor={backgroundColor}
                    color={color}
                />
            {/snippet}
        </Page>
    {/snippet}
</Story>

<Story 
    name="Lobby" 
>
    {#snippet template(args)}
        <Page
            backgroundColor="#111111"
            textboxBackgroundColor="#333333"
            color="#ffffff"
            title="Lobby"
            body="Enter room code below"
        >
            {#snippet buttons(color, backgroundColor)}
                <Button
                    label="Start Game"
                    backgroundColor={backgroundColor}
                    color={color}
                />
            {/snippet}
        </Page>
    {/snippet}
</Story>