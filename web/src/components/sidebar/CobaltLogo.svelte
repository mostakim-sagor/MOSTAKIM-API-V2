<script>
    import IconCobalt from "$components/icons/Cobalt.svelte";
</script>

<div id="cobalt-logo">
    <div class="logo-glow"></div>
    <IconCobalt />
</div>

<style>
    #cobalt-logo {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: calc(var(--sidebar-tab-padding) * 2);
        padding-bottom: calc(var(--sidebar-tab-padding) * 2 - var(--sidebar-inner-padding));
        position: relative;
    }

    .logo-glow {
        position: absolute;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: var(--accent);
        filter: blur(18px);
        opacity: 0.2;
        pointer-events: none;
        animation: neo-pulse 4s ease-in-out infinite;
    }

    :global([data-reduce-motion="true"]) .logo-glow {
        animation: none;
    }

    #cobalt-logo :global(path) {
        fill: var(--sidebar-highlight);
    }

    @media screen and (max-width: 535px) {
        #cobalt-logo {
            display: none;
        }
    }
</style>
