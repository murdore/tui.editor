import { DOMOutputSpecArray } from 'prosemirror-model';

import Node from '@/spec/node';

import { EditorCommand } from '@t/spec';

export class ThematicBreak extends Node {
  get name() {
    return 'thematicBreak';
  }

  get defaultSchema() {
    return {
      group: 'block',
      parseDOM: [{ tag: 'hr' }],
      selectable: false,
      toDOM(): DOMOutputSpecArray {
        return ['div', ['hr']];
      }
    };
  }

  private hr(): EditorCommand {
    return () => (state, dispatch) => {
      const node = state.schema.nodes.thematicBreak.create();
      const tr = state.tr.replaceSelectionWith(node);

      dispatch!(tr.scrollIntoView());

      return true;
    };
  }

  commands() {
    return { hr: this.hr() };
  }

  keymaps() {
    const hrCommand = this.hr()();

    return {
      'Mod-l': hrCommand,
      'Mod-L': hrCommand
    };
  }
}