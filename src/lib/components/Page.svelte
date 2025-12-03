<script lang='ts'>
	import type { Snippet } from "svelte";
	import Header from "./Header.svelte";
	import Panel from "./Panel.svelte";

    type PageProps = {
        backgroundColor: string
        textboxBackgroundColor?: string
        color: string
        title: string
        body: Snippet
        inputs?: Snippet<[string, string?]>
        buttons?: Snippet<[string, string]>
    }

    let { 
        backgroundColor, 
        textboxBackgroundColor,
        color, 
        title,
        body,
        inputs,
        buttons
    }: PageProps = $props()
</script>

<Panel 
    {backgroundColor}
    width="50vw"
    height="90vh"
>
    <Header {color}>
        {title}
    </Header>
    <div class="body" style:--color={color}>
        {@render body()}
    </div>
    <div class="inputs">
        {#if inputs}
            {@render inputs(color, textboxBackgroundColor)}
        {/if}
    </div>
    <div class="buttons">
        {#if buttons}
            {@render buttons(color, backgroundColor)}
        {/if}
    </div>
</Panel>

<style lang="scss">
    .body {
        color: var(--color);
        font-family: 'Roboto', sans-serif;
        font-size: 18px;
        text-align: center;
        margin-bottom: auto;
        margin-top: 4em;
        padding: 0 4em;
    }

    .inputs, .buttons {
        display: flex;
        justify-content: center;
    }

    div {
        padding: 0 2em;
    }

    .buttons {
        display: flex;
        gap: .2em;
        margin-top: .2em;
        margin-bottom: 2em;
    }


</style>

