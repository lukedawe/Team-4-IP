/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl('/')],

  config: {
    screens: {
      Root: {
        screens: {
          LogInTab: {
            screens: {
              LogInScreen: 'login',
            },
          },
          SignUpTab: {
            screens: {
              SignUpScreen: 'signup',

            },
          },
          SingleClientTab: {
            screens: {
              SingleClientScreen: 'singleclient',
            },
          },
          ListViewTab: {
            screens: {
              ListViewScreen: 'list',
            },
          },
          ProgressTab: {
            screens: {
              ProgressScreen: 'progress',
            },
          },
          HeatmapTab: {
            screens: {
              heatmapScreen: 'heatmap',
            },
          },
          AthleteTab: {
            screens: {
              AthleteScreen: 'athlete',
            },
          },
          HeatmapRecordTab: {
            screens: {
              heatmapScreen: 'heatmapRecord',
            },
          },
        },
      },
      Modal: 'modal',
      NotFound: '*',
    },
  },
};

export default linking;
