import React from "react";

import {
  View,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Platform,
} from "react-native";
import Animated from "react-native-reanimated";
import Analytics from "../../../config/Analytics";

import Footer from "./Footer";
import Empty from "./Empty";

import Interactable from "./Interactable";
import Card from "./Card";
import Header from "./Header";
import RateModal from "./RateModal";

import { connect } from "react-redux";
import { sendVotes } from "../../store/votesSlice";
import { incIndex } from "../../store/quotesSlice";
import { incTotalSessions, setRated } from "../../store/statsSlice";

const { Value, interpolateNode, concat } = Animated;
const { width, height } = Dimensions.get("window");
const φ = (1 + Math.sqrt(5)) / 2;
const deltaX = width / 2;
const w = width - 32;
const h = w * φ;
const α = Math.PI / 12;
const A = width * Math.cos(α) + height * Math.sin(α);

class Quotes extends React.PureComponent {
  x = new Value(0);
  y = new Value(0);
  rateCount = 0;

  state = {
    isRateOpen: false,
  };
  componentDidMount = () => {
    Analytics.track(Analytics.events.QUOTES_PAGE_OPENED);
    this.props.incTotalSessions();
  };

  openRateModalIfPossible = () => {
    if (Platform.OS !== "ios") {
      return;
    }

    if (this.rateCount < 4) {
      return;
    }

    if (this.props.rated || this.props.totalSessions < 2) {
      return;
    }

    this.props.setRated(true);
    this.setState({ isRateOpen: true });
  };

  closeRateModal = () => {
    this.setState({ isRateOpen: false });
  };

  onSnap = ({ nativeEvent: { x } }) => {
    this.x.setValue(0);
    if (x !== 0) {
      let up = false;
      if (x > 0) {
        up = true;
      }
      const quote = this.props.quotes[this.props.currentIndex];
      const vote = {
        quote_id: quote._id,
        like: up ? 1 : -1,
      };
      this.props.sendVotes(vote);
      this.props.incIndex();

      this.rateCount = this.rateCount + 1;
      if (up) {
        this.openRateModalIfPossible();
      }
    }
  };

  render() {
    const { onSnap } = this;
    const { quotes } = this.props;
    const { currentIndex } = this.props;

    const x = this.x;
    const y = this.y;

    const quote = quotes[currentIndex];
    const nextQuote =
      currentIndex < quotes.length ? quotes[currentIndex + 1] : null;
    const isEmpty = quotes.length === currentIndex;

    const rotateZ = concat(
      interpolateNode(x, {
        inputRange: [-1 * deltaX, deltaX],
        outputRange: [α, -1 * α],
        extrapolate: "clamp",
      }),
      "rad"
    );
    const likeOpacity = interpolateNode(x, {
      inputRange: [0, deltaX / 4],
      outputRange: [0, 1],
    });
    const nopeOpacity = interpolateNode(x, {
      inputRange: [(-1 * deltaX) / 4, 0],
      outputRange: [1, 0],
    });
    const translateX = x;
    const translateY = y;
    const style = {
      ...StyleSheet.absoluteFillObject,
      transform: [{ translateX }, { translateY }, { rotateZ }],
    };

    return (
      <SafeAreaView style={styles.container}>
        <Header quote={quote} isEmpty={isEmpty} />
        <View style={styles.cards}>
          {nextQuote ? (
            <View style={styles.placeholder}>
              <Card quote={nextQuote} />
            </View>
          ) : (
            <Empty />
          )}
          {!isEmpty && (
            <Interactable
              key={
                this.props.totalSessions.toString() +
                "_" +
                currentIndex.toString() +
                "_" +
                this.props.rated.toString() +
                "-" +
                this.state.isRateOpen.toString()
              }
              snapPoints={[{ x: -1 * A }, { x: 0 }, { x: A }]}
              style={{ ...StyleSheet.absoluteFill, zIndex: 2 }}
              {...{ onSnap, x, y }}
            >
              <Animated.View {...{ style }}>
                <Card {...{ quote, likeOpacity, nopeOpacity }} />
              </Animated.View>
            </Interactable>
          )}
        </View>
        {!isEmpty && <Footer quote={quote} onChange={onSnap} x={x} y={y} />}
        <RateModal
          open={this.state.isRateOpen}
          onClose={this.closeRateModal.bind(this)}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  placeholder: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    zIndex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#fbfaff",
    justifyContent: "space-around",
  },
  cards: {
    flex: 1,
    flexGrow: 8,
    width: w,
    marginLeft: 16,
    alignItems: "center",
  },
});

const mapStateToProps = (state) => ({
  currentIndex: state.quotes.currentIndex,
  totalSessions: state.stats.totalSessions,
  rated: state.stats.rated,
});

export default connect(mapStateToProps, {
  sendVotes,
  setRated,
  incTotalSessions,
  incIndex,
})(Quotes);
