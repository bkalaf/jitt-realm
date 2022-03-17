import { getCurrentWindow, dialog } from '@electron/remote';

export type DialogType = 'info' | 'question';

export function useDialog(message: string, title: string, type: DialogType, ...buttons: string[]) {
    return function <T extends any[] = never[]>(...actions: Array<(...args: T) => void>) {
        return (...args: T) =>
            new Promise<void>((res, rej) => {
                if (actions.length !== buttons.length) rej(new Error('buttons and actions arrays have different member counts.'));
                const actionMap = new Map(actions.map((x, ix) => [ix, x]));
                const response = dialog.showMessageBoxSync(getCurrentWindow(), {
                    message,
                    title,
                    type,
                    buttons,
                    defaultId: 0
                });
                res(actionMap.get(response)!(...args));
            });
    };
}
