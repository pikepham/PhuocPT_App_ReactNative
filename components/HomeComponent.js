import React, { Component } from "react";
import { View, ScrollView, Text } from "react-native";
import { Card, Image } from "react-native-elements";
import { baseUrl } from "../shared/baseUrl";
import { connect } from "react-redux";
import Loading from "./LoadingComponent";
import * as Animatable from "react-native-animatable";
const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    promotions: state.promotions,
    leaders: state.leaders,
  };
};

class RenderItem extends Component {
  render() {
    if (this.props.isLoading) {
      return <Loading />;
    } else if (this.props.errMess) {
      return <Text>{this.props.errMess}</Text>;
    } else {
      const item = this.props.item;
      if (item != null) {
        return (
          <Card>
            <Image
              source={{ uri: baseUrl + item.image }}
              style={{
                width: "100%",
                height: 100,
                flexGrow: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Card.FeaturedTitle>{item.name}</Card.FeaturedTitle>
              <Card.FeaturedSubtitle>{item.designation}</Card.FeaturedSubtitle>
            </Image>
            <Text style={{ margin: 10 }}>{item.description}</Text>
          </Card>
        );
      }
      return <View />;
    }
  }
}

class Home extends Component {
  render() {
    const dish = this.props.dishes.dishes.filter(
      (dish) => dish.featured === true
    )[0];
    const promo = this.props.promotions.promotions.filter(
      (promo) => promo.featured === true
    )[0];
    const leader = this.props.leaders.leaders.filter(
      (leader) => leader.featured === true
    )[0];
    return (
      <ScrollView>
        <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
          <RenderItem
            item={dish}
            isLoading={this.props.dishes.isLoading}
            errMess={this.props.dishes.errMess}
          />
        </Animatable.View>
        <Animatable.View animation="fadeInRight" duration={2000} delay={1000}>
          <RenderItem
            item={promo}
            isLoading={this.props.dishes.isLoading}
            errMess={this.props.dishes.errMess}
          />
        </Animatable.View>

        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
          <RenderItem
            item={leader}
            isLoading={this.props.dishes.isLoading}
            errMess={this.props.dishes.errMess}
          />
        </Animatable.View>
      </ScrollView>
    );
  }
}
export default connect(mapStateToProps)(Home);
