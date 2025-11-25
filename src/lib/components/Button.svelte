<script lang="ts">
    let { label, backgroundColor, color, borderColor, ...args } = $props()
</script>

<button 
    {...args} 
    style:--backgroundColor={`${backgroundColor}dd`}
    style:--color={color}
    style:--borderColor={borderColor}
    style:--backgroundColorHover={`${backgroundColor}cd`}
>
    {label}
</button>

<style lang="scss">
    button {
        padding: 0 1rem;
        background-color: var(--backgroundColor);
        color: var(--color);
        border-radius: 8px;
        border-color: var(--borderColor);
        line-height: 2rem;
        transition: background-color 0.15s ease;

        &:hover {
            background-color: var(--backgroundColorHover);
        }
    }


</style>