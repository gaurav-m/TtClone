/**
 * This class is responsible for loading the Flashcard.
 * 
 * by Gaurav Mittal
 */
import React, { useState, useEffect } from 'react'
import { Text, View, Image, StyleSheet, TouchableWithoutFeedback, Pressable, ToastAndroid, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { fetchFlashcard } from '../network/Api';
import { FlashCardDto } from '../network/DTOs';
import Colors from '../constants/Colors';
import StringConstants from '../constants/StringConstants';
import { DimensionConstants } from '../constants/DimensionConstants';

function FlashcardContentPage(cardIndex: number) {
    const [flashCardData, setFlashCardData] = useState<FlashCardDto>();

    useEffect(() => {
        // Call the function
        console.log(cardIndex + '. useEffect call received')
        if (cardIndex >= 0) {
            fetchFlashcard()
                .then(result => {
                    setFlashCardData(result.data)
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, []);
    return (
        <View style={styles.containerParent}>
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={['#001D28', '#00425A']}
                style={styles.bgLinearGradient}>

                {
                    flashCardData ?
                        <FlashCardUI cardNumber={cardIndex + 1} data={flashCardData} /> :
                        <PlaceholderUI cardNumber={cardIndex + 1} />
                }

            </LinearGradient>
        </View>
    );
};

interface FlashUIDataProp {
    cardNumber: number;
    data: FlashCardDto;
}

interface PlaceHolderUIDataProp {
    cardNumber: number;
}

const FlashCardUI = (dataProp: FlashUIDataProp) => {
    const cardNumber = dataProp.cardNumber
    const flashcardData = dataProp.data
    const [showFront, setShowFront] = useState(true);
    const feedbackButtonData = [
        { value: '1', color: '#F17D23' },
        { value: '2', color: '#FBB668' },
        { value: '3', color: '#FFD449' },
        { value: '4', color: '#16624F' },
        { value: '5', color: '#1F8A70' },
    ]
    const [liked, setLiked] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);

    return (
        <View>
            <View style={styles.containerContent} >
                <TouchableWithoutFeedback onPress={() => setShowFront(!showFront)}>
                    <View style={styles.containerQA}>
                        <View style={styles.containerQA}>
                            {
                                showFront ?
                                    <View style={styles.containerQA} >
                                        {/* Showing card front (question only) */}
                                        <Text style={styles.textQuestion}>
                                            {flashcardData?.flashcard_front}
                                        </Text>
                                    </View> : <View style={styles.containerQA} >
                                        {/* Showing card back (with answer) */}
                                        <Text style={styles.textQuestion}>
                                            {flashcardData?.flashcard_front}
                                        </Text>
                                        <View style={styles.divider} />
                                        <Text style={styles.textTitleAnswer}>
                                            {StringConstants.ANSWER}
                                        </Text>
                                        <Text style={styles.textAnswer}>
                                            {flashcardData?.flashcard_back}
                                        </Text>

                                        <View style={styles.containerFeedback}>
                                            <Text style={styles.textFeedbackQuestion}>
                                                {StringConstants.FEEDBACK_QUESTION}
                                            </Text>
                                            <View style={styles.containerFeedbackButtons}>
                                                {
                                                    feedbackButtonData.map((buttonData, index) => {
                                                        return (
                                                            <Pressable
                                                                key={buttonData.value}
                                                                style={[styles.feedbackButton, { backgroundColor: buttonData.color }]}
                                                                onPress={() => showToast('Pressed Feedback Response ' + buttonData.value)}>
                                                                <Text style={styles.textFeedbackButton}>{buttonData.value}</Text>
                                                            </Pressable>
                                                        );
                                                    })
                                                }
                                            </View>
                                        </View>
                                    </View>
                            }
                        </View>
                        <View style={styles.containerDescription}>
                            <Text style={styles.textUserName}>
                                {flashcardData?.user.name}
                            </Text>
                            <Text style={styles.textDescription}>
                                {flashcardData?.description}
                            </Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>

                <View style={styles.containerActionButtonStrip} >
                    <TouchableWithoutFeedback onPress={() => {
                        showToast('Profile Clicked')
                    }}>
                        <Image
                            style={styles.imageAvatar}
                            source={{ uri: (flashcardData.user.avatar) }}
                        />
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => {
                        setLiked(!liked)
                        showToast('Like Clicked')
                    }}>
                        <View style={styles.containerActionItem} >
                            <MaterialCommunityIcons
                                name='heart'
                                color={liked ? Colors.LIKED : Colors.PRIMARY}
                                size={DimensionConstants.ICON_ACTION_REEL}
                            />
                            <Text style={styles.textActionButton}>87</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => {
                        showToast('Comment Clicked')
                    }}>
                        <View style={styles.containerActionItem} >
                            <MaterialCommunityIcons
                                name='comment-processing'
                                color={Colors.PRIMARY}
                                size={DimensionConstants.ICON_ACTION_REEL}
                            />
                            <Text style={styles.textActionButton}>3</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => {
                        setBookmarked(!bookmarked)
                        showToast('Bookmark Clicked')
                    }}>
                        <View style={styles.containerActionItem} >
                            <MaterialCommunityIcons
                                name='bookmark'
                                color={bookmarked ? Colors.BOOKMARKED : Colors.PRIMARY}
                                size={DimensionConstants.ICON_ACTION_REEL}
                            />
                            <Text style={styles.textActionButton}>245</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => {
                        showToast('Share Clicked')
                    }}>
                        <View style={styles.containerActionItem} >
                            <MaterialCommunityIcons
                                name='share'
                                color={Colors.PRIMARY}
                                size={DimensionConstants.ICON_ACTION_REEL}
                            />
                            <Text style={styles.textActionButton}>17</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => {
                        showToast('Flip Clicked')
                    }}>
                        <View style={styles.containerActionItem} >
                            <View style={styles.containerFlipIcon} >
                                <MaterialCommunityIcons
                                    name='sync'
                                    color={Colors.PRIMARY}
                                    size={DimensionConstants.ICON_ACTION_REEL}
                                />
                            </View>
                            <Text style={styles.textActionButton}>Flip</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>

            </View>

            <View style={styles.containerPlaylist}>
                <Text style={styles.textPlaylist}>
                    {flashcardData?.playlist}
                </Text>
            </View>
        </View>
    );
}

const PlaceholderUI = (dataProp: PlaceHolderUIDataProp) => {
    const cardNumber = dataProp.cardNumber
    return (
        <View style={styles.containerPlaceholder}>
            <ActivityIndicator
                size={40}
                color={Colors.PRIMARY}
            />
            <Text style={{ color: Colors.PRIMARY_INACTIVE, fontSize: 20, fontWeight: 'bold', marginTop: 20 }}>
                {'Loading FlashCard No. ' + cardNumber + '...'}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    containerParent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerPlaceholder: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerContent: {
        flex: 1,
        flexDirection: 'row',
        padding: 16,
        paddingTop: 120,
    },
    containerActionButtonStrip: {
        marginLeft: 16,
        justifyContent: 'flex-end',
    },
    containerActionItem: {
        alignItems: 'center',
        marginTop: 16
    },
    imageAvatar: {
        height: 44,
        width: 44,
        borderRadius: 22,
        borderWidth: 1,
        borderColor: Colors.PRIMARY,
        resizeMode: 'cover'
    },
    containerFlipIcon: {
        padding: 4,
        backgroundColor: '#28B18F',
        borderColor: 'red',
        borderRadius: 19,
        transform: [{
            rotateY: '180deg',
        }, {
            rotateZ: '90deg'
        }]
    },
    textActionButton: {
        color: Colors.TEXT,
        fontSize: 12,
        fontWeight: '500',
    },
    containerQA: {
        flex: 1,
        justifyContent: 'center',
    },
    bgLinearGradient: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textQuestion: {
        color: Colors.TEXT,
        fontSize: 21,
        fontWeight: '400',
    },
    textTitleAnswer: {
        color: '#2DC59F',
        fontSize: 13,
        fontWeight: '800',
    },
    textAnswer: {
        flex: 1,
        color: Colors.TEXT,
        fontSize: 21,
        fontWeight: '400',
        opacity: 0.7,
        marginTop: 4,
    },
    containerFeedback: {
        marginTop: 16,
    },
    textFeedbackQuestion: {
        color: Colors.TEXT,
        fontSize: 15,
        fontWeight: '400',
        opacity: 0.6,
        marginTop: 16,
    },
    containerFeedbackButtons: {
        flexDirection: 'row',
        marginTop: 6,
        justifyContent: 'space-between'
    },
    feedbackButton: {
        height: 48,
        aspectRatio: 1 / 1,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textFeedbackButton: {
        color: Colors.TEXT,
        fontSize: 17,
        fontWeight: '600',
    },
    containerDescription: {
        marginTop: 16,
    },
    textUserName: {
        color: Colors.TEXT,
        fontSize: 15,
        fontWeight: '600',
    },
    textDescription: {
        color: Colors.TEXT,
        fontSize: 12,
        fontWeight: '400',
        marginTop: 6,
    },
    containerPlaylist: {
        flexDirection: 'row',
        backgroundColor: '#161616',
        paddingVertical: 10,
        paddingHorizontal: 14,
    },
    textPlaylist: {
        width: '100%',
        color: Colors.TEXT,
        fontSize: 13,
        fontWeight: '600',
    },
    divider: {
        marginVertical: 24,
        width: '100%',
        height: 2,
        backgroundColor: Colors.PRIMARY,
        opacity: 0.2,
    },

})
const showToast = (toastMessage: string) => {
    ToastAndroid.show('Flashcard ' + toastMessage, ToastAndroid.SHORT);
}
export default FlashcardContentPage