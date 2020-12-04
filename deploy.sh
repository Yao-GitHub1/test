set -e
npm run build
git add -A
git commit -m '发布更新'
git push -f https://github.com/town2016/staff_bus.git master
