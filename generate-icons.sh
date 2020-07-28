#!/bin/sh
base="./src/assets/images/app-icon-1024.png"
noAlphaIcon="./src/assets/images/app-icon-1024-no-alpha.png"
roundIcon="./src/assets/images/app-icon-1024-round.png"
appIcon512="./src/assets/images/app-icon-512.png"
appIcon="./src/assets/images/app-icon.png"
halfRadius=512
iosIconFolder="./ios/mobile/Images.xcassets/AppIcon.appiconset"
androidIconFolder="./android/app/src/main/res"
# base="./src/assets/images/app_icon.png"
# noAlphaIcon="./src/assets/images/app_icon_no_alpha.png"
# roundIcon="./src/assets/images/app_icon_round.png"
# splashIcon="./src/assets/images/splash_icon.png"
# iosIconFolder="./ios/mobile/Images.xcassets/AppIcon.appiconset"
# iosSplashIconFolder="./ios/mobile/Images.xcassets/SplashIcon.imageset"
# androidIconFolder="./android/app/src/main/res"
# echo $z


convert "$base" -alpha remove "${noAlphaIcon}"
echo "Wrote ${noAlphaIcon}"

convert "$base"  \( +clone -alpha transparent -draw "circle ${halfRadius},${halfRadius} 0,${halfRadius}" \) -compose copyopacity -composite "${roundIcon}"
echo "Wrote ${roundIcon}"

convert "$base" -resize "512x512" -unsharp 1x4 "$appIcon512"
echo "Wrote ${appIcon512}"

convert "$base" -resize "128x128" -unsharp 1x4 "$appIcon"
echo "Wrote ${appIcon}"

iosIconNames=(
  'icon-1024' 
  'icon-20' 'icon-20@2x' 'icon-20@3x' 
  'icon-29' 'icon-29@2x' 'icon-29@3x' 
  'icon-40' 'icon-40@2x' 'icon-40@3x' 
  'icon-60@2x' 'icon-60@3x' 
  'icon-76' 'icon-76@2x' 
  'icon-83.5@2x' 
)
iosIconResolutions=(
  '1024' 
  '20' '40' '60' 
  '29' '58' '87' 
  '40' '80' '120' 
  '120' '180' 
  '76' '152' 
  '167' 
)
for (( i = 0; i < ${#iosIconNames[@]}; ++i )); do
  convert "$noAlphaIcon" -resize "${iosIconResolutions[i]}x${iosIconResolutions[i]}" -unsharp 1x4 "${iosIconFolder}/${iosIconNames[i]}.png"
  echo "Wrote ${iosIconFolder}/${iosIconNames[i]}.png"
done 

# iosSplashIconNames=(
#   'splash_icon@1x' 'splash_icon@2x' 'splash_icon@3x' 
# )
# iosSplashIconResolutions=(
#   '100' '200' '300'
# )
# for (( i = 0; i < ${#iosSplashIconNames[@]}; ++i )); do
#   convert "$splashIcon" -resize "${iosSplashIconResolutions[i]}x${iosSplashIconResolutions[i]}" -unsharp 1x4 "${iosSplashIconFolder}/${iosSplashIconNames[i]}.png"
#   echo "Wrote ${iosSplashIconFolder}/${iosSplashIconNames[i]}.png"
# done

androidIconNames=(
  'mipmap-mdpi/ic_launcher' 'mipmap-hdpi/ic_launcher' 'mipmap-xhdpi/ic_launcher' 'mipmap-xxhdpi/ic_launcher' 'mipmap-xxxhdpi/ic_launcher' 
)
androidIconResolutions=(
  '48' '72' '96' '144' '192'
)
# androidSplashIconNames=(
#   'mipmap-mdpi/splash_icon' 'mipmap-hdpi/splash_icon' 'mipmap-xhdpi/splash_icon' 'mipmap-xxhdpi/splash_icon' 'mipmap-xxxhdpi/splash_icon' 
# )
# androidSPlashIconResolutions=(
#   '100' '150' '200' '200' '400'
# )
for (( i = 0; i < ${#androidIconNames[@]}; ++i )); do
  convert "$base" -resize "${androidIconResolutions[i]}x${androidIconResolutions[i]}" -unsharp 1x4 "${androidIconFolder}/${androidIconNames[i]}.png"
  echo "Wrote ${androidIconFolder}/${androidIconNames[i]}.png"
  # convert "$splashIcon" -resize "${androidSPlashIconResolutions[i]}x${androidSPlashIconResolutions[i]}" -unsharp 1x4 "${androidIconFolder}/${androidSplashIconNames[i]}.png"
  # echo "Wrote ${androidIconFolder}/${androidSplashIconNames[i]}.png"
done

androidRoundIconNames=(
  'mipmap-hdpi/ic_launcher_round' 'mipmap-mdpi/ic_launcher_round' 'mipmap-xhdpi/ic_launcher_round' 'mipmap-xxhdpi/ic_launcher_round' 'mipmap-xxxhdpi/ic_launcher_round' 
)
androidRoundIconResolutions=(
  '72' '48' '96' '144' '192'
)
for (( i = 0; i < ${#androidRoundIconNames[@]}; ++i )); do
  convert "$roundIcon" -resize "${androidRoundIconResolutions[i]}x${androidRoundIconResolutions[i]}" -unsharp 1x4 "${androidIconFolder}/${androidRoundIconNames[i]}.png"
  echo "Wrote ${androidIconFolder}/${androidRoundIconNames[i]}.png"
done