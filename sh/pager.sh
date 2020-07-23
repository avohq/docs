#! /bin/sh

if [ "$(which bat)" ];
then
  bat --style "numbers" --language $1
else
  less -R
fi