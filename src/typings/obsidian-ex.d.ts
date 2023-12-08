import {Command} from 'obsidian';

export interface ObsidianCommandInterface {
  executeCommandById(id: string): void;
  commands: {
    'editor:save-file': {
      callback(): void;
    };
  };
  listCommands(): Command[];
}

// allows for the removal of the any cast by defining some extra properties for Typescript so it knows these properties exist
declare module 'obsidian' {
  interface App {
    commands: ObsidianCommandInterface;
    dom: {
      appContainerEl: HTMLElement;
    };
    workspace: Workspace;
  }

  interface Workspace {
    getActiveFileView: () => FileView
  }


  interface Vault {
    getConfig(id: string): boolean;
  }

  interface FileView {
    /**
     * @public
     */
    allowNoFile: boolean;
    /**
     * File views can be navigated by default.
     * @inheritDoc
     * @public
     */
    navigation: boolean;

    /**
     * @public
     */
    getDisplayText(): string;
    /**
     * @public
     */
    onload(): void;
    /**
     * @public
     */
    getState(): any;

    /**
     * @public
     */
    setState(state: any, result: ViewStateResult): Promise<void>;
  }

  export interface ViewStateResult {
    /**
     * Set this to true to indicate that there is a state change which should be recorded in the navigation history.
     * @public
     */
    history: boolean;
  }
}


declare global {
  interface Window {
    CodeMirrorAdapter: {
      commands: {
        save(): void;
      }
    };
  }
}
