import React, {memo} from 'react';
import {View} from 'react-native';
import {StyleService, useStyleSheet} from '@ui-kitten/components';
import {useTranslation} from 'react-i18next';

import Text from 'components/Text';
import Content from 'components/Content';
import Container from 'components/Container';
import {Images} from 'assets/images';
import ButtonOptional, {ButtonOptionalProps} from './Components/ButtonOptional';
import useToggle from 'hooks/useToggle';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from 'navigation/types';
import HeaderMoreOption from './Components/HeaderMoreOption';

const MoreSrc = memo(() => {
  const styles = useStyleSheet(themedStyles);
  const {t} = useTranslation(['more', 'payment', 'common']);

  const [darkMode, setDarkMode] = useToggle(false);
  const DATA_DETAILS: ButtonOptionalProps[] = [
    {
      title: t('more:my-post'),
      icon: 'myPost',
      status: 'facebook',
      navigateSrc: 'MyPost',
    },
    {
      title: t('more:my-children'),
      icon: 'stats',
      status: 'warning',
      navigateSrc: 'MyChildren',
    },
    {
      title: t('payment:payment-method'),
      icon: 'payment',
      status: 'success',
      navigateSrc: 'PaymentMethod',
    },
  ];
  const DATA_APPLICATION: ButtonOptionalProps[] = [
    {
      title: t('more:settings'),
      icon: 'setting',
      status: 'twitter-3',
      navigateSrc: 'ReferFriend',
    },
    {
      title: t('more:about-caren'),
      icon: 'stats',
      status: 'basic',
      navigateSrc: 'ReferFriend',
    },
    {
      title: t('more:help-&-faq'),
      icon: 'helpWhite',
      status: 'placeholder',
      navigateSrc: 'ReferFriend',
    },
    {
      title: t('more:privacy-of-policy'),
      icon: 'term',
      status: 'green',
      navigateSrc: 'ReferFriend',
    },
  ];
  const {navigate} = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <Container style={styles.container}>
      <Content padder contentContainerStyle={styles.content}>
        <HeaderMoreOption
          name={'Edith Johnson'}
          avatar={Images.avatar2}
          email={'lehieuds@gmail.com'}
        />
        <View style={styles.details}>
          <Text category="h6" bold>
            {t('more:myDetails')}
          </Text>
          {DATA_DETAILS.map((item, i) => {
            return (
              <ButtonOptional
                icon={item.icon}
                title={item.title}
                status={item.status}
                key={i}
                navigateSrc={item.navigateSrc}
              />
            );
          })}
          <ButtonOptional
            title={t('more:change-the-care-type')}
            icon={'changeJob'}
            status={'neutral'}
            navigateSrc={'ReferFriend'}
            onPress={() => {
              navigate('ChangeJobType');
            }}
          />
        </View>
        <View style={styles.application}>
          <Text category="h6" bold>
            {t('more:application')}
          </Text>
          {DATA_APPLICATION.map((item, i) => {
            return (
              <ButtonOptional
                icon={item.icon}
                title={item.title}
                status={item.status}
                key={i}
                navigateSrc={item.navigateSrc}
              />
            );
          })}
          <ButtonOptional
            withToggle
            icon="darkMode"
            title={t('more:switch-dark-mode')}
            status={'danger'}
            checked={darkMode}
            onPress={setDarkMode}
            navigateSrc={undefined}
          />
          <ButtonOptional
            title={t('more:refer-friend-&-family')}
            icon={'share'}
            status={'twitter'}
            navigateSrc={'ReferFriend'}
          />
        </View>
      </Content>
    </Container>
  );
});

export default MoreSrc;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    paddingTop: 24,
    paddingBottom: 80,
  },

  details: {
    marginBottom: 48,
  },
  application: {},
});
