<script lang="ts">
    import { page } from "$app/stores";

    import { t } from "$lib/i18n/translations";

    export let name: string;
    export let path: string;
    export let icon: ConstructorOfATypedSvelteComponent;

    export let beta = false;

    const firstTabPage = ["save", "remux", "settings"];

    let tab: HTMLElement;

    $: currentTab = $page.url.pathname.split("/")[1];
    $: baseTabPath = path.split("/")[1];

    $: isTabActive = currentTab === baseTabPath;

    const showTab = (e: HTMLElement) => {
        if (e) {
            e.scrollIntoView({
                inline: firstTabPage.includes(name) ? "end" : "start",
                block: "nearest",
                behavior: "smooth",
            });
        }
    };

    $: if (isTabActive && tab) {
        showTab(tab);
    }
</script>

<a
    id="sidebar-tab-{name}"
    class="sidebar-tab"
    class:active={isTabActive}
    href={path}
    bind:this={tab}
    on:focus={() => showTab(tab)}
    role="tab"
    aria-selected={isTabActive}
>
    {#if beta}
        <div class="beta-sign" aria-label={$t("general.beta")}>β</div>
    {/if}

    <svelte:component this={icon} />
    <span class="tab-title">{$t(`tabs.${name}`)}</span>
</a>

<style>
    .sidebar-tab {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 4px;
        padding: var(--sidebar-tab-padding) 3px;
        color: var(--sidebar-highlight);
        font-size: var(--sidebar-font-size);
        opacity: 0.55;
        height: fit-content;
        border-radius: var(--border-radius);
        transition: transform 0.2s ease, opacity 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;

        text-decoration: none;
        text-decoration-line: none;
        position: relative;
        scroll-behavior: smooth;

        cursor: pointer;
    }

    .sidebar-tab :global(svg) {
        stroke-width: 1.3px;
        height: 22px;
        width: 22px;
    }

    :global([data-iphone="true"] .sidebar-tab svg) {
        will-change: transform;
    }

    .sidebar-tab.active {
        color: var(--white);
        background: var(--accent);
        opacity: 1;
        transform: none;
        transition: none;
        animation: pressButton 0.3s ease;
        cursor: default;
        box-shadow:
            0 0 16px var(--accent-glow),
            0 0 32px var(--neo-glow-primary),
            0 2px 8px rgba(0,0,0,0.3);
    }

    :global([data-theme="dark"]) .sidebar-tab.active {
        box-shadow:
            0 0 20px var(--accent-glow),
            0 0 40px var(--neo-glow-primary),
            0 2px 12px rgba(0,0,0,0.5);
    }

    .sidebar-tab:not(.active):active {
        transform: scale(0.92);
    }

    :global([data-reduce-motion="true"]) .sidebar-tab:active {
        transform: none;
    }

    .beta-sign {
        position: absolute;
        transform: translateX(16px) translateY(-6px);
        opacity: 0.7;
        font-size: 10px;
    }

    .tab-title {
        white-space: nowrap;
        letter-spacing: 0.02em;
    }

    .sidebar-tab:active:not(.active) {
        opacity: 1;
    }

    @keyframes pressButton {
        0% {
            transform: scale(0.85);
            box-shadow: 0 0 4px var(--accent-glow);
        }
        60% {
            transform: scale(1.06);
            box-shadow: 0 0 24px var(--accent-glow-strong);
        }
        100% {
            transform: scale(1);
            box-shadow: 0 0 16px var(--accent-glow);
        }
    }

    @media (hover: hover) {
        .sidebar-tab:hover:not(.active) {
            background-color: var(--button-hover-transparent);
            opacity: 0.85;
        }

        .sidebar-tab:active:not(.active),
        .sidebar-tab:focus:hover:not(.active) {
            background-color: var(--button-press-transparent);
            opacity: 1;
        }

        .sidebar-tab:hover:not(.active) {
            opacity: 0.9;
        }

        .sidebar-tab:active:not(.active),
        .sidebar-tab:focus:hover:not(.active) {
            opacity: 1;
            box-shadow: 0 0 0 1px var(--sidebar-stroke) inset;
        }
    }

    @media screen and (max-width: 535px) {
        .sidebar-tab {
            padding: 5px var(--padding);
            min-width: calc(var(--sidebar-width) / 2);
        }

        .sidebar-tab.active {
            z-index: 2;
        }

        .sidebar-tab:active:not(.active) {
            transform: scale(0.88);
        }

        @keyframes pressButton {
            0% {
                transform: scale(0.8);
                box-shadow: 0 0 4px var(--accent-glow);
            }
            55% {
                transform: scale(1.04);
                box-shadow: 0 0 20px var(--accent-glow-strong);
            }
            100% {
                transform: scale(1);
                box-shadow: 0 0 14px var(--accent-glow);
            }
        }
    }
</style>
