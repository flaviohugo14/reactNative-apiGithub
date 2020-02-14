import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
} from './styles';

export default class User extends Component {
  state = {
    stars: [],
    loading: true,
    page: 1,
  };

  static propTypes = {
    route: PropTypes.shape({
      params: PropTypes.shape,
    }).isRequired,
  };

  async componentDidMount() {
    const { route } = this.props;
    const { user } = route.params;
    const { page } = this.state;

    const response = await api.get(`/users/${user.login}/starred?page=${page}`);

    this.setState({ stars: response.data, loading: false });
  }

  loadMore = async () => {
    const { route } = this.props;
    const { user } = route.params;
    const { page, stars } = this.state;

    const response = await api.get(
      `/users/${user.login}/starred?page=${page + 1}`
    );

    this.setState({ stars: [...stars, ...response.data], page: page + 1 });
  };

  render() {
    const { stars } = this.state;
    const { route } = this.props;
    const { user } = route.params;
    const { loading } = this.state;

    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>
        {loading ? (
          <ActivityIndicator color="#999" style={{ paddingTop: 20 }} />
        ) : (
          <Stars
            onEndReachedThreshold={0.2}
            onEndReached={this.loadMore}
            data={stars}
            keyExtractor={star => String(star.id)}
            renderItem={({ item }) => (
              <Starred>
                <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                <Info>
                  <Title>{item.name}</Title>
                  <Author>{item.owner.login}</Author>
                </Info>
              </Starred>
            )}
          />
        )}
      </Container>
    );
  }
}
