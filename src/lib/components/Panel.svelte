<script lang="ts">
    import type { Snippet } from 'svelte';

    type PanelProps = {
        backgroundColor: string
        width: string
        height: string
        children: Snippet
        [key: string]: any
    }

    let { backgroundColor, width, height, children,  ...args }: PanelProps = $props()
</script>

<div 
    style:--backgroundColor={backgroundColor}
    style:width
    style:height
    {...args} 
>
    {#if children}
        {@render children()}
    {/if}
</div>

<style lang="scss">
    div {
        background-color: var(--backgroundColor);
        border-radius: 15px;
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.6);
        border: 2px solid color-mix(in srgb, var(--backgroundColor) 60%, white);
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
</style>
