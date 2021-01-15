import React from "react";
import {
  Container,
  Content,
  ListItem,
  List,
  Left,
  Right,
  Icon,
  Text,
} from "native-base";
const Settings = ({ navigation }) => {
  return (
    <Container>
      <Content>
        <List>
          <ListItem onPress={() => navigation.navigate("Change Email")}>
            <Left>
              <Text>Change E-Mail</Text>
            </Left>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem onPress={() => navigation.navigate("Change Password")}>
            <Left>
              <Text>Change Password</Text>
            </Left>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem>
            <Left>
              <Text>Logout</Text>
            </Left>
          </ListItem>
        </List>
      </Content>
    </Container>
  );
};

export default Settings;
