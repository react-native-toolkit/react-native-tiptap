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
  mentions?: string[];
  // placeholder?: string;
  // styleSheet?: string;
  // styleMap?: object;
  onEditorReady?: () => unknown;
  defaultValue: { html: string } | { json: Record<string, unknown> };
}

export type AvailableActions = typeof actionsList[number];

export interface TipTapEditorState {
  activeStates: Partial<Record<AvailableActions, boolean>>;
  data: { html: string; json: string };
  isReady: boolean;
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
      isReady: false,
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

    /**
     * Received first message, editor is ready
     */
    if (!this.state.isReady) {
      this.setState({ isReady: true }, () => {
        this.setDefaultValue();
        this.setMentions();
      });
    }

    this.props.onEditorUpdate?.({
      activeStates: activeStatesFromWebView,
      data: editorData,
      isReady: this.state.isReady,
    });
  };

  setDefaultValue = () => {
    const { defaultValue } = this.props;
    // @ts-ignore
    if (defaultValue?.html) {
      this._webViewRef.current &&
        this._webViewRef.current.injectJavaScript(
          // @ts-ignore
          `window.setContentHtml(${defaultValue.html});true;`
        );
    }
    // @ts-ignore
    if (defaultValue?.json) {
      this._webViewRef.current &&
        this._webViewRef.current.injectJavaScript(
          // @ts-ignore
          `window.setContentHtml(${JSON.stringify(defaultValue.json)});true;`
        );
    }
  };

  setMentions = () => {
    const { mentions } = this.props;
    if (mentions && mentions.length) {
      console.log(`window.setMentions(${JSON.stringify(mentions)});true;`);

      this._webViewRef.current &&
        this._webViewRef.current.injectJavaScript(
          // @ts-ignore
          `window.setMentions('${JSON.stringify(mentions)}');true;`
        );
    }
  };

  render() {
    const { style = { flex: 1 }, ...otherProps } = this.props;

    return (
      <WebView
        ref={this._webViewRef}
        style={style}
        source={{ uri: 'https://csb-hyzxr.netlify.app/' }}
        keyboardDisplayRequiresUserAction={false}
        originWhitelist={['https://csb-hyzxr.netlify.app']}
        onMessage={this._onMessage}
        {...otherProps}
      />
    );
  }
}

export default TipTapEditor;
