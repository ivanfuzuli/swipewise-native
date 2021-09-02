import { Share } from "react-native";

export default letsShare = async (author, title, quote) => {
  try {
    const result = await Share.share({
      message: `A quote for you from swipewise:\n"${quote}" by ${author}`,
    });

    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    alert(error.message);
  }
};
