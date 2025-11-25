import  {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'; 
import { withLayoutContext } from 'expo-router';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const {Navigator} = createMaterialTopTabNavigator();
const MaterialTopTabs = withLayoutContext(Navigator);

export default function ProfileLayout() {
  return (
    <SafeAreaView style={{flex:1, backgroundColor:'white'}} edges={['top']}>
        <MaterialTopTabs
            screenOptions={{
                tabBarActiveTintColor: 'purple',
                tabBarIndicatorStyle: { backgroundColor: 'tomato', height: 4 },
                tabBarLabelStyle: { fontWeight: 'bold' }, 
            }}

            
        >
            <MaterialTopTabs.Screen 
                name="index" 
                options={{title: 'Info Perfil'}}
            />
            <MaterialTopTabs.Screen 
                name="ajustes" 
                options={{title: 'Ajustes Perfil'}}
            />
        </MaterialTopTabs>
    </SafeAreaView>
    );
}
