#!/usr/bin/env bash

if [ -z "$APP_CENTER_CURRENT_PLATFORM" ]
then
    echo "You need define the APP_CENTER_CURRENT_PLATFORM variable in App Center with values android or ios"
    exit
fi

if [ "$APP_CENTER_CURRENT_PLATFORM" == "ios" ]
then
    #iOS
    CONFIG_FILE="Info.plist"
    APP_NAME="Swipewise"
    INFO=$APPCENTER_SOURCE_DIRECTORY/ios/$APP_NAME/$CONFIG_FILE
    plutil -remove NSAppTransportSecurity.NSExceptionDomains.localhost $INFO
fi
