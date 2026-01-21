#!/bin/bash

# 检查当前分支
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

if [ "$CURRENT_BRANCH" != "draft" ]; then
  echo "错误：当前分支是 $CURRENT_BRANCH，只有在 draft 分支才能使用 /publish 命令"
  exit 1
fi

echo "当前在 draft 分支，准备发布到 main..."
echo

# 获取 draft 和 main 分支之间的差异文件
CHANGED_FILES=$(git diff --name-only main...draft)

if [ -z "$CHANGED_FILES" ]; then
  echo "draft 分支没有修改的文件"
  exit 0
fi

echo "以下是 draft 分支修改的文件："
echo "$CHANGED_FILES" | nl
echo
echo "请输入要合并的文件编号（多个编号用空格分隔，或输入 'all' 合并所有文件）："
read -r SELECTION

# 切换到 main 分支
git checkout main || { echo "切换到 main 分支失败"; exit 1; }
echo "✓ 已切换到 main 分支"
echo

# 处理用户选择
if [ "$SELECTION" = "all" ]; then
  echo "正在合并所有更改..."
  git merge draft || { echo "合并 draft 分支失败，可能有冲突"; exit 1; }
else
  echo "正在合并选中的文件..."
  # 根据编号获取文件路径
  SELECTED_FILES=$(echo "$SELECTION" | tr ' ' '\n' | while read -r num; do
    echo "$CHANGED_FILES" | sed -n "${num}p"
  done)

  # 检出选中的文件
  echo "$SELECTED_FILES" | while read -r file; do
    if [ -n "$file" ]; then
      echo "  ✓ 合并: $file"
      git checkout draft -- "$file"
    fi
  done

  # 提交更改
  if [ -n "$(git status --porcelain)" ]; then
    echo
    echo "正在提交更改..."
    git add .
    git commit -m "Merge selected changes from draft branch"
    echo "✓ 已提交更改"
  else
    echo "没有更改需要提交"
    exit 0
  fi
fi

# 推送到远程
git push origin main || { echo "推送到远程失败"; exit 1; }
echo "✓ 已推送到远程 main 分支"

echo
echo "发布完成！✨"

