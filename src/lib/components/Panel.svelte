<script lang="ts">
    let { backgroundColor, width, height, ...args } = $props()
</script>

<div 
    style:--backgroundColor={backgroundColor}
    style:width
    style:height
    {...args} 
>

</div>

<style lang="scss">
    div {
        background-color: var(--backgroundColor);
        border-radius: 15px;
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.6);
        border: 2px solid color-mix(in srgb, var(--backgroundColor) 60%, white);
    }
</style>
