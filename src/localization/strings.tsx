const strings = {
  readSmsPermission: {
    title: 'Read SMS Permission',
    message:
      'This app needs access to your SMS messages to work properly. App reads all the messages and forward the message to the endpoint and chat id provided by you. In case no or incorrect details are provided, no messages will be forwarded. App does not share messages with any other 3rd party.',
    buttonNeutral: 'Ask Me Later',
    buttonNegative: 'Cancel',
    buttonPositive: 'OK',
    permissionDeniedMessage: 'Permission Denied',
    permanentlyDeniedMessage:
      'You have denied the permission to access to your SMS messages. Please enable it from the app settings.',
    openSettings: 'Open Settings',
  },
  grantSmsPermissionMessage: 'Please grant SMS permission to continue.',
  buttonMessages: 'Messages',
  buttonSettings: 'Settings',
  requestSmsPermission: 'Request Permission',
  privacyPolicy: 'Privacy Policy',
  privacyPolicyUrl: 'https://sites.google.com/view/forwardapp/home',
  darkMode: 'Dark Mode',
  welcome: 'Welcome',
  analyticsConsent: 'Analytics Consent',
  accessibilityLabels: {
    analyticsConsent: 'Analytics Consent',
    darkMode: 'Dark Mode',
  },
  Messages: {
    noMessagesFound: 'No messages found',
  },
};

export default strings;
