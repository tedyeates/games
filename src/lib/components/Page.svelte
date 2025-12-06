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


<div
    class="container"
    style:background-color={backgroundColor}
>
    <Panel 
        {backgroundColor}
        width="45vw"
        height="97vh"
    >
        <Header {color}>
            {title}
        </Header>
        <div class="body inner" style:--color={color}>
            {@render body()}
        </div>
        <div class="inputs inner">
            {#if inputs && textboxBackgroundColor}
                {@render inputs(color, textboxBackgroundColor)}
            {/if}
        </div>
        <div class="buttons inner">
            {#if buttons}
                {@render buttons(color, backgroundColor)}
            {/if}
        </div>
    </Panel>
</div>

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

    div.inner {
        padding: 0 2em;
    }

    .buttons {
        display: flex;
        gap: .2em;
        margin-top: .2em;
        margin-bottom: 2em;
    }

    .container {
        display: flex;
        width: 100%;
        height: 99vh;
        justify-content: center;
        padding-top: 1vh;
    }
</style>

