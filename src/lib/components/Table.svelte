<script lang="ts">
    type Header = {
        display: string
        value: string
    }

    type Body = {
        [key: string]: string|boolean|number
    }

    type TableProps = {
        headers: Header[]
        body: Body[]
        backgroundColor: string
        color: string
    }

    let { headers, body, backgroundColor, color }: TableProps = $props()
</script>

<table 
    style:--background-color={backgroundColor}
    style:--color={color}
>
    <thead>
        <tr>
            {#each headers as header}
                <th>{header.display}</th>
            {/each}
        </tr>
    </thead>
    <tbody>
        {#each body as row}
            <tr>
                {#each headers as header}
                    <td>{row[header.value]}</td>
                {/each}
            </tr>
        {/each}
    </tbody>
</table>

<style lang="scss">
    table {
        background-color: var(--background-color);
        color: var(--color);
        width: 100%;
        padding: .5em 0;
        border-collapse: collapse;
    }

    th {
        font-weight: bold;
    }

    th, td {
        text-align: left;
        padding: .5em 1em;
    }

    tr td {
        border: none;
        border-top: 1px solid color-mix(in srgb, var(--color) 40%, black);
        font-family: 'Roboto', sans-serif;
        font-size: 14px;
    }
</style>