type MessageHandler = (data: any, event: MessageEvent) => void;

const iframeRegistry = new Map<string, HTMLIFrameElement>();
const handlersRegistry = new Map<HTMLIFrameElement, Set<MessageHandler>>();
const pendingHandlers = new Map<string, Set<MessageHandler>>();

let isListening = false;

function handleMessage(event: MessageEvent) {
  if (!event.source) return;

  for (const [iframe, handlers] of handlersRegistry.entries()) {
    if (event.source === iframe.contentWindow) {
      for (const handler of handlers) {
        handler(event.data, event);
      }
    }
  }
}

export function useIframeManager() {
  if (!isListening) {
    window.addEventListener("message", handleMessage);
    isListening = true;
  }

  return {
    registerIframe(id: string, el: HTMLIFrameElement) {
      iframeRegistry.set(id, el);
      if (!handlersRegistry.has(el)) {
        handlersRegistry.set(el, new Set());
      }

      // Attach any pending handlers for this iframe
      const pending = pendingHandlers.get(id);
      if (pending) {
        for (const handler of pending) {
          handlersRegistry.get(el)?.add(handler);
        }
        pendingHandlers.delete(id);
      }
    },

    unregisterIframe(id: string) {
      const iframe = iframeRegistry.get(id);
      if (iframe) {
        handlersRegistry.delete(iframe);
        iframeRegistry.delete(id);
      }
    },

    sendMessageToIframe(id: string, message: any) {
      const iframe = iframeRegistry.get(id);
      iframe?.contentWindow?.postMessage(message, "*");
    },

    broadcastMessage(message: any) {
      for (const iframe of iframeRegistry.values()) {
        iframe.contentWindow?.postMessage(message, "*");
      }
    },

    addMessageHandler(handler: MessageHandler, iframeId: string) {
      const iframe = iframeRegistry.get(iframeId);
      if (iframe) {
        if (!handlersRegistry.has(iframe)) {
          handlersRegistry.set(iframe, new Set());
        }
        handlersRegistry.get(iframe)!.add(handler);
      } else {
        // Queue the handler if iframe is not registered yet
        if (!pendingHandlers.has(iframeId)) {
          pendingHandlers.set(iframeId, new Set());
        }
        pendingHandlers.get(iframeId)!.add(handler);
      }
    },

    removeMessageHandler(handler: MessageHandler, iframeId: string) {
      const iframe = iframeRegistry.get(iframeId);
      handlersRegistry.get(iframe!)?.delete(handler);
      pendingHandlers.get(iframeId)?.delete(handler);
    },
  };
}
