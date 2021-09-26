import React, { useRef, MutableRefObject, useState, FC } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import TipTapEditor, { actionsList, TipTapEditorState } from '../../src/index';

const ControlButton: FC<{
  text: string;
  action: () => unknown;
  isActive: boolean;
}> = ({
  text,
  action,
  isActive,
}: {
  text: string;
  action: () => unknown;
  isActive: boolean;
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.controlButtonContainer,
        // eslint-disable-next-line react-native/no-inline-styles
        isActive ? { backgroundColor: 'gold' } : {},
      ]}
      onPress={action}
    >
      <Text>{text}</Text>
    </TouchableOpacity>
  );
};

const EditorToolBar: FC<{
  editorRef: MutableRefObject<TipTapEditor | undefined>;
  editorState: TipTapEditorState | undefined;
}> = ({
  editorRef,
  editorState,
}: {
  editorRef: MutableRefObject<TipTapEditor | undefined>;
  editorState: TipTapEditorState | undefined;
}) => {
  return (
    <View>
      <ScrollView horizontal={true}>
        {actionsList.map((each, eachIndex) => {
          return (
            <ControlButton
              key={eachIndex}
              text={each}
              // @ts-ignore
              isActive={editorState.activeStates[each]}
              action={() => editorRef.current?.toggle(each)}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default function App() {
  const editorRef = useRef<TipTapEditor>();
  const [editorState, setEditorState] = useState<TipTapEditorState>();

  return (
    <View style={styles.container}>
      <EditorToolBar editorState={editorState} editorRef={editorRef} />
      <TipTapEditor
        // @ts-ignore
        ref={editorRef}
        onEditorUpdate={(state) => setEditorState(state)}
        style={styles.editorContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  editorContainer: {
    flex: 1,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  toolbarContainer: {
    height: 56,
    flexDirection: 'row',
    backgroundColor: 'silver',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  controlButtonContainer: {
    padding: 8,
    borderRadius: 2,
    height: 50,
  },
});
