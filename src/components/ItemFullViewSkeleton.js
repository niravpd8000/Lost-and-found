/**
 *  file: ItemFullViewSkeleton.js
 *  author: Nirav Pravinbhai Dhameliya <ndj585@uregina.ca>
 *  version: 0.1
 *  date-created: April-11-2022
 *  last-modified: April-11-2022
 */
import * as React from 'react';
import {StyleSheet} from "react-native";
import SkeletonContent from 'react-native-skeleton-content';

/**
 * ItemFullViewSkeleton
 * @returns {JSX.Element}
 * @constructor
 */
const ItemFullViewSkeleton = () => {
    /**
     * Reusable ItemFullViewSkeleton Component with custom style
     */
    return (
        <SkeletonContent
            containerStyle={styles.container}
            isLoading={true}
            layout={[
                {width: "100%", height: 200, marginBottom: 6},
                {
                    flexDirection: 'row',
                    width: "100%",
                    justifyContent: 'space-between',
                    padding: 10,
                    paddingHorizontal: 20,
                    paddingBottom: 0,
                    children: [
                        {
                            flexDirection: 'column',
                            width: 200,
                            marginVertical: 'auto',
                            children: [
                                {width: 160, height: 20, marginBottom: 10},
                                {width: 200, height: 10, marginBottom: 10},
                            ]
                        },
                        {width: 105, height: 50, borderRadius: 25},
                    ]
                },
                {width: 200, height: 10, marginHorizontal: 20, marginBottom: 20},
                {width: 250, height: 20, marginHorizontal: 20, marginBottom: 20},
                {width: 250, height: 20, marginHorizontal: 20, marginBottom: 20},
                {width: 250, height: 20, marginHorizontal: 20, marginBottom: 20},
                {width: 250, height: 20, marginHorizontal: 20, marginBottom: 20},
                {width: 250, height: 20, marginHorizontal: 20, marginBottom: 20},
                {width: 250, height: 20, marginHorizontal: 20, marginBottom: 20},
                {width: 250, height: 20, marginHorizontal: 20, marginBottom: 20},
                {width: 250, height: 20, marginHorizontal: 20, marginBottom: 20},
            ]}
        />
    );
}
/**
 *
 * @type {{
 * container: {elevation: number, backgroundColor: string, overflow: string, borderRadius: number, width: string, marginBottom: number,
 * shadowOffset: {width: number, height: number}, shadowOpacity: number, shadowColor: string},
 * image: {height: number},
 * customImage: {height: number},
 * details: {padding: number, alignItems: string, flex: number, flexDirection: string, width: string, justifyContent: string},
 * title: {fontSize: number, fontWeight: string}
 * }}
 *
 */
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#eee",
        borderRadius: 10,
        width: "100%",
        overflow: "hidden",
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        elevation: 4,
    },
    image: {
        height: 200
    },
    title: {
        fontSize: 18,
        fontWeight: "bold"
    },
    details: {
        padding: 20,
        flex: 1,
        width: "100%",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    customImage: {
        height: 200
    }
});

export default ItemFullViewSkeleton;