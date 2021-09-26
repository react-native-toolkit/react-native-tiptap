import React, { Component, createRef } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import WebView, {
  WebViewMessageEvent,
  WebViewProps,
} from 'react-native-webview';

export const actionsList = Object.freeze([
  'bold',
  'italic',
  'strike',
  'code',
  'clearMarks',
  'clearNodes',
  'paragraph',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'bulletList',
  'orderedList',
  'codeBlock',
  'blockQuote',
  'horizontalRule',
  'hardBreak',
  'undo',
  'redo',
  'left',
  'center',
  'right',
  'justify',
] as const);

export interface TipTapEditorProps
  extends Omit<
    WebViewProps,
    | 'source'
    | 'onMessage'
    | 'keyboardDisplayRequiresUserAction'
    | 'originWhitelist'
  > {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onEditorUpdate?: (state: TipTapEditorState) => unknown;
  style?: StyleProp<ViewStyle>;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onStyleChanged?: (styles: string[]) => unknown;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onBlockTypeChanged?: (blockType: string) => unknown;
  placeholder?: string;
  defaultValue?: string;
  styleSheet?: string;
  styleMap?: object;
  blockRenderMap?: object;
  onEditorReady?: () => unknown;
}

export type AvailableActions = typeof actionsList[number];

export interface TipTapEditorState {
  activeStates: Partial<Record<AvailableActions, boolean>>;
  data: { html: string; json: string };
}

class TipTapEditor extends Component<TipTapEditorProps, TipTapEditorState> {
  _webViewRef = createRef<WebView>();

  constructor(props: TipTapEditorProps) {
    super(props);

    this.state = {
      activeStates: {},
      data: {
        html: '',
        json: '',
      },
    };
  }

  toggle = (functionName: typeof actionsList[number]) => {
    this._webViewRef.current &&
      this._webViewRef.current.injectJavaScript(
        `window.${functionName}();true;`
      );
  };

  _onMessage = (event: WebViewMessageEvent) => {
    const { data } = event.nativeEvent;
    const {
      activeStates: activeStatesFromWebView = {},
      data: editorData = { html: '', json: '' },
    } = JSON.parse(data ?? '{}') as {
      activeStates: TipTapEditorState['activeStates'];
      data: TipTapEditorState['data'];
    };
    this.setState({
      activeStates: activeStatesFromWebView,
      data: editorData,
    });
    this.props.onEditorUpdate?.({
      activeStates: activeStatesFromWebView,
      data: editorData,
    });
  };

  render() {
    const { style = { flex: 1 }, ...otherProps } = this.props;

    return (
      <WebView
        ref={this._webViewRef}
        style={style}
        source={{ uri: 'https://csb-e6ykz.netlify.app/' }}
        keyboardDisplayRequiresUserAction={false}
        originWhitelist={['https://csb-e6ykz.netlify.app']}
        onMessage={this._onMessage}
        {...otherProps}
      />
    );
  }
}

export default TipTapEditor;
