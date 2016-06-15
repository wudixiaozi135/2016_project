echo off
cd
cd greensock 
call build.bat
cd ..

cd h5uploader 
call build.bat

cd ..
cd pathFind
call build.bat

cd ..
cd xiaodingCore
call build.bat

cd ..
cd particle
call build.bat

cd ..
cd ..

robocopy  extension  myWebGame/extension /mir  /xf *.bat /xd .idea /xa:h   /NP /ETA /NFL  /NDL /NJH /NJS

svn add myWebGame/*
svn ci myWebGame -m "svn commit"

robocopy  extension  webTeachH5/extension /mir /xf *.bat /xd .idea /xa:h   /NP /ETA /NFL /NDL /NJH /NJS


svn add webTeachH5/*
svn ci webTeachH5 -m "svn commit"
cd extension

exit