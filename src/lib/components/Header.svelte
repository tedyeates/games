<script lang="ts">
	import type { Snippet } from "svelte";

    type HeaderProps = {
        color: string
        children: Snippet
        [key: string]: any
    }
    let { children, color, ...args }: HeaderProps = $props()
</script>

<div style:--color={color} { ...args }>
    <h1>{@render children()}</h1>
    <hr>
</div>

<style lang="scss">
    h1 {
        color: var(--color);
        text-align: center;
        vertical-align: middle;
        line-height: 100%;
        font-family: 'Roboto', sans-serif;
        line-height: 2rem;
    }

    hr {
        border: none;
        height: 1px;
        width: 30%;
        margin: 0.75rem auto;

        background: linear-gradient(
            to right,
            transparent,
            color-mix(in srgb, var(--color) 40%, transparent),
            transparent
        );
    }

</style>