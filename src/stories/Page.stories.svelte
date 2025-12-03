<script module>
// @ts-nocheck

    import { defineMeta, Meta } from '@storybook/addon-svelte-csf';
    import Page from '$lib/components/Page.svelte';
    import Textbox from '$lib/components/Textbox.svelte';
    import Button from '$lib/components/Button.svelte';
	import Table from '$lib/components/Table.svelte';
	import Panel from './Panel.stories.svelte';

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
        >
            {#snippet body()}
                <p>Save Christmas and help Santa with his illegal communistic present giving scheme</p>
            {/snippet}
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
        >
            {#snippet body()}
                <p>Enter room code below</p>
            {/snippet}
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
        >
            {#snippet body()}
                <Table 
                    headers={["Name", "Ready"]}
                    body={[
                        {name: "Ted", ready: "✅"},
                        {name: "Raf", ready: "✅"},
                        {name: "Phil", ready: "❌"},
                        {name: "Pat", ready: "❌"},
                        {name: "Farooq", ready: "✅"},
                    ]}
                    backgroundColor="#111111"
                    color="#ffffff"
                />
            {/snippet}
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