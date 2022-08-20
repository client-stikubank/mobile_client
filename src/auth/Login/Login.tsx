import React, {memo} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';

import {
  StyleService,
  useStyleSheet,
  Input,
  Icon,
  Button,
} from '@ui-kitten/components';
import {
  CommonActions,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';
import useLayout from 'hooks/useLayout';

import Text from 'components/Text';
import Container from 'components/Container';
import {useTranslation} from 'react-i18next';
import {Images} from 'assets/images';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Controller, useForm} from 'react-hook-form';
import {RuleEmail, RulePassword} from 'utils/rules';
import useToggle from 'hooks/useToggle';
import Flex from 'components/Flex';
import {RootStackParamList} from 'navigation/types';
import useAuth from 'hooks/useAuth';
import {globalStyle} from 'styles/globalStyle';

const Login = memo(() => {
  const {navigate, dispatch} =
    useNavigation<NavigationProp<RootStackParamList>>();
  const {bottom} = useLayout();
  const styles = useStyleSheet(themedStyles);
  const {t} = useTranslation(['auth', 'common']);

  const {signIn} = useAuth();
  const nextScreen = React.useCallback((screenName: string) => {
    const resetAction = CommonActions.reset({
      index: 1,
      routes: [
        {
          name: screenName,
        },
      ],
    });
    dispatch(resetAction);
  }, []);

  const onLogin = () => {
    signIn();
    nextScreen('MainBottomTab');
  };
  const [invisible, setInvisible] = useToggle(true);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: 'lehieuds@gmail.com',
      password: '123456Aa',
    },
  });
  const [canContinue, setCanContinue] = React.useState(false);
  React.useEffect(() => {
    if (errors.email === undefined && errors.password === undefined) {
      setCanContinue(false);
    } else {
      setCanContinue(true);
    }
  }, [errors.email, errors.password]);
  const onFacebook = React.useCallback(() => {}, []);
  const onTwitter = React.useCallback(() => {}, []);
  const onAuth = React.useCallback(
    screen => () => {
      navigate('AuthStack', {screen: screen});
    },
    [],
  );
  return (
    <Container style={styles.container}>
      <KeyboardAwareScrollView contentContainerStyle={styles.content}>
        <Image source={Images.logo} />
        <Text mt={24} category="h7" mb={72}>
          {t('auth:welcome_back')}
        </Text>
        <Controller
          control={control}
          name="email"
          rules={RuleEmail}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              label={t('auth:email').toString()}
              status={errors.email ? 'warning' : 'basic'}
              style={styles.email}
              value={value}
              onChangeText={onChange}
              onTouchStart={handleSubmit(() => {})}
              onTouchEnd={handleSubmit(() => {})}
              onBlur={onBlur}
              keyboardType="email-address"
              caption={errors.email?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          rules={RulePassword}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              label={t('auth:password').toString()}
              status={errors.password ? 'warning' : 'basic'}
              style={styles.password}
              value={value}
              onTouchStart={handleSubmit(() => {})}
              onTouchEnd={handleSubmit(() => {})}
              onChangeText={onChange}
              onBlur={onBlur}
              keyboardType="email-address"
              caption={errors.password?.message}
              secureTextEntry={invisible}
              accessoryRight={props => (
                <TouchableOpacity activeOpacity={0.7} onPress={setInvisible}>
                  <Icon
                    {...props}
                    pack="assets"
                    name={!invisible ? 'eyeOn' : 'eyeOff'}
                  />
                </TouchableOpacity>
              )}
            />
          )}
        />
        <TouchableOpacity
          activeOpacity={0.54}
          onPress={onAuth('ForgetPassword')}
          style={styles.forgetPass}>
          <Text category="h8-s" status={'placeholder'} mv={24} center underline>
            {t('auth:forgot_password')}?
          </Text>
        </TouchableOpacity>
        <Button
          onPress={onLogin}
          disabled={canContinue}
          style={globalStyle.shadowBtn}>
          {t('auth:login').toString()}
        </Button>
        <Text category="h8-s" status={'placeholder'} mt={40} mb={38} center>
          {t('auth:or')}
        </Text>
        <View style={styles.facebook}>
          <Icon pack="assets" name={'facebook'} style={styles.logoSocial} />
          <Button
            status="outline"
            onPress={onFacebook}
            children={<Text>{`${t('auth:fb_login')}`}</Text>}
          />
        </View>
        <View>
          <Icon pack="assets" name={'twitter'} style={styles.logoSocial} />
          <Button
            status="outline"
            onPress={onTwitter}
            children={<Text>{`${t('auth:tw_login')}`}</Text>}
          />
        </View>
      </KeyboardAwareScrollView>
      <Flex center mb={bottom + 16} style={styles.bottom}>
        <Text category="h8-s">{t('auth:dont_have_an_account')}</Text>
        <TouchableOpacity activeOpacity={0.54} onPress={onAuth('SignupFirstStep')}>
          <Text status={'link'} category="h8-s">
            {t('auth:sign_up')}
          </Text>
        </TouchableOpacity>
      </Flex>
    </Container>
  );
});

export default Login;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  content: {
    marginTop: 40,
    paddingHorizontal: 24,
    zIndex: 10,
  },
  email: {
    borderBottomWidth: 2,
    marginBottom: 24,
  },
  password: {
    borderBottomWidth: 2,
  },
  facebook: {
    marginBottom: 16,
    flex: 1,
  },
  logoSocial: {
    position: 'absolute',
    left: 16,
    top: 14,
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
  },
  forgetPass: {
    alignSelf: 'center',
  },
});
