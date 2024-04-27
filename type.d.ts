
import type { NativeStackScreenProps, NativeStackNavigationProp  } from '@react-navigation/native-stack'


export type LoginStackNavigatorParamList = {
    Login: undefined;
    Movies: undefined;
}

export type LoginScreenNavigationProp = NativeStackNavigationProp <
    LoginStackNavigatorParamList,
    Login, Movies
>