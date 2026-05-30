<script>
    import { t } from "$lib/i18n/translations";

    import Omnibox from "$components/save/Omnibox.svelte";
    import Meowbalt from "$components/misc/Meowbalt.svelte";
    import SupportedServices from "$components/save/SupportedServices.svelte";
</script>

<svelte:head>
    <title>{$t("general.cobalt")}</title>
    <meta property="og:title" content={$t("general.cobalt")} />
</svelte:head>

<div id="cobalt-save-container" class="center-column-container">
    <div class="neo-header-bar">
        <SupportedServices />
    </div>

    <main
        id="cobalt-save"
        tabindex="-1"
        data-first-focus
    >
        <div class="mascot-wrapper">
            <div class="mascot-glow"></div>
            <Meowbalt emotion="smile" />
        </div>
        <div class="omnibox-wrapper">
            <Omnibox />
        </div>
    </main>

    <footer id="neo-footer">
        <div class="footer-inner">
            <span class="footer-text">
                {$t("save.terms.note.agreement")}
                <a href="/about/terms" class="footer-link">{$t("save.terms.note.link")}</a>
            </span>
        </div>
    </footer>
</div>

<style>
    #cobalt-save-container {
        padding: 0;
        overflow: hidden;
        height: 100%;
        position: relative;
        justify-content: space-between;
    }

    .neo-header-bar {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 12px 16px;
        padding-top: max(12px, env(safe-area-inset-top));
        background: transparent;
        flex-shrink: 0;
    }

    #cobalt-save {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        flex: 1;
        gap: 20px;
        padding: 16px;
        box-sizing: border-box;
    }

    .mascot-wrapper {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .mascot-glow {
        position: absolute;
        width: 120px;
        height: 120px;
        border-radius: 50%;
        background: radial-gradient(circle, var(--accent) 0%, transparent 70%);
        opacity: 0.15;
        filter: blur(20px);
        animation: neo-pulse 5s ease-in-out infinite;
    }

    :global([data-reduce-motion="true"]) .mascot-glow {
        animation: none;
    }

    .omnibox-wrapper {
        width: 100%;
        display: flex;
        justify-content: center;
    }

    #neo-footer {
        width: 100%;
        flex-shrink: 0;
        padding: 10px 20px;
        padding-bottom: max(10px, calc(env(safe-area-inset-bottom) + 4px));
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .footer-inner {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .footer-text {
        font-size: 12px;
        color: var(--gray);
        font-weight: 500;
        text-align: center;
        opacity: 0.8;
    }

    .footer-link {
        color: var(--accent);
        text-decoration: underline;
        text-underline-offset: 3px;
        opacity: 0.9;
        transition: opacity 0.15s ease;
    }

    .footer-link:hover {
        opacity: 1;
    }

    @media screen and (max-width: 535px) {
        .neo-header-bar {
            padding: 8px 12px;
        }

        #cobalt-save {
            gap: 16px;
            padding: 12px;
        }

        .footer-text {
            font-size: 11px;
        }

        #neo-footer {
            padding: 6px 12px;
            padding-bottom: max(6px, env(safe-area-inset-bottom));
        }
    }
</style>
