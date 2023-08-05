/**
 * This class is responsible for loading the Flashcard.
 * 
 * by Gaurav Mittal
 */
import React, { useState, useEffect } from 'react'
import {
    Text,
    View,
    Image,
    ImageBackground,
    StyleSheet,
    TouchableHighlight,
    TouchableWithoutFeedback,
    Pressable,
    ToastAndroid,
    ActivityIndicator
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { fetchMcq, fetchMcqAnswer } from '../network/Api';
import { McqDto, McqAnswerDto } from '../network/DTOs';
import Colors from '../constants/Colors';
import StringConstants from '../constants/StringConstants';
import { DimensionConstants } from '../constants/DimensionConstants';

function McqContentPage(mcqIndex: number) {
    const [mcqData, setMcqData] = useState<McqDto>();

    useEffect(() => {
        // Call the function
        console.log(mcqIndex + '. useEffect call received')
        if (mcqIndex >= 0) {
            fetchMcq()
                .then(mcqResult => {
                    setMcqData(mcqResult.data)
                    console.log(mcqResult.data)
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, []);
    console.log(" will load mcq")
    return (
        <View style={styles.containerParent}>
            {
                mcqData ? <ImageBackground
                    style={styles.containerParent}
                    source={{ uri: (mcqData?.image) }}
                    resizeMode="cover">
                    <View style={[
                        styles.containerParent,
                        { backgroundColor: Colors.BACKGROUND_SCREEN_DARK_40 }
                    ]} >
                        <McqUI mcqNumber={mcqIndex + 1} data={mcqData} />
                    </View>
                </ImageBackground> : <PlaceholderUI mcqNumber={mcqIndex + 1} />
            }

        </View>
    );
};


interface McqUIDataProp {
    mcqNumber: number;
    data: McqDto;
}

interface PlaceholderUIDataProp {
    mcqNumber: number;
}

const McqUI = (dataProp: McqUIDataProp) => {
    const mcqNumber = dataProp.mcqNumber
    const mcqData = dataProp.data
    const [mcqCorrectOption, setMcqCorrectOption] = useState<String>();

    useEffect(() => {
        // Call the function
        console.log(mcqNumber + '. useEffect call received for answer')
        fetchMcqAnswer(mcqData.id)
            .then(mcqAnsResult => {
                setMcqCorrectOption(mcqAnsResult.data.correct_options[0].id)
            })
            .catch(error => {
                console.error(error);
            });
    }, []);
    const [choosenOption, setChoosenOption] = useState<String>();
    const [liked, setLiked] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);

    return (
        <View>
            <View style={styles.containerContent} >
                <View style={styles.containerInternal}>
                    <View style={styles.containerInternal}>

                        <View style={styles.containerQA} >
                            <Text style={styles.textQuestion}>
                                {mcqData.question}
                            </Text>
                            <View>
                                {
                                    mcqData.options.map((option) => {
                                        let bgColor = Colors.QUESTION_OPTION_DEAFULT
                                        let showThumbsUp = false
                                        let showThumbsDown = false
                                        if (choosenOption !== undefined && mcqCorrectOption !== undefined) {
                                            if (option.id === choosenOption) {
                                                bgColor = Colors.QUESTION_OPTION_INCORRECT
                                                showThumbsDown = choosenOption !== mcqCorrectOption
                                            }
                                            if (option.id === mcqCorrectOption) {
                                                bgColor = Colors.QUESTION_OPTION_CORRECT
                                                showThumbsUp = choosenOption === mcqCorrectOption
                                            }
                                        }

                                        return <TouchableHighlight
                                            key={option.id}
                                            style={[
                                                styles.containerOptionBox,
                                                { backgroundColor: bgColor }
                                            ]}
                                            onPress={() => {
                                                setChoosenOption(option.id)
                                            }} underlayColor={Colors.BLACK_40}>
                                            <View style={styles.containerOption}>
                                                <Text style={styles.textOption}>
                                                    {option.answer}
                                                </Text>
                                                <View style={{ width: 24 }}>
                                                    {
                                                        showThumbsUp ? <MaterialCommunityIcons
                                                            name='thumb-up'
                                                            color={Colors.PRIMARY}
                                                            size={24}
                                                        /> : null
                                                    }
                                                    {
                                                        showThumbsDown ? <MaterialCommunityIcons
                                                            name='thumb-down'
                                                            color={Colors.PRIMARY}
                                                            size={24}
                                                        /> : null
                                                    }
                                                </View>
                                            </View>
                                        </TouchableHighlight>



                                    })
                                }
                            </View>
                        </View>

                    </View>
                    <View style={styles.containerDescription}>
                        <Text style={styles.textUserName}>
                            {mcqData.user.name}
                        </Text>
                        <Text style={styles.textDescription}>
                            {mcqData.description}
                        </Text>
                    </View>
                </View>

                <View style={styles.containerActionButtonStrip} >
                    <TouchableWithoutFeedback onPress={() => {
                        showToast('Profile Clicked')
                    }}>
                        <Image
                            style={styles.imageAvatar}
                            source={{ uri: mcqData?.user.avatar as string }}
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
                </View>

            </View>

            <View style={styles.containerPlaylist}>
                <Text style={styles.textPlaylist}>
                    {mcqData.playlist}
                </Text>
            </View>
        </View>
    );
}

const PlaceholderUI = (dataProp: PlaceholderUIDataProp) => {
    const mcqNumber = dataProp.mcqNumber
    return (
        <View style={styles.containerPlaceholder}>
            <ActivityIndicator
                size={40}
                color={Colors.PRIMARY}
            />
            <Text style={{ color: Colors.PRIMARY_INACTIVE, fontSize: 20, fontWeight: 'bold', marginTop: 20 }}>
                {'Loading MCQ No. ' + mcqNumber + '...'}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    containerParent: {
        flex: 1,
        width: '100%',
        height: '100%',
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
    textActionButton: {
        color: Colors.TEXT,
        fontSize: 12,
        fontWeight: '500',
    },
    containerInternal: {
        flex: 1,
        justifyContent: 'center',
    },
    containerQA: {
        flex: 1,
        justifyContent: 'space-between',
    },
    textQuestion: {
        color: Colors.TEXT,
        fontSize: 22,
        fontWeight: '500',
        lineHeight: 28,
        backgroundColor: Colors.BACKGROUND_DARK_70,
        padding: 8,
        borderRadius: 8,
        marginTop: 56,
    },
    containerOptionBox: {
        width: '100%',
        marginVertical: 5,
        backgroundColor: Colors.QUESTION_OPTION_DEAFULT,
        borderRadius: 8,
    },
    containerOption: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
    },
    textOption: {
        flex: 1,
        color: Colors.TEXT,
        fontSize: 17,
        fontWeight: '500',
        textShadowColor: Colors.BLACK,
        textShadowRadius: 10,
        textShadowOffset: {
            width: 0.5,
            height: 0.5,
        },
        marginRight: 12,
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
    ToastAndroid.show('MCQ ' + toastMessage, ToastAndroid.SHORT);
}
export default McqContentPage