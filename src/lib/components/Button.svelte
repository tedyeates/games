<script lang="ts">
    import Icon from "@iconify/svelte";

    type ButtonProps = {
        label: string
        backgroundColor: string
        color: string
        onclick: () => void
        width?: string
        loading?: boolean
        [key: string]: any
    }

    let { label, backgroundColor, color, width="100%", loading=false, ...args }: ButtonProps = $props()
</script>

<button 
    {...args}
    style:--backgroundColor={backgroundColor}
    style:--color={color}
    style:--width={width}
    class:loading
>
    {#if loading }
        <Icon icon="codex:loader" width="40" height="30"  style={`color: ${color}`} />
    {:else}
        {label}
    {/if}

</button>

<style lang="scss">
    button {
        display: flex;
        justify-content: center;   
        align-items: center; 

        padding: 0 1em;
        background-color: var(--backgroundColor);
        color: var(--color);
        border-radius: 8px;
        border: 1px solid color-mix(in srgb, var(--backgroundColor) 60%, white);
        appearance: none;  
        box-shadow: none;    
        line-height: 2rem;
        transition: background-color 0.15s ease;
        font-family: 'Roboto', sans-serif;
        font-size: 14px;
        width: var(--width);

        &:hover {
            background-color: color-mix(in srgb, var(--backgroundColor) 90%, white);
        }
        
        &.loading {
            background-color: color-mix(in srgb, var(--backgroundColor) 80%, white);
        }
    }



</style>