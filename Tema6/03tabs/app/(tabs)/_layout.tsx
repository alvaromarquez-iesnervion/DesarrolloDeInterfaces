import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs>
        <Tabs.Screen name="index" options={{title: 'Home'}}/>
        <Tabs.Screen name="profile" options={{title: 'Perfil'}}/>
        <Tabs.Screen name="search" options={{title: 'Busqueda'}}/>
    </Tabs>
    );
}