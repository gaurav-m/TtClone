import React, { useCallback } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import InfinitePager, { Preset } from 'react-native-infinite-pager';
import FlashcardContentPage from '../components/FlashcardContentPage';
import Colors from '../constants/Colors';

function FlashcardScreen() {
    const renderPage = useCallback(({ index }: { index: number }) => {
        return (FlashcardContentPage(index));
    }, []);
    return (
        <GestureHandlerRootView
            style={[{ flex: 1, backgroundColor: Colors.BACKGROUND_SCREEN_DARK }]}>
            <InfinitePager
                key={`infinite-pager-${Preset.SLIDE}`}
                renderPage={renderPage}
                style={{ flex: 1 }}
                pageWrapperStyle={{ flex: 1 }}
                minIndex={0}
                preset={Preset.SLIDE}
                pageBuffer={3}
                vertical={true}
            />
        </GestureHandlerRootView>
    );
}

export default FlashcardScreen