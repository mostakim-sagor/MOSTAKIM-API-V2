<script lang="ts">
    import "../app.css";
    import "../fonts/noto-mono-cobalt.css";

    import "@fontsource/ibm-plex-mono/400.css";
    import "@fontsource/ibm-plex-mono/400-italic.css";
    import "@fontsource/ibm-plex-mono/500.css";

    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import { updated } from "$app/stores";
    import { browser } from "$app/environment";
    import { afterNavigate } from "$app/navigation";

    import "$lib/polyfills";
    import env from "$lib/env";
    import locale from "$lib/i18n/locale";
    import settings from "$lib/state/settings";

    import { t } from "$lib/i18n/translations";

    import { device, app } from "$lib/device";
    import { getServerInfo } from "$lib/api/server-info";
    import currentTheme, { statusBarColors } from "$lib/state/theme";
    import { turnstileCreated, turnstileEnabled } from "$lib/state/turnstile";

    import Sidebar from "$components/sidebar/Sidebar.svelte";
    import Turnstile from "$components/misc/Turnstile.svelte";
    import NotchSticker from "$components/misc/NotchSticker.svelte";
    import DialogHolder from "$components/dialog/DialogHolder.svelte";
    import ProcessingQueue from "$components/queue/ProcessingQueue.svelte";
    import UpdateNotification from "$components/misc/UpdateNotification.svelte";

    $: reduceMotion =
        $settings.accessibility.reduceMotion || device.prefers.reducedMotion;

    $: reduceTransparency =
        $settings.accessibility.reduceTransparency ||
        device.prefers.reducedTransparency;

    $: preloadAssets = false;
    $: plausibleLoaded = false;

    afterNavigate(async () => {
        const to_focus: HTMLElement | null =
            document.querySelector("[data-first-focus]");
        to_focus?.focus();

        if ($page.url.pathname === "/") {
            await getServerInfo();
        }
    });

    onMount(() => {
        preloadAssets = true;
    });
</script>

<svelte:head>
    <meta name="description" content={$t("general.embed.description")} />
    <meta property="og:description" content={$t("general.embed.description")} />

    {#if env.HOST}
        <meta
            property="og:url"
            content="https://{env.HOST}{$page.url.pathname}"
        />
    {/if}

    {#if device.is.mobile}
        <meta
            name="theme-color"
            content={statusBarColors.mobile[$currentTheme]}
        />
    {:else}
        <meta
            name="theme-color"
            content={statusBarColors.desktop[$currentTheme]}
        />
    {/if}

    {#if plausibleLoaded || (browser && env.PLAUSIBLE_ENABLED && !$settings.privacy.disableAnalytics)}
        <script
            defer
            data-domain={env.HOST}
            on:load={() => {
                plausibleLoaded = true;
            }}
            src="https://{env.PLAUSIBLE_HOST}/js/script.js"
        ></script>
    {/if}
</svelte:head>

<div
    style="display: contents"
    data-theme={browser ? $currentTheme : undefined}
    lang={$locale}
>
    {#if preloadAssets}
        <div id="preload" aria-hidden="true">??</div>
    {/if}
    <div
        id="mostakim"
        class:loaded={browser}
        data-chrome={device.browser.chrome}
        data-iphone={device.is.iPhone}
        data-mobile={device.is.mobile}
        data-reduce-motion={reduceMotion}
        data-reduce-transparency={reduceTransparency}
    >
        <div class="neo-bg" aria-hidden="true">
            <div class="neo-orb orb-1"></div>
            <div class="neo-orb orb-2"></div>
            <div class="neo-orb orb-3"></div>
        </div>
        {#if device.is.iPhone && app.is.installed}
            <NotchSticker />
        {/if}
        <DialogHolder />
        <Sidebar />
        {#if $updated}
            <UpdateNotification />
        {/if}
        <ProcessingQueue />
        <div id="content">
            {#if ($turnstileEnabled && $page.url.pathname === "/") || $turnstileCreated}
                <Turnstile />
            {/if}
            <slot></slot>
        </div>
    </div>
</div>

<style>
    #mostakim {
        height: 100%;
        width: 100%;
        display: grid;
        grid-template-columns:
            calc(var(--sidebar-width) + var(--sidebar-inner-padding) * 2)
            1fr;
        overflow: hidden;
        background-color: var(--primary);
        color: var(--secondary);
        position: fixed;
    }

    .neo-bg {
        position: fixed;
        inset: 0;
        pointer-events: none;
        z-index: 0;
        overflow: hidden;
    }

    .neo-orb {
        position: absolute;
        border-radius: 50%;
        filter: blur(80px);
        opacity: 0.18;
    }

    :global([data-theme="dark"]) .neo-orb {
        opacity: 0.22;
    }

    .orb-1 {
        width: 500px;
        height: 500px;
        background: radial-gradient(circle, rgba(124, 58, 237, 0.8), transparent 70%);
        top: -100px;
        right: 10%;
        animation: neo-orb-1 18s ease-in-out infinite;
    }

    .orb-2 {
        width: 400px;
        height: 400px;
        background: radial-gradient(circle, rgba(167, 139, 250, 0.7), transparent 70%);
        bottom: 0;
        left: 15%;
        animation: neo-orb-2 22s ease-in-out infinite;
    }

    .orb-3 {
        width: 300px;
        height: 300px;
        background: radial-gradient(circle, rgba(244, 114, 182, 0.5), transparent 70%);
        top: 40%;
        right: 30%;
        animation: neo-orb-3 16s ease-in-out infinite;
    }

    :global([data-reduce-motion="true"]) .neo-orb {
        animation: none !important;
    }

    /* add padding for notch / dynamic island in landscape */
    @media screen and (orientation: landscape) and (min-width: 535px) {
        #mostakim[data-iphone="true"] {
            grid-template-columns:
                calc(
                    var(--sidebar-width) + var(--sidebar-inner-padding) * 2 +
                        env(safe-area-inset-left)
                )
                1fr;
        }

        #mostakim[data-iphone="true"] #content {
            padding-right: env(safe-area-inset-right);
        }
    }

    #content {
        display: flex;
        overflow: scroll;
        background-color: transparent;
        box-shadow: 0 0 0 var(--content-border-thickness) var(--content-border);
        margin-left: var(--content-border-thickness);
        position: relative;
        z-index: 1;
    }

    @media (display-mode: standalone) and (min-width: 535px)  {
        [data-mobile="false"] #content {
            margin-top: var(--content-border-thickness);
            border-top-left-radius: 8px;
        }

        [data-mobile="false"] #content:dir(rtl) {
            border-top-left-radius: 0;
            border-top-right-radius: 8px;
        }
    }

    #content:dir(rtl) {
        margin-left: 0;
        margin-right: var(--content-border-thickness);
    }

    @media screen and (max-width: 535px) {
        :global([data-theme="light"]) {
            --sidebar-bg: #0a0716;
            --sidebar-highlight: var(--primary);
        }

        #mostakim {
            display: grid;
            grid-template-columns: unset;
            grid-template-rows:
                1fr
                calc(
                    var(--sidebar-height-mobile) + var(--sidebar-inner-padding) * 2
                );
        }

        #content,
        #content:dir(rtl) {
            padding-top: env(safe-area-inset-top);
            order: -1;

            margin: 0;
            box-shadow: none;

            border-bottom-left-radius: calc(var(--border-radius) * 1.5);
            border-bottom-right-radius: calc(var(--border-radius) * 1.5);
        }
    }

    /* preload assets to prevent flickering when they appear on screen */
    #preload {
        width: 0;
        height: 0;
        position: absolute;
        z-index: -10;
        content: url(/meowbalt/smile.png) url(/meowbalt/error.png)
            url(/meowbalt/question.png) url(/meowbalt/think.png);

        font-family: "Noto Sans Mono";
        font-size: 0;
        opacity: 0;

        pointer-events: none;
        user-select: none;
        -webkit-user-select: none;
        -webkit-user-drag: none;
    }
</style>
