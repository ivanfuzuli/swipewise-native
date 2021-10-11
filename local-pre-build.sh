#!/usr/bin/env bash

npm version patch
echo "npm version updated"

PACKAGE_VERSION=$(cat package.json|grep version|head -1|awk -F: '{ print $2 }'|sed 's/[", ]//g')

CONFIG_FILE="Info.plist"
APP_NAME="Swipewise"
INFO=./ios/$APP_NAME/$CONFIG_FILE
plutil -remove NSAppTransportSecurity.NSExceptionDomains.localhost $INFO
plutil -replace NSAllowsArbitraryLoads -bool false $INFO
plutil -replace CFBundleShortVersionString -string $PACKAGE_VERSION $INFO

echo "IOS plist modified"

echo "version: ${PACKAGE_VERSION}"