<script lang="ts">
    type TextboxProps = {
        backgroundColor: string
        color: string
        width?: string
        value?: string
        [key: string]: any
    }

    let { backgroundColor, color, width="100%", value = $bindable(), ...args }: TextboxProps = $props()
</script>

<input 
    { ...args }
    style:--backgroundColor={backgroundColor}
    style:--color={color}
    style:--width={width}
    type="text" 
    bind:value
/>

<style lang="scss">
    input {
        padding: 0 1em;
        background-color: var(--backgroundColor);
        color: var(--color);
        border-radius: 8px;
        border: 1px solid color-mix(in srgb, var(--backgroundColor) 60%, white);
        line-height: 2rem;
        transition: background-color 0.15s ease;
        font-family: 'Roboto', sans-serif;
        font-size: 14px;
        width: var(--width);

        &:focus {
            outline: none;
            border-color: color-mix(in srgb, var(--backgroundColor) 40%, white);
            box-shadow: 0 0 0 3px color-mix(in srgb, var(--backgroundColor) 80%, white);
        }
    }



</style>