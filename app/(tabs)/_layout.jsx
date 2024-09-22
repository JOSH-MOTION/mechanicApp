import React from 'react';
import { Tabs } from 'expo-router';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faMapMarkerAlt, faHistory, faBell, faUser, faWrench } from '@fortawesome/free-solid-svg-icons';
import { View, Text } from 'react-native';

const TabIcon = ({ icon, color, focused, name }) => {
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', gap: 1 }}>
      <FontAwesomeIcon icon={icon} size={23} color={color} />
      <Text style={{ fontSize: 12, fontWeight: focused ? 'bold' : 'normal', color }}>
        {name}
      </Text>
    </View>
  );
};

const _layout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#FFA001",
          tabBarInactiveTintColor: "#FAFAFA",
          tabBarStyle: {
            backgroundColor: "#161622"
          }
        }}
      >
        <Tabs.Screen 
          name='home'
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={faHome}
                color={color}
                focused={focused}
                name="Home"
              />
            ),
          }}
        />
        <Tabs.Screen 
          name='map'
          options={{
            title: "Map",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={faMapMarkerAlt}
                color={color}
                focused={focused}
                name="Map"
              />
            ),
          }}
        />
        <Tabs.Screen 
          name='history'
          options={{
            title: "History",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={faHistory}
                color={color}
                focused={focused}
                name="History"
              />
            ),
          }}
        />
        <Tabs.Screen 
          name='notification'
          options={{
            title: "Notification",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={faBell}
                color={color}
                focused={focused}
                name="Notification"
              />
            ),
          }}
        />
        <Tabs.Screen 
          name='profile'
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={faUser}
                color={color}
                focused={focused}
                name="Profile"
              />
            ),
          }}
        />
        <Tabs.Screen 
  name='registration'
  options={{
    title: "RegisterMechanic",
    headerShown: false,
    tabBarIcon: ({ color, focused }) => (
      <TabIcon
        icon={faWrench}
        color={color}
        focused={focused}
        name="Register"
      />
    ),
  }}
/>

      </Tabs>
    </>
  );
};

export default _layout;
